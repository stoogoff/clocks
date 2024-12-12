
import { usePouch } from '~/composables/use-pouch.ts'
import { ClockModel } from '~/models/clock.ts'

export const storeNewClock = (clock: ClockModel) => {
	const database = usePouch()

	database.put(clock.toJson())
}

export const removeClock = async (clock: ClockModel) => {
	const database = usePouch()
	const existing = await database.get(clock.id)

	database.remove(existing)
}

export const updateClock = async (clock: ClockModel) => {
	const database = usePouch()
	const existing = await database.get(clock.id)

	await database.put({ ...existing, ...clock.toJson() })
}
