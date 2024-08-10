const readableTime = (seconds) => {
	const minutes = Math.floor(seconds / 60)
	const secondsLeft = seconds % 60
	return `${minutes < 10 ? `0${minutes}` : minutes}:${
		secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
	}`
}

export { readableTime }
