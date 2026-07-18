
import { setLogger, ConsoleLogger, LOG_LEVEL_LOG, LOG_LEVEL_INFO } from 'q/utils/logger.js'
import { directives } from 'q/reactive/directives.js'
import ClockAdd from 'clock/add.js'
import ClockManager from 'clock/manager.js'
import ClockView from 'clock/view.js'
import { clockStore } from 'clock/store.js'
import { CLOCK_LOG_KEY } from 'clock/logger.js'

setLogger(CLOCK_LOG_KEY, ConsoleLogger, LOG_LEVEL_INFO)

// register custom component
directives.register('colour', (context) => {
	context.node.style.backgroundColor = context.value

	return false
})

// register components and load
directives.registerComponent('clock', ClockView)
directives.registerComponent('clock-add', ClockAdd)
directives.registerComponent('clock-manager', ClockManager)
directives.load(document.body)
