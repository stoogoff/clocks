
import { id } from '~/utils/string.ts'

interface IClockJson {
	_id: string,
	title: string,
	segments: number,
	filled: number,
	colour: string,
}

export interface IClock {
	segments: number,
	title: string,
	filled?: number,
	colour?: string,
}

export interface ClockState {
	clocks: ClockModel[]
}

export class ClockModel implements IClock {
	title: string;
	segments: number;
	filled: number = 0;
	colour: string = '#444';

	constructor(segments: number, title: string) {
		console.log(`Clock::constructor(${ segments }, "${ title }")`)

		this.segments = segments
		this.title = title
	}

	get id(): string {
		return `clock:${ id(this.title) }:segment-${ this.segments }`
	}

	toJson(): IClockJson {
		return {
			_id: this.id,
			title: this.title,
			segments: this.segments,
			filled: this.filled,
			colour: this.colour,
		}
	}

	static fromJson(data: IClockJson): ClockModel {
		const clock = new ClockModel(data.segments, data.title)

		if(data.filled) clock.filled = data.filled
		if(data.colour) clock.colour = data.colour

		return clock
	}
}
