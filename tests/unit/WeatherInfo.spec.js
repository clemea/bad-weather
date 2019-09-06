import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import WeatherInfo from '@/components/WeatherInfo.vue'
import fakeWeather from '@/__mocks__/weather.json'

const actions = {
	getNewPlace: jest.fn()
}

const state = {
	coords: { lat: 63.23362741232569, lng: -343.84924662625804 },
	weather: fakeWeather,
	badWeather: false,
	placeSuggested: false,
	placeNotFound: false
}

let wrapper
function createWrapper(localstate) {
	const localVue = createLocalVue()
	localVue.use(Vuex)
	const store = new Vuex.Store({
		state: {
			...state,
			...localstate
		},
		actions
	})
	return shallowMount(WeatherInfo, {
		store,
		localVue
	})
}
describe('WeatherInfo.vue', () => {

	test('default template', () => {
		wrapper = createWrapper()
		expect(wrapper.html()).toMatchSnapshot()
	})

	test('Correctly show good weather state', () => {
		wrapper = createWrapper()
		const goodWeather = wrapper.find('.weatherInfo__good')
		const badWeather = wrapper.find('.weatherInfo__bad')
		expect(goodWeather.isVisible()).toBe(true)
		expect(badWeather.isVisible()).toBe(false)
	})

	test('Correctly show bad weather state', () => {
		wrapper = createWrapper({
			badWeather: true
		})
		const goodWeather = wrapper.find('.weatherInfo__good')
		const badWeather = wrapper.find('.weatherInfo__bad')
		expect(goodWeather.isVisible()).toBe(false)
		expect(badWeather.isVisible()).toBe(true)
	})

	test('Correctly show suggested state', () => {
		wrapper = createWrapper({
			placeSuggested: true
		})
		const goodWeather = wrapper.find('.weatherInfo__good')
		const badWeather = wrapper.find('.weatherInfo__bad')
		const googleLink = wrapper.find('.googleLink')
		expect(goodWeather.isVisible()).toBe(false)
		expect(badWeather.isVisible()).toBe(false)
		expect(googleLink.isVisible()).toBe(true)
	})

	test('Show not found msg', () => {
		wrapper = createWrapper({
			placeNotFound: true
		})
		const notFound = wrapper.find('.weatherInfo__notFound')
		expect(notFound.isVisible()).toBe(true)
	})

	test('Show extra link', () => {
		wrapper = createWrapper({
			placeSuggested: true
		})
		const extraLink = wrapper.find('.extraLink')
		expect(extraLink.isVisible()).toBe(true)
	})


	test('Correct google maps link', () => {
		wrapper = createWrapper()
		expect(wrapper.vm.googleMapsLink).toBe('http://maps.google.com/maps?q=&layer=c&cbll=63.23362741232569,-343.84924662625804&cbp=11,0,0,0,0')
	})
})
