
import { Emitter } from 'q/utils/emitter.js'
import { local } from 'q/utils/storage.js'
import { ClockModel } from 'clock/model.js'
import { logger } from 'clock/logger.js'

export const STORAGE_KEY = 'clocks'


class ClockStore {
	#data = {}
	#emitter

	constructor(data = []) {
		this.#emitter = new Emitter()

		data.forEach(item => {
			const clock = ClockModel.fromJson(item)

			this.#data[clock.id] = clock
		})

		logger().log('ClockStore', data, this.#data)
	}

	get all() {
		return Object.values(this.#data)
	}

	upsert(item) {
		logger().log('ClockStore.upsert', item)

		if(!(item instanceof ClockModel)) {
			item = ClockModel.fromJson(item)
		}

		this.#data[item.id] = item
		this.#emitter.on('upsert', item)
		this.#emitter.emit('change:all', 'all', this.all)

		return item
	}

	remove(item) {
		logger().log('ClockStore.remove', item)

		if(!(item instanceof ClockModel)) {
			item = ClockModel.fromJson(item)
		}

		delete this.#data[item.id]

		this.#emitter.emit('remove', item)
		this.#emitter.emit('change:all', 'all', this.all)

		return item
	}

	// Emitter methods

	on(event, callback) {
		return this.#emitter.on(event, callback)
	}

	off(event, reference) {
		return this.#emitter.off(event, reference)
	}

	clear() {
		this.#emitter.clear()
	}
}


export const clockStore = new ClockStore(local.get(STORAGE_KEY) ?? [])

clockStore.on('change:all', (_, data) => {
	logger().log('clockStore.on("add")', data)

	const clocks = data.map(clock => clock.toJson())

	logger().log('local.set', STORAGE_KEY, clocks)

	local.set(STORAGE_KEY, clocks)
})
