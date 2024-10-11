import React from "react"

const StatisticsTable = ({statistics}) => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10 mb-6 mt-6">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">Statistics</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="bg-blue-100 p-4 rounded-lg">
					<p className="text-xl font-semibold text-blue-700">
						Total Sales Amount
					</p>
					<p className="text-3xl font-bold text-gray-800 mt-2">
						${statistics.totalSaleAmount || 0}
					</p>
				</div>
				<div className="bg-green-100 p-4 rounded-lg">
					<p className="text-xl font-semibold text-green-700">
						Total Sold Items
					</p>
					<p className="text-3xl font-bold text-gray-800 mt-2">
						{statistics.totalSoldItems || 0}
					</p>
				</div>
				<div className="bg-red-100 p-4 rounded-lg">
					<p className="text-xl font-semibold text-red-700">
						Total Not Sold Items
					</p>
					<p className="text-3xl font-bold text-gray-800 mt-2">
						{statistics.totalUnsoldItems || 0}
					</p>
				</div>
			</div>
		</div>
	)
}

export default StatisticsTable
