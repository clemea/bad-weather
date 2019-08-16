<template>
	<div class="weatherInfo">
		<div class="weatherInfo__main">
			<img
				:src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`"
				alt=""
				class="weatherInfo__icon"
			/>
			<div class="weatherInfo__temp">{{ weather.main.temp }} &#176;C</div>
		</div>
		<ul class="weatherInfo__sun">
			<li v-show="sunrise">Рассвет: {{ sunrise }}</li>
			<li v-show="sunset">Закат: {{ sunset }}</li>
		</ul>
		<div v-show="badWeather && !placeNotFound">
			Ugh...
			<span @click="refreshMap" class="weatherInfo__refresher"
				>Take me somewhere!</span
			>
		</div>
		<div v-show="!badWeather && !placeSuggested">Looks good</div>
		<a
			:href="googleMapsLink"
			target="_blank"
			v-if="placeSuggested"
			class="googleLink"
		>
			link
		</a>
		<div v-show="placeNotFound">
			Couldn't find the location that is good enough.
		</div>
	</div>
</template>

<script>
import moment from "moment";
import SunCalc from "suncalc";
import { mapActions, mapState } from "vuex";

export default {
	data() {
		return {};
	},
	computed: {
		...mapState([
			"weather",
			"coords",
			"badWeather",
			"placeSuggested",
			"placeNotFound"
		]),
		sunInfo() {
			if (this.coords) {
				return SunCalc.getTimes(
					new Date(),
					this.coords.lat,
					this.coords.lng
				);
			}
			return null;
		},
		sunrise() {
			return Number.isNaN(Date.parse(this.sunInfo.sunrise))
				? null
				: moment(this.sunInfo.sunrise).format("HH:mm");
		},
		sunset() {
			return Number.isNaN(Date.parse(this.sunInfo.sunset))
				? null
				: moment(this.sunInfo.sunset).format("HH:mm");
		},
		googleMapsLink() {
			return `http://maps.google.com/maps?q=&layer=c&cbll=${
				this.coords.lat
			},${this.coords.lng}&cbp=11,0,0,0,0`;
		}
	},
	methods: {
		...mapActions([
			"setBadWeatherStatus",
			"updateInfo",
			"checkWeather",
			"setPlaceSuggested",
			"getNewPlace"
		]),
		refreshMap() {
			this.getNewPlace();
		}
	}
};
</script>

<style lang="postcss" scoped>
.weatherInfo {
	font-size: 18px;
	padding: 25px;
}
.weatherInfo__temp {
	font-size: 40px;
	margin-bottom: 20px;
}

.weatherInfo__main {
	display: flex;
	align-items: center;
}

.weatherInfo__icon{
	width: 50px;
	flex-shrink: 0;
}
.weatherInfo__sun {
	margin: 0 0 20px;
	padding: 0;
	list-style-type: none;
}

.weatherInfo__refresher {
	font-weight: bold;
	cursor: pointer;
	color: #fff;
	border-bottom: 1px solid #fff;
	transition: all 0.2s ease-in-out;
	&:hover {
		border-bottom-color: transparent;
	}
}

.googleLink {
	color: #fff;
}
</style>
