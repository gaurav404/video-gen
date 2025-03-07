const options: Intl.DateTimeFormatOptions = {
	month: "long",
	year: "numeric",
}

export const getFormatedDate = (timestamp: number) => {
	const date = new Date(timestamp)
	const formattedDate = new Intl.DateTimeFormat("en", options).format(date)

	// Add ordinal suffix to the day (e.g., '1st', '2nd', '3rd', '4th', '5th', etc.)
	const day = date.getDate()
	const dayWithSuffix =
		day +
		(day % 10 === 1 && day !== 11
			? "st"
			: day % 10 === 2 && day !== 12
				? "nd"
				: day % 10 === 3 && day !== 13
					? "rd"
					: "th")

	// Combine the formatted date with the day
	const formattedDateString = `${dayWithSuffix} ${formattedDate}`
	return formattedDateString
}

export const getDateTime = (timestamp: number) => {
	const date = new Date(timestamp) // Convert timestamp to milliseconds
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const ampm = hours >= 12 ? "pm" : "am"

	// Convert 24-hour time to 12-hour time
	const formattedHours = hours % 12 || 12

	// Add leading zeros to minutes if necessary
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

	const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`
	return formattedTime
}