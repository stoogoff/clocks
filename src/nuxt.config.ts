
import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['~/assets/style.css'],
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	app: {
		head: {
			titleTemplate: '%s | Clocks',
		},
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@primevue/nuxt-module',
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
