<template>
	<div @click="triggerForecast" class="forecastTrigger">
		{{ text }}
	</div>
</template>

<script>
export default {
	data() {
		return {
			forecastShown: false
		}
	},
	computed: {
		text() {
			return this.forecastShown ? 'hide forecast' : 'show forecast'
		}
	},
	methods: {
		triggerForecast() {
			this.forecastShown = !this.forecastShown
			this.$emit('triggerForecast', this.forecastShown)
		}
	}
}
</script>

<style lang="postcss" scoped>
.forecastTrigger {
	margin-top: auto;
	cursor: pointer;
	width: 100%;
	background: rgba(0, 0, 0, 0.4);
	padding: 10px;
	font-size: 15px;
	text-align: center;
	transition: background 0.2s ease-in-out;
	&:hover{
		background: rgba(0, 0, 0, 0.5);
	}
}
</style>
