<template>
	<main class="wrapper">
		<TemperatureSetter />
		<div class="mainInfo">
			<div class="mainInfo__aside">
				<WeatherInfo v-if="weather" />
				<ForecastTrigger
					@triggerForecast="triggerForecast"
					v-if="forecast"
				/>
			</div>
			<WeatherMap />
		</div>
		<div class="forecastWrapper" v-if="forecast && forecastShown">
			<WeatherForecast :chart-data="chartData" />
		</div>
		<div v-if="geolocationFail">Geolocation fail</div>
	</main>
</template>

<script>
import { mapActions, mapState } from "vuex";
import WeatherMap from "@/components/WeatherMap.vue";
import WeatherInfo from "@/components/WeatherInfo.vue";
import WeatherForecast from "@/components/WeatherForecast.vue";
import TemperatureSetter from "@/components/TemperatureSetter.vue";
import ForecastTrigger from "@/components/ForecastTrigger.vue";

export default {
	data() {
		return {
			geolocationFail: false,
			geoLocationOptions: {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			},
			forecastShown: false
		};
	},
	computed: {
		...mapState(["weather", "forecast"]),
		days() {
			const months = [
				"Янв",
				"Фев",
				"Мрт",
				"Апр",
				"Май",
				"Июн",
				"Июл",
				"Авг",
				"Сен",
				"Окт",
				"Нбр",
				"Дек"
			];
			const daysArr = [];
			for (let i = 0; i < 7; i++) {
				let currentDate = new Date();
				currentDate.setDate(currentDate.getDate() + i);
				daysArr.push(
					`${currentDate.getDate()} ${months[currentDate.getMonth()]}`
				);
			}

			return daysArr;
		},
		chartData() {
			const tempList = this.forecast.list.reduce((memo, curr) => {
				memo.push(curr.temp.day.toFixed(1));
				return memo;
			}, []);
			return {
				labels: this.days,
				datasets: [
					{
						backgroundColor: "transparent",
						borderColor: "rgba(255, 255, 255, 0.8)",
						borderWidth: "4",
						pointBorderWidth: "5",
						data: tempList
					}
				]
			};
		}
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
		triggerForecast(val) {
			this.forecastShown = val;
		}
	},
	mounted() {
		this.getCurrentLocation();
	},
	components: {
		WeatherMap,
		WeatherInfo,
		WeatherForecast,
		TemperatureSetter,
		ForecastTrigger
	}
};
</script>

<style lang="postcss" scoped>
.wrapper {
	max-width: 1200px;
	margin: 0 auto;
	min-height: 100vh;
	overflow: hidden;
	color: #fff;
}
.mainInfo {
	display: flex;
	margin: 20px 0 30px;
	box-shadow: 0px 0px 11px 8px rgba(0, 0, 0, 0.1);
	@media only screen and (max-width: 1025px) {
		flex-wrap: wrap;
	}
}

.mainInfo__aside {
	flex-basis: 300px;
	flex-grow: 1;
	background: rgba(6, 64, 27, 0.3);
	display: flex;
	flex-direction: column;
	@media only screen and (max-width: 1025px) {
		order: 1;
		background: rgba(6, 64, 27, 0.6);
	}
}

.forecastWrapper {
	background: rgba(0, 0, 0, 0.3);
	border-radius: 5px;
	padding: 30px 20px 20px;
	/* box-shadow: 0px 0px 11px 8px rgba(0,0,0,0.1); */
}
</style>
