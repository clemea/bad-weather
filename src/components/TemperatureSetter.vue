<template>
	<div class="temperatureSetter">
		<span class="temperatureSetter__text">Set your min temperature</span>
		<input type="number"
			class="temperatureSetter__input"
			@input="setValue"
			v-model="value"
		/>
		<input
			type="range"
			:min="minTempRange"
			:max="maxTempRange"
			step="1"
			:value="value || minTemp"
			@input="setValue"
			:class="['temperatureSetter__range', {
				'temperatureSetter__range_overflowMax': value > maxTempRange,
				'temperatureSetter__range_overflowMin': value < minTempRange
			}]"
		/>
		<span class="temperatureSetter__value">{{ value || minTemp }} °C</span>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import _debounce from 'lodash/debounce'

export default {
	data() {
		return {
			value: null,
			minTempRange: -50,
			maxTempRange: 50
		}
	},
	computed: {
		...mapState(['minTemp'])
	},
	methods: {
		...mapActions(['setMinTemp', 'resetPlacesInfo']),
		setValue(event) {
			if (event.target.value) {
				this.value = event.target.value
				this.setStoreValue(event.target.value)
			}
		},
		setStoreValue: _debounce(function (val) {
			this.setMinTemp(val)
			this.resetPlacesInfo()
		}, 300)

		// input(event) {
		// 	if (event.target.value) {
		// 		this.value = event.target.value
		// 	}
		// }
	},

	components: {}
}
</script>

<style lang="postcss" scoped>
.temperatureSetter {
	display: flex;
	margin-bottom: 50px;
	align-items: center;
	height: 50px;
	background: rgba(0, 0, 0, 0.4);
	padding: 0 20px;
	flex-wrap: wrap;
}

.temperatureSetter__text {
	margin-right: 20px;
}

.temperatureSetter__input {
	padding: 0 5px;
	font-weight: bold;
	width: 60px;
	opacity: 0.1;
	margin-right: 20px;
	transition: opacity 0.2s ease-in-out;
	-moz-appearance:textfield;
	&:focus {
		opacity: 0.7;
	}
}

.temperatureSetter__input::-webkit-outer-spin-button,
.temperatureSetter__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.temperatureSetter__range {
	-webkit-appearance: none;
	width: 200px;
	margin: 0 20px 0 0;
	background: transparent;
	&.temperatureSetter__range_overflowMax{
		&::-webkit-slider-runnable-track {
			background: #C92744;
		}
		&::-webkit-slider-thumb {
			border: 1px solid #C92744;
			background: #C92744;
		}

	}
	&.temperatureSetter__range_overflowMin{
		&::-webkit-slider-runnable-track {
			background: #4545FF;
		}
		&::-webkit-slider-thumb {
			border: 1px solid #4545FF;
			background: #4545FF;
		}

	}
}
.temperatureSetter__range:focus {
	outline: none;
}
.temperatureSetter__range::-webkit-slider-runnable-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	background: rgba(62, 109, 67, 0.71);
	border-radius: 1.3px;
	border: 0.2px solid #010101;
}
.temperatureSetter__range::-webkit-slider-thumb {
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	border: 1px solid #3e6d43;
	height: 20px;
	width: 20px;
	border-radius: 50px;
	background: #3e6d43;
	cursor: pointer;
	-webkit-appearance: none;
	margin-top: -6px;
}
.temperatureSetter__range:focus::-webkit-slider-runnable-track {
	background: rgba(71, 125, 77, 0.71);
}
.temperatureSetter__range:focus::-webkit-slider-thumb {
	background: rgba(71, 125, 77);
}
.temperatureSetter__range::-moz-range-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	background: rgba(62, 109, 67, 0.71);
	border-radius: 1.3px;
	border: 0.2px solid #010101;
}
.temperatureSetter__range::-moz-range-thumb {
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	border: 1px solid #3e6d43;
	height: 20px;
	width: 20px;
	border-radius: 50px;
	background: #3e6d43;
	cursor: pointer;
}
.temperatureSetter__range::-ms-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	background: transparent;
	border-color: transparent;
	color: transparent;
}
.temperatureSetter__range::-ms-fill-lower {
	background: rgba(53, 93, 57, 0.71);
	border: 0.2px solid #010101;
	border-radius: 2.6px;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
.temperatureSetter__range::-ms-fill-upper {
	background: rgba(62, 109, 67, 0.71);
	border: 0.2px solid #010101;
	border-radius: 2.6px;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
.temperatureSetter__range::-ms-thumb {
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	border: 1px solid #3e6d43;
	height: 20px;
	width: 20px;
	border-radius: 50px;
	background: #3e6d43;
	cursor: pointer;
	height: 8.4px;
}
.temperatureSetter__range:focus::-ms-fill-lower {
	background: rgba(62, 109, 67, 0.71);
}
.temperatureSetter__range:focus::-ms-fill-upper {
	background: rgba(71, 125, 77, 0.71);
}
</style>
