
import { id } from '~/utils/string.ts'

export interface ClockProps {
	clock: IClock;
}

export interface IClock {
	segments: number,
	title: string,
	filled?: number,
	colour?: string,
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
		return id(this.title)
	}
}
