
import PouchDB from 'pouchdb'
//import { PiniaPluginContext } from 'pinia'
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

	$pinia.use(({ store }) => {
		console.log('subscribe')

		store.$subscribe(async (mutation, state) => {
			console.log(mutation)
			console.log('type=', mutation.type)
			console.log('storeId=', mutation.storeId)
			console.log('payload=', mutation.payload)

			if(mutation.storeId !== 'clocks') return

			//console.log(state.clocks)

			for(const clock of state.clocks) {
				console.log(clock.toJson())
				await database.put(clock.toJson())
			}

			// this will not handle delete
		})
	})
})
