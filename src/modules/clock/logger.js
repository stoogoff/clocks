
import { getLogger, ConsoleLogger } from 'quick/utils/logger.js'

export const CLOCK_LOG_KEY = 'Clock'

export const logger = () => getLogger(CLOCK_LOG_KEY)
