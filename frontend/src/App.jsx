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
			// console.log(transResponse.data)

			// Fetch Statistics
			const statsResponse = await axios.get(
				"http://127.0.0.1:8000/api/v1/product/statistics",
				{
					params: {month},
				}
			)
			setStatistics(statsResponse.data)
			// console.log(statsResponse.data)

			// Fetch Bar Chart Data
			const barResponse = await axios.get(
				"http://127.0.0.1:8000/api/v1/product/bar-chart",
				{params: {month}}
			)
			setBarData(barResponse.data)
			// console.log(barResponse.data)

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
		<div>
			<h1>Transactions Dashboard</h1>
			<label>
				Select Month:
				<select value={month} onChange={(e) => setMonth(e.target.value)}>
					{["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map(
						(m) => (
							<option key={m} value={m}>
								{m}
							</option>
						)
					)}
				</select>
			</label>
			<input
				type="text"
				placeholder="Search transactions..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<TransactionsTable
				transactions={transactions}
				page={page}
				setPage={setPage}
			/>
			<StatisticsTable statistics={statistics} />
			<BarChart data={barData} />
			<PieChart data={pieData} />
		</div>
	)
}

export default App
