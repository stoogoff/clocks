
import { Emitter } from 'exp/reactive/emitter.js'
import { ClockModel } from './model.js'
import { logger } from './logger.js'

export class ClockStore extends Emitter {
	#data = []

	constructor(data) {
		super()

		logger().log('ClockStore.constructor', data)

		this.#data = data.map(clock => ClockModel.fromJson(clock))
	}

	all() {
		return this.#data
	}

	add(item) {
		const clock = ClockModel.fromJson(item)

		this.#data = [ ...this.#data, clock ]

		this.emit('add', clock)
		this.emit('change', this.#data)

		return clock
	}

	update(item) {
		const clock = ClockModel.fromJson(item)
		const index = this.#data.map(({ id }) => id).indexOf(clock.id)

		if(index > -1) {
			this.#data[index] = clock

			this.emit('update', clock)
			this.emit('change', this.#data)
		}
		else {
			this.add(item)
		}

		return clock
	}

	remove(item) {
		const clock = ClockModel.fromJson(item)

		this.#data = this.#data.filter(({ id }) => id !== clock.id)

		this.emit('remove', clock)
		this.emit('change', this.#data)

		return clock
	}
}

import { local } from 'exp/utils/storage'

const STORAGE_KEY = 'clocks'

export const clockStore = new ClockStore(local.get(STORAGE_KEY) ?? [])

clockStore.on('change', data => {
	logger().log('clockStore.onChange', data)
	logger().log('local.set', STORAGE_KEY, data.map(clock => clock.toJson()))

	local.set(STORAGE_KEY, data.map(clock => clock.toJson()))
})
