
import { DIRECTIVES_LOG_KEY } from 'exp/reactive/config.js'
import { setLogger, ConsoleLogger, LOG_LEVEL_LOG, LOG_LEVEL_INFO } from 'exp/utils/logger.js'

import { directives } from 'exp'
import ClockAdd from '/modules/clock/add.js'
import ClockManager from '/modules/clock/manager.js'
import ClockView from '/modules/clock/view.js'
import { CLOCK_LOG_KEY } from '/modules/clock/logger.js'

//setLogger(DIRECTIVES_LOG_KEY, ConsoleLogger, LOG_LEVEL_LOG)
setLogger(CLOCK_LOG_KEY, ConsoleLogger, LOG_LEVEL_INFO)

directives.registerComponent('clock', ClockView)
directives.registerComponent('clock-add', ClockAdd)
directives.registerComponent('clock-manager', ClockManager)
directives.load(document.body)
