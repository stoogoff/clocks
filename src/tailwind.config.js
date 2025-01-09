module.exports = {
	content: [
		'./*.html',
		'./*/**.html',
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
		themes: ['winter'],
	},
}