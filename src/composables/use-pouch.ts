
import PouchDB from 'pouchdb'

export const usePouch = () => {
	const config = useRuntimeConfig()
	const database = new PouchDB(config.public.database)

	return database
}
