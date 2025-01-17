
import PouchDB from 'pouchdb'
import { getLogger } from 'exp/utils/logger.js'
import { STORAGE_KEY } from '/modules/clock/store.js'

export const POUCH_LOG_KEY = 'Pouch'

const logger = () => getLogger(POUCH_LOG_KEY)
const database = new PouchDB(STORAGE_KEY)

export const getAllClocks = async () => {
	logger().info('pouch/getAllClocks')
	const response = await database.allDocs({
		include_docs: true,
	})

	logger().log(response)

	return response.rows.map(({ doc }) => doc)
}

export const removeClock = async clock => {
	logger().info('pouch/removeClock', clock)

	const existing = await database.get(clock._id)

	logger().log(existing)

	database.remove(existing)
}
