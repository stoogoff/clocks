
import { isNull, isEmptyArray } from 'exp/utils/assert.js'

// drawing constants
const CENTRE = { x: 150, y: 150 }
const RADIUS = 142
const Wedge = segments => (Math.PI * 2) / segments

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
		},
	},

	mounted() {
		const canvas = this.node.getElementsByTagName('canvas')

		if(isEmptyArray(canvas)) throw new Error('Clock requires 1 canvas element')

		this.canvas = canvas[0]
		this.context = canvas[0].getContext('2d')

		this.drawAllSegments()
	},

	render(pos) {
		if(isNull(this.context)) return

		const WEDGE = Wedge(this.data.segments)

		this.context.beginPath()
		this.context.moveTo(CENTRE.x, CENTRE.y)
		this.context.arc(CENTRE.x, CENTRE.y, RADIUS, WEDGE * pos, WEDGE * (pos + 1))
		this.context.closePath()
		this.context.fillStyle = this.data.colour
		this.context.fill()
	},

	drawAllSegments() {
		if(this.data.filled > 0) {
			for(let i = 0; i < this.data.filled; ++i) {
				this.render(i)
			}
		}
	},

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
	},

	draw(scope) {
		//if(readonly) return
		if(this.data.filled >= this.data.segments) return

		this.render(this.data.filled)

		this.data.filled++
		//emit('update', clock)
	},

	remove(scope) {
		console.log('remove', scope)
		//if(readonly) return

		//emit('remove', clock)
	},

	erase(scope) {
		//if(readonly) return
		if(this.data.filled <= 0) return

		this.data.filled--

		//emit('update', clock)
		this.clear()
		this.drawAllSegments()
	},
}