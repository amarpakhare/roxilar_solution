import {Product} from "../models/product.model.js"
import axios from "axios"

//1. API to Seed the Database with Data from Third-Party API
const initializeDatabase = async (req, res) => {
	try {
		const response = await axios.get(
			"https://s3.amazonaws.com/roxiler.com/product_transaction.json"
		)
		const transactions = response.data
		const validTransactions = transactions.map((tx) => ({
			productId: tx.id, // add defaults if needed
			title: tx.title || "",
			price: tx.price || 0,
			description: tx.description || "",
			category: tx.category || "Uncategorized",
			image: tx.image || "",
			sold: tx.sold || false,
			dateOfSale: new Date(tx.dateOfSale) || new Date(),
		}))

		await Product.insertMany(validTransactions)

		res.status(200).json({message: "Database initialized with seed data"})
	} catch (error) {
		console.error(error.message)

		res.status(500).json({error: "Error initializing database"})
	}
}

//2. API to List Transactions with Search and Pagination
const transactions = async (req, res) => {
	const {search, page = 1, perPage = 10, month} = req.query

	let query = {}
	let monthQuery = {}

	if (month) {
		monthQuery = {
			$expr: {
				$eq: [{$month: "$dateOfSale"}, parseInt(month)], // Extract the month from ISO 8601 date
			},
		}
	}

	if (search) {
		const searchAsNumber = Number(search) // Convert the search term to a number
		query.$or = [
			{title: {$regex: search.trim(), $options: "i"}},
			{description: {$regex: search.trim(), $options: "i"}},
			// {price: {$regex: search, $options: "i"}}, // Assuming price is a string for search
		]
		if (!isNaN(searchAsNumber)) {
			query.$or.push({price: searchAsNumber}) // This assumes you want exact matches on price
		}
	}

	let finalQuery = {...monthQuery, ...query}

	try {
		const transactions = await Product.find(finalQuery)
			.skip((page - 1) * perPage)
			.limit(Number(perPage))
		const totalCount = await Product.countDocuments(finalQuery)

		res.status(200).json({data: transactions, total: totalCount})
	} catch (error) {
		console.error("Error fetching transactions:", error) // Log the actual error
		res.status(500).json({error: "Error fetching transactions"})
	}
}

//3. API for Statistics of Sold and Unsold Items

const statistics = async (req, res) => {
	const {month} = req.query

	try {
		// Ensure the month is passed and convert it to integer
		const parsedMonth = parseInt(month)

		if (!parsedMonth || parsedMonth < 1 || parsedMonth > 12) {
			return res.status(400).json({error: "Invalid month provided"})
		}

		// Total sales amount for the selected month
		const totalSalesAmount = await Product.aggregate([
			{
				$match: {
					$expr: {$eq: [{$month: "$dateOfSale"}, parsedMonth]}, // Match the month regardless of the year
					sold: true,
				},
			},
			{
				$group: {_id: null, totalAmount: {$sum: "$price"}},
			},
		])

		// Total sold items for the selected month
		const totalSoldItems = await Product.countDocuments({
			$expr: {$eq: [{$month: "$dateOfSale"}, parsedMonth]},
			sold: true,
		})

		// Total unsold items for the selected month
		const totalUnsoldItems = await Product.countDocuments({
			$expr: {$eq: [{$month: "$dateOfSale"}, parsedMonth]},
			sold: false,
		})

		res.status(200).json({
			totalSaleAmount: totalSalesAmount[0]?.totalAmount || 0, // Default to 0 if no result
			totalSoldItems,
			totalUnsoldItems,
		})
	} catch (error) {
		console.error("Error fetching statistics:", error) // Log error for debugging
		res.status(500).json({error: "Error fetching statistics"})
	}
}

//4.  API for Bar Chart (Price Ranges)
const barChart = async (req, res) => {
	const {month} = req.query

	// Parse the month input as an integer
	const parsedMonth = parseInt(month)

	if (!parsedMonth || parsedMonth < 1 || parsedMonth > 12) {
		return res.status(400).json({error: "Invalid month provided"})
	}

	const priceRanges = [
		{range: "0-100", min: 0, max: 100},
		{range: "101-200", min: 101, max: 200},
		{range: "201-300", min: 201, max: 300},
		{range: "301-400", min: 301, max: 400},
		{range: "401-500", min: 401, max: 500},
		{range: "501-600", min: 501, max: 600},
		{range: "601-700", min: 601, max: 700},
		{range: "701-800", min: 701, max: 800},
		{range: "801-900", min: 801, max: 900},
		{range: "901-above", min: 901, max: Infinity},
	]

	try {
		const result = await Promise.all(
			priceRanges.map(async ({range, min, max}) => {
				const count = await Product.countDocuments({
					$expr: {
						$eq: [{$month: "$dateOfSale"}, parsedMonth], // Filter by the selected month
					},
					price: {
						$gte: min,
						...(max !== Infinity && {$lte: max}), // Apply $lte only if max is not Infinity
					},
				})
				return {range, count}
			})
		)

		res.status(200).json(result)
	} catch (error) {
		console.error("Error fetching bar chart data:", error)
		res.status(500).json({error: "Error fetching bar chart data"})
	}
}

//5. API for Pie Chart (Unique Categories)
const pieChart = async (req, res) => {
	const {month} = req.query

	// Parse the month input as an integer
	const parsedMonth = parseInt(month)

	if (!parsedMonth || parsedMonth < 1 || parsedMonth > 12) {
		return res.status(400).json({error: "Invalid month provided"})
	}

	try {
		const result = await Product.aggregate([
			{
				$match: {
					$expr: {$eq: [{$month: "$dateOfSale"}, parsedMonth]}, // Filter by month
				},
			},
			{
				$group: {
					_id: "$category", // Group by category
					count: {$sum: 1}, // Count the number of items in each category
				},
			},
		])

		// Map the result to a more readable format
		res.status(200).json(result.map((r) => ({category: r._id, count: r.count})))
	} catch (error) {
		console.error("Error fetching pie chart data:", error)
		res.status(500).json({error: "Error fetching pie chart data"})
	}
}

//6. API to Combine All Data
const combinedData = async (req, res) => {
	const {month} = req.query

	if (!month || isNaN(month) || month < 1 || month > 12) {
		return res.status(400).json({error: "Invalid month provided"})
	}

	try {
		// Assuming the base URL for Axios requests is correctly set
		const [
			transactionsResponse,
			statisticsResponse,
			barChartResponse,
			pieChartResponse,
		] = await Promise.all([
			axios.get(`/transactions?month=${month}`),
			axios.get(`/statistics?month=${month}`),
			axios.get(`/bar-chart?month=${month}`),
			axios.get(`/pie-chart?month=${month}`),
		])

		res.status(200).json({
			transactions: transactionsResponse.data,
			statistics: statisticsResponse.data,
			barChart: barChartResponse.data,
			pieChart: pieChartResponse.data,
		})
	} catch (error) {
		console.error("Error fetching combined data:", error) // Log the error details

		// Capture detailed error response from Axios
		if (error.response) {
			return res.status(error.response.status).json({
				error: error.response.data,
				message: error.response.statusText,
			})
		} else if (error.request) {
			return res.status(500).json({
				error: "No response received from API",
				details: error.request,
			})
		} else {
			return res.status(500).json({
				error: "Error setting up request",
				message: error.message,
			})
		}
	}
}

export {
	initializeDatabase,
	transactions,
	statistics,
	barChart,
	pieChart,
	combinedData,
}
