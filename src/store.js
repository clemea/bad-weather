import Vue from 'vue'
import Vuex from 'vuex'
import _shuffle from 'lodash/shuffle'
import { fetchWeather, fetchForecast } from './api'
import testCoords from '@/testCoord.json'

Vue.use(Vuex)

export const state = {
	badWeather: false,
	placeSuggested: false,
	placeNotFound: false,
	minTemp: 20,
	weather: null,
	forecast: null,
	coords: null
}

export const mutations = {
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
}

export const actions = {
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

	async getWeather({ commit, dispatch }, coord) {
		const weather = await fetchWeather(coord)
		commit(
			'setWeather',
			weather
		)
		dispatch('checkBadWeather')
	},

	async getForecast({ commit }, coord) {
		const forecast = await fetchForecast(coord)
		commit(
			'setForecast',
			forecast
		)
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
		const handleDescendants = async () => {
			const placeCoord = {
				lat: shuffled[counter][0],
				lng: shuffled[counter][1]
			}
			const weather = await fetchWeather(placeCoord)

			if (weather.main.temp >= state.minTemp) {
				commit(
					'setBadWeatherStatus',
					false
				)
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
		}
		handleDescendants()
	}

}

export default new Vuex.Store({
	state,
	mutations,
	actions
})
