
import { ListStore } from 'q/data/list-store.js'
import { local } from 'q/utils/storage.js'
import { ClockModel } from 'clock/model.js'
import { logger } from 'clock/logger.js'

export const STORAGE_KEY = 'clocks'

export const clockStore = new ListStore(local.get(STORAGE_KEY) ?? [], ClockModel.fromJson)

clockStore.on('change:all', (_, data) => {
	const clocks = data.map(clock => clock.toJson())

	logger().log('clockStore.on("add")', data)
	logger().log('local.set', STORAGE_KEY, clocks)

	local.set(STORAGE_KEY, clocks)
})
