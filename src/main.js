
import { DIRECTIVES_LOG_KEY } from 'exp/reactive/config.js'
import { setLogger, ConsoleLogger, LOG_LEVEL_LOG, LOG_LEVEL_INFO } from 'exp/utils/logger.js'

import { directives } from 'exp'
import ClockAdd from '/modules/clock/add.js'
import ClockManager from '/modules/clock/manager.js'
import ClockView from '/modules/clock/view.js'
import { clockStore } from '/modules/clock/store.js'
import { CLOCK_LOG_KEY } from '/modules/clock/logger.js'
import { POUCH_LOG_KEY, getAllClocks, removeClock } from '/migrations/pouch.js'

//setLogger(DIRECTIVES_LOG_KEY, ConsoleLogger, LOG_LEVEL_LOG)
setLogger(CLOCK_LOG_KEY, ConsoleLogger, LOG_LEVEL_INFO)
setLogger(POUCH_LOG_KEY, ConsoleLogger, LOG_LEVEL_INFO)

async function migrateFromPouch() {
	const all = await getAllClocks()

	all.forEach(async clock => {
		clockStore.add(clock)

		await removeClock(clock)
	})
}

migrateFromPouch()

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
