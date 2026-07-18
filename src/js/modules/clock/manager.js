
import { isEmptyArray } from 'q/utils/assert.js'
import { clockStore } from 'clock/store.js'
import { logger } from 'clock/logger.js'

export default {
	mounted() {
		clockStore.on('change', () => {
			logger().info('manager: clockStore.on("change")')
			this.emit('change')
		})
	},

	computed: {
		hasClocks() {
			return !isEmptyArray(clockStore.all)
		},

		clocks() {
			return clockStore.all
		},
	},
}
