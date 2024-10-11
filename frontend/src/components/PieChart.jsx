import React from "react"
import {Pie} from "react-chartjs-2"
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"

// Registering ArcElement along with Tooltip and Legend
ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({data}) => {
	const chartData = {
		labels: data.map((d) => d.category),
		datasets: [
			{
				label: "Number of Items",
				data: data.map((d) => d.count),
				backgroundColor: [
					"#FF6384", // Light Red
					"#36A2EB", // Light Blue
					"#FFCE56", // Yellow
					"#4BC0C0", // Light Teal
					"#9966FF", // Light Purple
					"#FF9F40", // Orange
				],
				borderColor: "#fff",
				borderWidth: 2,
			},
		],
	}

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					color: "#374151", // Dark gray text for legend
				},
			},
			tooltip: {
				backgroundColor: "#111827", // Dark background for tooltips
				titleColor: "#fff", // White text for tooltip
				bodyColor: "#fff",
			},
		},
	}

	return (
		<div className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10 mb-6">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">
				Category Distribution
			</h2>
			<div className="relative h-96 w-full">
				<Pie data={chartData} options={options} />
			</div>
		</div>
	)
}

export default PieChart
