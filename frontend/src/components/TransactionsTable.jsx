import React from "react"

const TransactionsTable = ({transactions, page, setPage}) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-lg">
			<h2 className="text-xl font-semibold mb-4 text-gray-800">Transactions</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200 rounded-lg">
					<thead className="bg-blue-500 text-white rounded-lg">
						<tr>
							<th className="py-3 px-6 text-left">Title</th>
							<th className="py-3 px-6 text-left">Description</th>
							<th className="py-3 px-6 text-left">Price</th>
							<th className="py-3 px-6 text-left">Date of Sale</th>
							<th className="py-3 px-6 text-left">Sold</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(transactions.data) &&
						transactions.data.length > 0 ? (
							transactions.data.map((transaction) => (
								<tr key={transaction._id} className="border-b border-gray-200">
									<td className="py-4 px-6">{transaction.title}</td>
									<td className="py-4 px-6">{transaction.description}</td>
									<td className="py-4 px-6">${transaction.price}</td>
									<td className="py-4 px-6">
										{new Date(transaction.dateOfSale).toLocaleDateString()}
									</td>
									<td className="py-4 px-6">
										<span
											className={`px-3 py-1 rounded-full text-sm ${
												transaction.sold
													? "bg-green-100 text-green-600"
													: "bg-red-100 text-red-600"
											}`}
										>
											{transaction.sold ? "Yes" : "No"}
										</span>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="5" className="text-center py-4 text-gray-600">
									No transactions found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div className="flex justify-between mt-4">
				<button
					disabled={page === 1}
					onClick={() => setPage(page - 1)}
					className={`px-4 py-2 rounded-lg ${
						page === 1
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					Previous
				</button>
				<button
					onClick={() => setPage(page + 1)}
					className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
				>
					Next
				</button>
			</div>
		</div>
	)
}

export default TransactionsTable
