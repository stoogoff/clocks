
import { PiniaPluginContext } from 'pinia'
import { usePouch } from '~/composables/use-pouch.ts'
import { ClockModel } from '~/models/clock.ts'
import { useClockStore } from '~/stores/clocks.ts'

export default defineNuxtPlugin(async ({ $pinia }) => {
	if(import.meta.client) {
		const database = usePouch()
		const store = useClockStore()
		const response = await database.allDocs({
			include_docs: true,
		})

		console.log(response.rows)
		console.log(response.rows.map(row => ClockModel.fromJson(row.doc)))

		store.initialise(response.rows.map(row => ClockModel.fromJson(row.doc)))
	}

	$pinia.use(({ store }) => {
		store.$subscribe(async (mutation, state) => {
			if(mutation.storeId !== 'clocks') return

			console.log(mutation)
			console.log('type=', mutation.type)
			console.log('storeId=', mutation.storeId)
			console.log('payload=', mutation.payload)
			//console.log(state.clocks)

/*			for(const clock of state.clocks) {
				console.log(clock.toJson())
				await database.put(clock.toJson())
			}*/

			// this will not handle delete
		})
	})
})
