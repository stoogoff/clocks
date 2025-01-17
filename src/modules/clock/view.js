
import { isNull, isEmptyArray } from 'quick/utils/assert.js'
import { ClockModel } from './model.js'
import { clockStore } from './store.js'
import { logger } from './logger.js'

// drawing constants
const CENTRE = { x: 150, y: 150 }
const RADIUS = 142
const Wedge = segments => (Math.PI * 2) / segments

export default {
	data: {
		segments: 8,
		title: 'Sample Clock',
		filled: 3,
		colour: '#D97706',
	},

	computed: {
		imagePath() {
			return `/assets/img/clock-${ this.data.segments }.png`
		},
	},

	mounted() {
		logger().log('view.mounted', this.data)

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

	draw() {
		if(this.data.filled >= this.data.segments) return

		this.render(this.data.filled)

		this.data.filled++

		clockStore.update(this.data)
	},

	remove() {
		clockStore.remove(this.data)
	},

	erase() {
		if(this.data.filled <= 0) return

		this.data.filled--

		clockStore.update(this.data)

		this.clear()
		this.drawAllSegments()
	},
}