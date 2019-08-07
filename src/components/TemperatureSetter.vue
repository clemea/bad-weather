<template>
	<div>
		Set your min temperature
		<input
			type="range"
			min="-50"
			max="50"
			step="1"
			:value="value || minTemp"
			@input="input"
            @change="change"
		/>
		{{ value || minTemp }}
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
	data() {
		return {
			value: null
		};
	},
	computed: {
		...mapState(["minTemp"])
	},
	methods: {
        ...mapActions(["setMinTemp"]),
		change(event) {
			this.setMinTemp(event.target.value)
		},
		input(event) {
			this.value = event.target.value;
		}
	},

	components: {}
};
</script>

<style lang="postcss" scoped>
</style>
