<template>
	<div>
       here be forecast
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
	data() {
		return {
			
		};
	},
	computed: {
		...mapState(["forecast"]),
	},
	methods: {},

	components: {}
};
</script>

<style lang="postcss" scoped>
</style>
