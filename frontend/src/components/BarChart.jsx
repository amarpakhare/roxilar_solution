import React from "react"
import {Bar} from "react-chartjs-2"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = ({data}) => {
	const counts = data.map((item) => item.count)

	const chartData = {
		labels: [
			"0-100",
			"101-200",
			"201-300",
			"301-400",
			"401-500",
			"501-600",
			"601-700",
			"701-800",
			"801-900",
			"901+",
		],
		datasets: [
			{
				label: "Number of Items",
				data: counts,
				backgroundColor: "rgba(75, 192, 192, 0.6)",
			},
		],
	}

	return (
		<div>
			<h2>Bar Chart</h2>
			<Bar data={chartData} />
		</div>
	)
}

export default BarChart
