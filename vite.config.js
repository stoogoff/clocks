
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	root: 'src',
	server: {
		port: 3000,
	},
	optimizeDeps: {
		allowNodeBuiltins: ['pouchdb-browser', 'pouchdb-utils']
	},
	build : {
		outDir: resolve(__dirname, 'dist'),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/index.html'),
				nested: resolve(__dirname, 'src/about/index.html'),
			},
		},
	},
})
