
import { setLogger, ConsoleLogger, LOG_LEVEL_LOG, LOG_LEVEL_INFO } from 'quick/utils/logger.js'
import { directives } from 'quick'
import ClockAdd from '/modules/clock/add.js'
import ClockManager from '/modules/clock/manager.js'
import ClockView from '/modules/clock/view.js'
import { clockStore } from '/modules/clock/store.js'
import { CLOCK_LOG_KEY } from '/modules/clock/logger.js'

setLogger(CLOCK_LOG_KEY, ConsoleLogger, LOG_LEVEL_INFO)

// register custom component
directives.register('colour', (node, property, scope) => {
	node.style.backgroundColor = scope.data[property]

	return false
})

// register components and load
directives.registerComponent('clock', ClockView)
directives.registerComponent('clock-add', ClockAdd)
directives.registerComponent('clock-manager', ClockManager)
directives.load(document.body)
