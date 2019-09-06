function fetchWeather({ lat, lng }) {
	return new Promise((resolve) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${
			process.env.VUE_APP_WEATHER_KEY
		}&units=metric`

		fetch(url)
			.then(response => response.json())
			.then((response) => {
				resolve(response)
			})
	})
}

function fetchForecast({ lat, lng }) {
	return new Promise((resolve) => {
		const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&APPID=${
			process.env.VUE_APP_WEATHER_KEY
		}&units=metric&cnt=7`

		fetch(url)
			.then(response => response.json())
			.then((response) => {
				resolve(response)
			})
	})
}

export {
	fetchWeather,
	fetchForecast
}
