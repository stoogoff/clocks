
const KEY = 'clocks'
const CACHE_VERSION = '~VERSION~'
const CACHE_NAME = `${KEY}-${CACHE_VERSION}`
const PRECACHE = [
	'/index.html',
	'/about/index.html',
	'/media/clock-12.png',
	'/media/clock-3.png',
	'/media/clock-4.png',
	'/media/clock-6.png',
	'/media/clock-8.png',
	'/media/logo-192.png',
	'/media/logo-512.png',
	'/media/we-evolve.png',
	// START block which gets path rewritten to add version
	'/css/colours.css',
	'/css/reset.css',
	'/css/styles.css',
	'/css/variables.css',
	'/js/register.js',
	'/js/main.js',
	'/js/modules/clock/add.js',
	'/js/modules/clock/logger.js',
	'/js/modules/clock/manager.js',
	'/js/modules/clock/model.js',
	'/js/modules/clock/store.js',
	'/js/modules/clock/view.js',
	// END block which gets path rewritten to add version
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/component.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/config.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/context.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives/attribute.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives/boolean.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives/component.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives/each.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives/event.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives/include.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives/index.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives/input.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives/store.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives/template.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/reactive/directives/text.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/utils/assert.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/utils/emitter.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/utils/logger.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/utils/storage.js',
	'https://cdn.we-evolve.co.uk/js/q/v1.1.1/utils/string.js',
]

self.addEventListener('install', event => {
	event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)))
	self.skipWaiting()
})

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then(keys => Promise.all(
			keys
				.filter((key) => key.startsWith(`${KEY}-`) && key !== CACHE_NAME)
				.map((key) => caches.delete(key))
		))
	)
	self.clients.claim()
})

self.addEventListener('fetch', (event) => {
	if(event.request.method !== 'GET') return
	
	event.respondWith(
		caches.match(event.request).then(cached => {
			if(cached) return cached

			return fetch(event.request).then(response => {
				if(response.ok && response.type === 'basic') {
					const clone = response.clone()

					caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
				}

				return response
			})
		})
	)
})
