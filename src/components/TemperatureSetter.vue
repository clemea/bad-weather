<template>
	<div class="temperatureSetter">
		<span class="temperatureSetter__text">Set your min temperature</span>
		<input
			type="range"
			min="-50"
			max="50"
			step="1"
			:value="value || minTemp"
			@input="input"
			@change="change"
			class="temperatureSetter__input"
		/>
		<span class="temperatureSetter__value">{{ value || minTemp }} °C</span>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	data() {
		return {
			value: null
		}
	},
	computed: {
		...mapState(['minTemp'])
	},
	methods: {
		...mapActions(['setMinTemp', 'resetPlacesInfo']),
		change(event) {
			this.setMinTemp(event.target.value)
			this.resetPlacesInfo()
		},
		input(event) {
			this.value = event.target.value
		}
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
}

.temperatureSetter__text {
}

.temperatureSetter__input {
	-webkit-appearance: none;
	width: 200px;
	margin: 0 20px;
	background: transparent;
}
.temperatureSetter__input:focus {
	outline: none;
}
.temperatureSetter__input::-webkit-slider-runnable-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	background: rgba(62, 109, 67, 0.71);
	border-radius: 1.3px;
	border: 0.2px solid #010101;
}
.temperatureSetter__input::-webkit-slider-thumb {
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
.temperatureSetter__input:focus::-webkit-slider-runnable-track {
	background: rgba(71, 125, 77, 0.71);
}
.temperatureSetter__input::-moz-range-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	background: rgba(62, 109, 67, 0.71);
	border-radius: 1.3px;
	border: 0.2px solid #010101;
}
.temperatureSetter__input::-moz-range-thumb {
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	border: 1px solid #3e6d43;
	height: 20px;
	width: 20px;
	border-radius: 50px;
	background: #3e6d43;
	cursor: pointer;
}
.temperatureSetter__input::-ms-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	background: transparent;
	border-color: transparent;
	color: transparent;
}
.temperatureSetter__input::-ms-fill-lower {
	background: rgba(53, 93, 57, 0.71);
	border: 0.2px solid #010101;
	border-radius: 2.6px;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
.temperatureSetter__input::-ms-fill-upper {
	background: rgba(62, 109, 67, 0.71);
	border: 0.2px solid #010101;
	border-radius: 2.6px;
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
.temperatureSetter__input::-ms-thumb {
	box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	border: 1px solid #3e6d43;
	height: 20px;
	width: 20px;
	border-radius: 50px;
	background: #3e6d43;
	cursor: pointer;
	height: 8.4px;
}
.temperatureSetter__input:focus::-ms-fill-lower {
	background: rgba(62, 109, 67, 0.71);
}
.temperatureSetter__input:focus::-ms-fill-upper {
	background: rgba(71, 125, 77, 0.71);
}
</style>
