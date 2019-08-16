import { shallowMount } from '@vue/test-utils'
import ForecastTrigger from '@/components/ForecastTrigger.vue'

it('Должен правильно добавлять в отслеживаемые', () => {
	const wrapper = shallowMount(ForecastTrigger)
	const spy = jest.spyOn(wrapper.vm, 'triggerForecast')
	wrapper.find('.forecastTrigger').trigger('click')
	expect(spy).toHaveBeenCalled()
})
