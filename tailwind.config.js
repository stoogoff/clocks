module.exports = {
	content: [
		'./src/*.html',
		'./src/*/**.html',
		'./src/main.js',
		'./src/modules/**/*.js',
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
	],
	daisyui: {
		themes: ['winter'],
	},
}