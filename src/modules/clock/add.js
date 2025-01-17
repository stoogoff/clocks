
import { isEmptyString, isNull } from 'exp/utils/assert.js'
import { clockStore } from './store.js'
import { logger } from './logger.js'

export default {
	data: {
		title: '',
		segments: null,
		colour: null,
	},

	computed: {
		disabled() {
			return isEmptyString(this.data.title) ||
				isNull(this.data.segments) ||
				isNull(this.data.colour)
		},

		colours() {
			return [
				{ colour: '#4B5563' },
				{ colour: '#DC2626' },
				{ colour: '#D97706' },
				{ colour: '#059669' },
				{ colour: '#2563EB' },
				{ colour: '#7C3AED' },
			]
		}
	},

	setColour(evt) {
		if(this.currentTarget) {
			this.currentTarget.style.border = ''
		}

		this.currentTarget = evt.target
		this.currentTarget.style.border = '2px solid rgba(0, 0, 0, 0.8)'
		this.data.colour = this.currentTarget.style.backgroundColor

		logger().log(this.data.colour)
	},

	save() {
		const clock = {
			segments: parseInt(this.data.segments),
			title: this.data.title,
			colour: this.data.colour ?? '#444',
		}

		logger().info('add.save', clock)

		clockStore.add(clock)

		const details = this.node.getElementsByTagName('details')

		if(details.length > 0) {
			details[0].removeAttribute('open')
		}

		this.data.title = ''
		this.data.segments = null
		this.data.colour = null

		this.currentTarget.style.border = ''
		this.currentTarget = null
	},
}
