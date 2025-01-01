
import { id } from 'exp/utils/string.js'

export class ClockModel {
	constructor(segments, title) {
		console.log(`Clock::constructor(${ segments }, "${ title }")`)

		this.segments = segments
		this.title = title
		this.filled = 0
		this.colour = '#444'
	}

	get id() {
		return `clock:${ id(this.title) }:segment-${ this.segments }`
	}

	get imagePath() {
		return `/assets/img/clock-${ this.segments }.png`
	}

	toJson() {
		return {
			id: this.id,
			title: this.title,
			segments: this.segments,
			filled: this.filled,
			colour: this.colour,
		}
	}

	static fromJson(data) {
		const clock = new ClockModel(data.segments, data.title)

		if(data.filled) clock.filled = data.filled
		if(data.colour) clock.colour = data.colour

		return clock
	}
}
