import { actions as storeActions } from '@/store'
import fakeWeather from '@/__mocks__/weather.json'
import fakeForecast from '@/__mocks__/forecast.json'

describe('store actions', () => {
	let actions
	const storeObj = {
		commit: jest.fn(),
		dispatch: jest.fn()
	}

	beforeEach(() => {
		actions = storeActions
		storeObj.commit.mockReset()
		fetch.mockReset()
	})

	test('getWeather', async () => {
		fetch.mockResponseOnce(JSON.stringify(fakeWeather))
		await actions.getWeather(storeObj, {
			lat: '41.897964826992286',
			lng: '12.48677730560303'
		})
		expect(storeObj.commit).toBeCalledWith('setWeather', fakeWeather)
	})

	test('getForecast', async () => {
		fetch.mockResponseOnce(JSON.stringify(fakeForecast))
		await actions.getForecast(storeObj, {
			lat: '41.897964826992286',
			lng: '12.48677730560303'
		})
		expect(storeObj.commit).toBeCalledWith('setForecast', fakeForecast)
	})

	test('setBadWeatherStatus', () => {
		actions.setBadWeatherStatus(storeObj, true)
		expect(storeObj.commit).toBeCalledWith('setBadWeatherStatus', true)
	})
})
