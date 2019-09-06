import { shallowMount } from '@vue/test-utils'
import ForecastTrigger from '@/components/ForecastTrigger.vue'

let wrapper
describe('ForecastTrigger.vue', () => {
	beforeEach(() => {
		wrapper = shallowMount(ForecastTrigger)
	})

	test('hidden by default', () => {
		expect(wrapper.vm.forecastShown).toBeFalsy()
	})

	test('change forecast visibility on click', () => {
		wrapper.trigger('click')
		expect(wrapper.vm.forecastShown).toBeTruthy()
	})
})
