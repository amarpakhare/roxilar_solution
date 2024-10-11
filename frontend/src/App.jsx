import React, {useState, useEffect} from "react"
import axios from "axios"
import TransactionsTable from "./components/TransactionsTable"
import StatisticsTable from "./components/StatisticsTable"
import BarChart from "./components/BarChart"
import PieChart from "./components/PieChart"

const App = () => {
	const [month, setMonth] = useState("3") // Default month
	const [search, setSearch] = useState("")
	const [transactions, setTransactions] = useState([])
	const [statistics, setStatistics] = useState({})
	const [barData, setBarData] = useState([])
	const [pieData, setPieData] = useState([])
	const [page, setPage] = useState(1)
	const [perPage] = useState(10)

	useEffect(() => {
		fetchData()
	}, [month, search, page])

	const fetchData = async () => {
		try {
			// Fetch Transactions
			const transResponse = await axios.get(
				"http://127.0.0.1:8000/api/v1/product/transactions",
				{
					params: {month, search, page, perPage},
				}
			)
			setTransactions(transResponse.data)

			// Fetch Statistics
			const statsResponse = await axios.get(
				"http://127.0.0.1:8000/api/v1/product/statistics",
				{
					params: {month},
				}
			)
			setStatistics(statsResponse.data)

			// Fetch Bar Chart Data
			const barResponse = await axios.get(
				"http://127.0.0.1:8000/api/v1/product/bar-chart",
				{params: {month}}
			)
			setBarData(barResponse.data)

			// Fetch Pie Chart Data
			const pieResponse = await axios.get(
				"http://127.0.0.1:8000/api/v1/product/pie-chart",
				{params: {month}}
			)
			setPieData(pieResponse.data)
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
				<h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
					Transactions Dashboard
				</h1>
				<div className="flex justify-between items-center mb-6 bg-blue-50 p-4 rounded-lg shadow-sm">
					<div className="flex items-center">
						<label className="text-gray-700 font-semibold mr-4">
							Select Month:
						</label>
						<select
							value={month}
							onChange={(e) => setMonth(e.target.value)}
							className="p-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							{[
								{name: "January", number: "1"},
								{name: "February", number: "2"},
								{name: "March", number: "3"},
								{name: "April", number: "4"},
								{name: "May", number: "5"},
								{name: "June", number: "6"},
								{name: "July", number: "7"},
								{name: "August", number: "8"},
								{name: "September", number: "9"},
								{name: "October", number: "10"},
								{name: "November", number: "11"},
								{name: "December", number: "12"},
							].map((monthObj) => (
								<option
									key={monthObj.number}
									value={monthObj.number}
									className="p-2 bg-white hover:bg-blue-100"
								>
									{monthObj.name}
								</option>
							))}
						</select>
					</div>
					<input
						type="text"
						placeholder="Search transactions..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="p-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<TransactionsTable
					transactions={transactions}
					page={page}
					setPage={setPage}
				/>
				<StatisticsTable statistics={statistics} />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
					<BarChart data={barData} />
					<PieChart data={pieData} />
				</div>
			</div>
		</div>
	)
}

export default App
