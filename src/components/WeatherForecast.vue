

<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
	extends: Line,
	mixins: [reactiveProp],
	data() {
		return {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				scales: {
					xAxes: [
						{
							ticks: {
								fontColor: '#fff'
							},
							gridLines: {
								display: false
							}
						}
					],
					yAxes: [
						{
							ticks: {
								stepSize: 1,
								fontColor: '#fff',
								callback(value) {
									return `${value} \u00B0C`
								}
							},
							gridLines: {
								drawBorder: false,
								color: 'rgba(0, 0, 0, 0.6)'
							}
						}
					]
				}
			}
		}
	},

	methods: {},
	mounted() {
		this.renderChart(this.chartData, this.options)
	},
	components: {}
}
</script>

<style lang="postcss" scoped>
</style>
