import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TemperatureSetter from '@/components/TemperatureSetter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
	setMinTemp: jest.fn(),
	resetPlacesInfo: jest.fn()
}
const store = new Vuex.Store({
	state: {
		minTemp: 20
	},
	actions
})

describe('TemperatureSetter.vue', () => {
	test('Правильное изменние значения', () => {
		const wrapper = shallowMount(TemperatureSetter, {
			store,
			localVue
		})
		const input = wrapper.find('.temperatureSetter__input')
		input.element.value = '30'
		input.trigger('input')
		expect(wrapper.vm.value).toBe('30')
	})

	test('Триггер записи в store', () => {
		const wrapper = shallowMount(TemperatureSetter, {
			store,
			localVue
		})
		const input = wrapper.find('.temperatureSetter__input')
		input.element.value = '30'
		input.trigger('change')
		expect(actions.setMinTemp).toHaveBeenCalled()
	})
})
