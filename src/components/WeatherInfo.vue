<template>
	<div>
		<div>{{ weather.main.temp }} &#176;C</div>
		<div v-show="sunrise">Рассвет: {{ sunrise }}</div>
		<div v-show="sunset">Закат: {{ sunset }}</div>
		<div v-show="badWeather">
			Ugh...
			<span @click="refreshMap" class="link">Take me somewhere!</span>
		</div>
		<div v-show="!badWeather">Looks good</div>
		<a :href="googleMapsLink" target="_blank" v-if="placeSuggested">
			link
		</a>
		<div v-show="placeNotFound">Couldn't find the location that is good enough.</div>
	</div>
</template>

<script>
import moment from "moment";
import SunCalc from "suncalc";
import { mapActions, mapState } from "vuex";
import testCoords from "@/testCoord.json";
export default {
	data() {
		return {};
	},
	computed: {
		...mapState(["weather", "coords", "badWeather", "placeSuggested", "placeNotFound"]),
		sunInfo(lat, lng) {
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
			return isNaN(Date.parse(this.sunInfo.sunrise))
				? null
				: moment(this.sunInfo.sunrise).format("HH:mm");
		},
		sunset() {
			return isNaN(Date.parse(this.sunInfo.sunset))
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
.link {
	font-weight: bold;
	cursor: pointer;
}
</style>
