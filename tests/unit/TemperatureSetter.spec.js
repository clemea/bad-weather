import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TemperatureSetter from '@/components/TemperatureSetter.vue'

const actions = {
	setMinTemp: jest.fn(),
	resetPlacesInfo: jest.fn()
}

let wrapper
function createWrapper(state = { minTemp: 20 }) {
	const localVue = createLocalVue()
	localVue.use(Vuex)
	const store = new Vuex.Store({
		state,
		actions
	})
	return shallowMount(TemperatureSetter, {
		store,
		localVue
	})
}

describe('TemperatureSetter.vue', () => {
	beforeEach(() => {
		wrapper = createWrapper()
	})
	test('default template', () => {
		expect(wrapper.html()).toMatchSnapshot()
	})

	test('change temperature on input', () => {
		const input = wrapper.find('.temperatureSetter__input')
		input.element.value = '30'
		input.trigger('input')
		expect(wrapper.vm.value).toBe('30')
		expect(actions.setMinTemp).not.toHaveBeenCalled()
	})

	test('trigger store change', () => {
		const input = wrapper.find('.temperatureSetter__input')
		input.trigger('change')
		expect(actions.setMinTemp).toHaveBeenCalled()
	})
})
