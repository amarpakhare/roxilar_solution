import React, {useState} from "react"

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]

const MonthDropdown = ({onMonthChange}) => {
	const [selectedMonth, setSelectedMonth] = useState("March") // Default to March

	const handleMonthChange = (e) => {
		setSelectedMonth(e.target.value)
		onMonthChange(e.target.value)
	}

	return (
		<select value={selectedMonth} onChange={handleMonthChange}>
			{months.map((month, index) => (
				<option key={index} value={month}>
					{month}
				</option>
			))}
		</select>
	)
}

export default MonthDropdown
