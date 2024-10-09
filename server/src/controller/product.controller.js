import {Product} from "../models/product.model.js"
import axios from "axios"

const initializeDatabase = async (req, res) => {
	try {
		const response = await axios.get(
			"https://s3.amazonaws.com/roxiler.com/product_transaction.json"
		)
		const transactions = response.data
		console.log(transactions)

		await Product.insertMany(transactions)

		res.status(200).json({message: "Database initialized with seed data"})
	} catch (error) {
		res.status(500).json({error: "Error initializing database"})
	}
}

export {initializeDatabase}
