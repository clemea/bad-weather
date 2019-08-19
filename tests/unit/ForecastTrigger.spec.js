import { shallowMount } from '@vue/test-utils'
import ForecastTrigger from '@/components/ForecastTrigger.vue'

describe('ForecastTrigger.vue', () => {
	test('Запускает метод при клике', () => {
		const wrapper = shallowMount(ForecastTrigger)
		// const spy = jest.spyOn(wrapper.vm, 'triggerForecast')
		const triggerForecast = jest.fn()
		wrapper.setMethods({ triggerForecast })
		wrapper.trigger('click')
		expect(triggerForecast).toHaveBeenCalled()
	})
})
