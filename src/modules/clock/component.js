
export default {
	data: {
		segments: 4,
		title: '',
		filled: 0,
		colour: '#444',
	},

	computed: {
		imagePath() {
			return `/assets/img/clock-${ this.data.segments }.png`
		}
	},

	draw(scope) {
		console.log('draw', scope)
	},

	remove(scope) {
		console.log('remove', scope)
	},

	erase(scope) {
		console.log('erase', scope)
	},
}