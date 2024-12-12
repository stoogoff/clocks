
import { defineStore } from 'pinia'
import { usePouch } from '~/composables/use-pouch.ts'
import { ClockState, ClockModel } from '~/models/clock.ts'

export const useClockStore = defineStore('clocks', {
	state: () => {
		return {
			clocks: [],
		}
	},

	actions: {
		async add(clock: ClockModel) {
			const database = usePouch()

			database.put(clock.toJson())
			this.clocks.push(clock)
		},

		async remove(input: ClockModel) {
			const database = usePouch()
			const clock = await database.get(input.id)

			database.remove(clock)
			this.clocks = this.clocks.filter((clock: ClockModel) => clock.id !== input.id)
		},

		async update(input: ClockModel) {
			const database = usePouch()
			const clock = await database.get(input.id)

			await database.put({ ...clock, ...input.toJson() })
		},

		initialise(data: ClockModel[]) {
			this.$patch({ clocks: data })
		},
	},
})
