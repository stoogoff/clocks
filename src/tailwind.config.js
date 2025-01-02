module.exports = {
	content: [
		'./index.html',
		'./main.js',
		'./modules/**/*.js',
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
	],
	daisyui: {
		themes: ['light'],
	},
}