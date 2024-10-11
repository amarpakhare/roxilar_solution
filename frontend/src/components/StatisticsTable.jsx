import React from "react"

const StatisticsTable = ({statistics}) => {
	return (
		<div>
			<h2>Statistics</h2>
			<p>Total Sales Amount: ${statistics.totalSaleAmount}</p>
			<p>Total Sold Items: {statistics.totalSoldItems}</p>
			<p>Total Not Sold Items: {statistics.totalUnsoldItems}</p>
		</div>
	)
}

export default StatisticsTable
