
//import '/assets/styles.css';

import { directives } from 'exp'
import { isEmptyArray } from 'exp/utils/assert.js'
import Clock from '/modules/clock/component.js'

directives.registerComponent('clock', Clock)
directives.load(document.body, {
	data: {
		clocks: [
			{
				segments: 4,
				title: '4 Clock',
				filled: 0,
				colour: '#f00',
			},
			{
				segments: 8,
				title: '8 Clock',
				filled: 1,
				colour: '#444',
			},
		],
	},

	computed: {
		noClocks() {
			return isEmptyArray(this.data.clocks)
		}
	},
})
