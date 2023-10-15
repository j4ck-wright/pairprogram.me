export const roomDefaults = {
	roomTitle: 'New Room',
	participants: [] as string[],
	timerIntervalMinutes: 10,
	timerEndEpoch: undefined,
	timerPaused: false,
	driver: undefined,
	navigator: undefined,
	epochLastActive: new Date().getUTCSeconds()
};
