export const roomDefaults = {
	participants: [] as string[],
	timerIntervalMinutes: 10,
	timerEndEpoch: undefined,
	timerLastEpoch: undefined,
	timerPaused: true,
	roundInProgress: false,
	driver: undefined,
	navigator: undefined,
	timerStartEpoch: undefined,
	epochLastActive: new Date().getUTCSeconds()
};

export interface Iroom {
	title: string;
	participants?: string[];
	inProgress: boolean;
	driver?: string;
	navigator?: string;
	//epochLastActive: number;
	timerInterval: number;
	timer: {
		pausedTimestamp?: number;
		startEpoch?: number;
		paused: boolean;
	};
}
