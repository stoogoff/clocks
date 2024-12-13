
import PouchDB from 'pouchdb'
import { getAllClocks } from '~/storage/clock-storage.ts'
import { ClockModel, IClock } from '~/models/clock.ts'
import { useClockStore } from '~/stores/clocks.ts'

export default defineNuxtPlugin(async ({ $pinia }) => {
	if(!import.meta.client) return

	const database = usePouch()
	const store = useClockStore()
	const clocks = await getAllClocks()

	store.initialise(clocks)
})
