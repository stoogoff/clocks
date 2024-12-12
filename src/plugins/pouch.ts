
import PouchDB from 'pouchdb'
import { ClockModel, IClock } from '~/models/clock.ts'
import { useClockStore } from '~/stores/clocks.ts'

export default defineNuxtPlugin(async ({ $pinia }) => {
	if(!import.meta.client) return

	const database = usePouch()
	const store = useClockStore()
	const response = await database.allDocs({
		include_docs: true,
	})

	store.initialise(response.rows.map((row: IClock) => ClockModel.fromJson(row.doc)))
})
