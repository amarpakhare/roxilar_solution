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
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
				],
			},
		],
	}

	return (
		<div>
			<h2>Pie Chart</h2>
			<Pie data={chartData} />
		</div>
	)
}

export default PieChart
