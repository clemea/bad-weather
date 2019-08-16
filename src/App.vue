<template>
	<div id="app">
		<Weather />
	</div>
</template>

<script>
import Weather from '@/components/Weather.vue'

export default {
	name: 'app',
	components: {
		Weather
	}
}
</script>

<style>
html {
    box-sizing: border-box;
}
*,
*::before,
*::after {
	box-sizing: inherit;
}
body {
	margin: 0;
	padding: 0;
	background-image: url('~@/assets/bg.jpg');
	background-size: cover;
}
#app {
	font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/* color: #2c3e50; */
	/* margin-top: 60px; */
}
</style>
