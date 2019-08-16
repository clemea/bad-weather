import Vue from 'vue'
import Vuex from 'vuex'
import _shuffle from 'lodash/shuffle'
import testCoords from '@/testCoord.json'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		badWeather: false,
		placeSuggested: false,
		placeNotFound: false,
		minTemp: 20,
		weather: null,
		forecast: null,
		coords: null
	},
	mutations: {
		setBadWeatherStatus(state, status) {
			state.badWeather = status
		},
		setNewCoordinates(state, coord) {
			state.newCoordinates = coord
		},
		setPlaceSuggested(state, val) {
			state.placeSuggested = val
		},
		setPlaceNotFound(state, val) {
			state.placeNotFound = val
		},
		setWeather(state, weather) {
			state.weather = weather
		},
		setForecast(state, forecast) {
			state.forecast = forecast
		},
		setCoords(state, coords) {
			state.coords = coords
		},
		setMinTemp(state, temp) {
			state.minTemp = temp
		}

	},
	actions: {
		setBadWeatherStatus({ commit }, status) {
			commit(
				'setBadWeatherStatus',
				status
			)
		},
		setPlaceSuggested({ commit }, val) {
			commit(
				'setPlaceSuggested',
				val
			)
		},
		setPlaceNotFound({ commit }, val) {
			commit(
				'setPlaceNotFound',
				val
			)
		},
		setMinTemp({ commit, dispatch }, temp) {
			commit(
				'setMinTemp',
				temp
			)
			dispatch('checkBadWeather')
		},
		setNewCoordinates({ commit }, coord) {
			commit(
				'setNewCoordinates',
				coord
			)
		},
		setCoords({ commit }, coord) {
			commit(
				'setCoords',
				coord
			)
		},
		resetPlacesInfo({ commit }) {
			commit(
				'setPlaceSuggested',
				false
			)
			commit(
				'setPlaceNotFound',
				false
			)
		},
		// todo: move to api
		fetchWeather({ commit }, { lat, lng }) {
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
		},

		getWeather({ commit, dispatch }, coord) {
			dispatch(
				'fetchWeather',
				coord
			)
				.then((response) => {
					commit(
						'setWeather',
						response
					)
					dispatch('checkBadWeather')
				})
		},
		getForecast({ commit }, { lat, lng }) {
			const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&APPID=${
				process.env.VUE_APP_WEATHER_KEY
			}&units=metric&cnt=7`

			fetch(url)
				.then(response => response.json())
				.then((response) => {
					commit(
						'setForecast',
						response
					)
				})
		},
		updateInfo({ dispatch }, coords) {
			dispatch(
				'setCoords',
				coords
			)
			dispatch(
				'getWeather',
				coords
			)
			dispatch(
				'getForecast',
				coords
			)
		},
		checkBadWeather({ state, commit }) {
			commit(
				'setBadWeatherStatus',
				state.weather.main.temp < state.minTemp
			)
		},

		getNewPlace({ state, dispatch, commit }) {
			let counter = 0
			const shuffled = _shuffle(testCoords.goodCoords)
			const handleDescendants = () => {
				const placeCoord = {
					lat: shuffled[counter][0],
					lng: shuffled[counter][1]
				}
				dispatch(
					'fetchWeather',
					placeCoord
				).then((response) => {
					console.warn(response.main.temp)
					if (response.main.temp >= state.minTemp) {
						commit('setBadWeatherStatus', false)
						commit(
							'setPlaceSuggested',
							true
						)
						commit(
							'setPlaceNotFound',
							false
						)
						dispatch('updateInfo', placeCoord)
					} else if (counter < shuffled.length - 1) {
						counter += 1
						handleDescendants()
					} else {
						commit(
							'setPlaceNotFound',
							true
						)
					}
				})
			}
			handleDescendants()
		}


	}
})
