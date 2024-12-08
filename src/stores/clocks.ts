
import { defineStore } from 'pinia'
import { ClockModel } from '~/models/clock.ts'

interface ClockState {
	clocks: ClockModel[]
}

export const useClockStore = defineStore('clocks', {
	state: (): ClockState => {
		return {
			clocks: [],
		}
	},

	actions: {
		add(clock: ClockModel) {
			this.clocks.push(clock)
		},

		remove(input: ClockModel) {
			this.clocks = this.clocks.filter((clock: ClockModel) => clock.id !== input.id)
		}
	},
})
