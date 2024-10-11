import React from "react"

const TransactionsTable = ({transactions, page, setPage}) => {
	return (
		<div>
			<h2>Transactions</h2>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Price</th>
						<th>Date of Sale</th>
						<th>Sold</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(transactions.data) && transactions.data.length > 0 ? (
						transactions.data.map((transaction) => (
							<tr key={transaction._id}>
								<td>{transaction.title}</td>
								<td>{transaction.description}</td>
								<td>${transaction.price}</td>
								<td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
								<td>{transaction.sold ? "Yes" : "No"}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="5">No transactions found.</td>
						</tr>
					)}
				</tbody>
			</table>
			<div>
				<button disabled={page === 1} onClick={() => setPage(page - 1)}>
					Previous
				</button>
				<button onClick={() => setPage(page + 1)}>Next</button>
			</div>
		</div>
	)
}

export default TransactionsTable
