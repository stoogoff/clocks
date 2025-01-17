
import { isEmptyArray } from 'quick/utils/assert.js'
import { clockStore } from './store.js'
import { logger } from './logger.js'

export default {
	mounted() {
		clockStore.on('change', () => {
			logger().info('manager: clockStore.on("change")')
			this.emit('change')
		})
	},

	computed: {
		hasClocks() {
			return !isEmptyArray(clockStore.all())
		},

		clocks() {
			return clockStore.all()
		},
	},
}
