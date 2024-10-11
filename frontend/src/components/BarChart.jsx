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
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					color: "#374151", // Dark gray text
				},
				grid: {
					color: "#E5E7EB", // Light gray grid
				},
			},
			x: {
				ticks: {
					color: "#374151",
				},
				grid: {
					color: "#E5E7EB",
				},
			},
		},
		plugins: {
			legend: {
				labels: {
					color: "#374151", // Dark gray text for legend
				},
			},
		},
	}

	return (
		<div className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10 mb-6">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">Bar Chart Stats</h2>
			<div className="relative h-96 w-full">
				<Bar data={chartData} options={options} />
			</div>
		</div>
	)
}

export default BarChart
