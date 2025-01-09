
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		port: 3000,
	},
	optimizeDeps: {
		allowNodeBuiltins: ['pouchdb-browser', 'pouchdb-utils']
	},
	build : {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				nested: resolve(__dirname, 'about/index.html'),
			},
		},
	},
})
