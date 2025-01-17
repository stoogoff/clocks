
import { CollectionStore } from 'exp/store/collection-store.js'
import { local } from 'exp/utils/storage.js'
import { ClockModel } from './model.js'
import { logger } from './logger.js'

export const STORAGE_KEY = 'clocks'

export const clockStore = new CollectionStore(local.get(STORAGE_KEY) ?? [], ClockModel.fromJson)

clockStore.on('change', data => {
	const clocks = data.map(clock => clock.toJson())

	logger().log('clockStore.on("change")', data)
	logger().log('local.set', STORAGE_KEY, clocks)

	local.set(STORAGE_KEY, clocks)
})
