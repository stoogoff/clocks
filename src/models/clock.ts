
export interface IClock {
	segments: number,
	title: string,
	filled?: number,
	fillColour?: string,
}

export class Clock implements IClock {
	title: string;
	segments: number;
	filled: number = 0;
	fillColour: string = '#ddd';

	constructor(segments: number, title: string) {
		this.segments = segments
		this.title = title
	}
}
