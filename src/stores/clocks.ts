
import { defineStore } from 'pinia'
import { storeNewClock, removeClock, updateClock } from '~/storage/clock-storage.ts'
import { ClockState, ClockModel } from '~/models/clock.ts'

export const useClockStore = defineStore('clocks', {
	state: () => {
		return {
			clocks: [],
		}
	},

	actions: {
		async add(clock: ClockModel) {
			storeNewClock(clock)
			this.clocks.push(clock)
		},

		async remove(input: ClockModel) {
			removeClock(input)
			this.clocks = this.clocks.filter((clock: ClockModel) => clock.id !== input.id)
		},

		async update(clock: ClockModel) {
			updateClock(clock)
		},

		initialise(data: ClockModel[]) {
			this.$patch({ clocks: data })
		},
	},
})
