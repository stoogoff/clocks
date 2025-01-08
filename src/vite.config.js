
import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		port: 3000
	},
	optimizeDeps: {
		allowNodeBuiltins: ['pouchdb-browser', 'pouchdb-utils']
	}
})
