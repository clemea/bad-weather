<template>
	<div>
		<TemperatureSetter />
		<WeatherMap />
		<WeatherInfo v-if="weather" />
		<WeatherForecast v-if="forecast" />
		<div v-if="geolocationFail">Geolocation fail</div>
	</div>
</template>

<script>
// import SunCalc from "suncalc";
import { mapActions, mapState } from "vuex";
import WeatherMap from "@/components/WeatherMap.vue";
import WeatherInfo from "@/components/WeatherInfo.vue";
import WeatherForecast from "@/components/WeatherForecast.vue";
import TemperatureSetter from "@/components/TemperatureSetter.vue";
export default {
	data() {
		return {
			geolocationFail: false,
			geoLocationOptions: {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			}
		};
	},
	computed: {
		...mapState(["weather", "forecast"])
	},
	methods: {
		...mapActions(["updateInfo"]),
		getCurrentLocation() {
			navigator.geolocation.getCurrentPosition(
				this.setInitialData,
				this.initGeoError,
				this.geoLocationOptions
			);
		},
		setInitialData(position) {
			this.updateInfo({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			});
		},
		initGeoError() {
			console.warn("geo error");
			this.geolocationFail = true;
		},
	},
	mounted() {
		this.getCurrentLocation();
	},
	components: {
		WeatherMap,
		WeatherInfo,
		WeatherForecast,
		TemperatureSetter
	}
};
</script>

<style lang="postcss" scoped>
</style>
