
import { defineStore } from 'pinia'
//import { usePouch } from '~/composables/use-pouch.ts'
import { ClockState, ClockModel } from '~/models/clock.ts'

export const useClockStore = defineStore('clocks', {
	state: async () => {
		return {
			clocks: [],
		}
	},

	actions: {
		async add(clock: ClockModel) {
			/*const database = usePouch()

			database.put(clock.toJson())*/
			this.clocks.push(clock)
		},

		remove(input: ClockModel) {
			/*const database = usePouch()

			database.remove(input.toJson())*/
			this.clocks = this.clocks.filter((clock: ClockModel) => clock.id !== input.id)
		},

		initialise(data: ClockModel[]) {
			this.$patch({ clocks: data })
		},
	},
})
