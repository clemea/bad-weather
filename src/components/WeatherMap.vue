<template>
	<div class="map">
		<l-map :zoom="zoom" :center="center" ref="map">
			<l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
			<l-marker
				:lat-lng="marker"
				:draggable="true"
				@dragend="getNewWeather"
				ref="marker"
			></l-marker>
		</l-map>
	</div>
</template>

<script>
// import * as Vue2Leaflet from "vue2-leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { mapActions, mapState } from "vuex";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: require("leaflet/dist/images/marker-icon.png"),
	shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
export default {
	data() {
		return {
			zoom: 13,
			// center: L.latLng(47.41322, -1.219482),
			url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
			attribution:
				'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			// marker: L.latLng(47.41322, -1.219482),
			
		};
	},
	computed: {
		...mapState(["coords"]),
		marker() {
			if (this.coords) {
				const newLatLng = new L.LatLng(
					this.coords.lat,
					this.coords.lng
				);
				// this.$refs.marker.setLatLng(newLatLng);
				// this.$refs.map.setCenter(newLatLng);
				return L.latLng(newLatLng);
			}
			return L.latLng(47.41322, -1.219482);
		},
		center() {
			if (this.coords) {
				const newLatLng = new L.LatLng(
					this.coords.lat,
					this.coords.lng
				);
				return L.latLng(newLatLng);
			}
			return L.latLng(47.41322, -1.219482);
		}
	},

	methods: {
		...mapActions(["updateInfo", "setPlaceSuggested", "setPlaceNotFound"]),
		getNewWeather(val) {
			this.updateInfo(val.target.getLatLng());
			this.setPlaceSuggested(false)
			this.setPlaceNotFound(false)
		}
	},
	mounted() {
		// this.$nextTick(() => {
		// 	//this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
		// 	// this.$refs.map.mapObject
		// });
	},
	components: {
		LMap,
		LTileLayer,
		LMarker
	}
};
</script>

<style lang="postcss" scoped>
.map {
	width: 100%;
	height: 300px;
}
</style>
