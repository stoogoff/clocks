import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['~/assets/style.css'],
	compatibilityDate: '2024-04-03',
	devtools: { enabled: false },
	runtimeConfig: {
		public: {
			database: process.env.POUCH_DATABASE,
		},
	},
	app: {
		head: {
			titleTemplate: '%s | Clocks',
		},
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@primevue/nuxt-module',
		'@pinia/nuxt',
	],
	primevue: {
		components: {
			prefix: 'Prime',
		},
		options: {
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: 'system',
				},
			},
		},
	},
})