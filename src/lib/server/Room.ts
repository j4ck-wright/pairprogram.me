export class Room {
	private participants: string[];
	private clockIntervalMinutes: number;
	private clockStartEpoch?: number;
	private currentDriver?: string;
	private currentNavigator?: string;
	private clockState: 'Paused' | 'Running';

	constructor() {
		this.participants = [];
		this.clockIntervalMinutes = 10;
		this.clockState = 'Paused';
	}
	/**
	 * @returns Array of participants
	 */
	getParticipants() {
		return this.participants;
	}

	/**
	 * Adds a new participant to the room
	 * @param name Participant name
	 * @returns Array of participants
	 */
	addParticipant(name: string) {
		this.participants.push(name);
		return this.participants;
	}

	/**
	 * Removes a participant from the room
	 * @param name Participant name
	 * @returns Array of participants
	 */
	removeParticipant(name: string) {
		this.participants.filter((participant) => {
			return participant !== name;
		});
		return this.participants;
	}

	/**
	 * The interval of each clock round in minutes
	 * @returns The clock interval in minutes
	 */
	getClockInterval() {
		return this.clockIntervalMinutes;
	}

	/**
	 * Edits the interval of each clock round
	 * @param minutes Number of minutes to set interval to
	 * @returns The clock interval in minutes
	 */
	setClockInterval(minutes: number) {
		if (minutes > 0) {
			this.clockIntervalMinutes = minutes;
		}
		return this.clockIntervalMinutes;
	}

	/**
	 * The current driver from the list of participants
	 * @returns Current driver
	 */
	getCurrentDriver() {
		return this.currentDriver;
	}

	/**
	 * The current navigator from the list of participants
	 * @returns Current navigator
	 */
	getCurrentNavigator() {
		return this.currentNavigator;
	}

	/**
	 * The start time from when the clock has started
	 * @returns Epoch seconds of clock start time
	 */
	getClockStartTime() {
		return this.clockStartEpoch;
	}

	/**
	 * Update the clock to set how long is left
	 * @param epoch Epoch seconds
	 * @returns Epoch seconds of clock start time
	 */
	setClockStartTime(epoch: number) {
		this.clockStartEpoch = epoch;
		return this.clockStartEpoch;
	}

	/**
	 * Add minutes to the clock
	 * @param minutes Number of minutes to add
	 * @returns Epoch seconds of clock start time
	 */
	addToClock(minutes: number) {
		if (minutes > 0 && this.clockStartEpoch) {
			this.clockStartEpoch += minutes * 60;
		}
		return this.clockStartEpoch;
	}

	/**
	 * Removes minutes to the clock
	 * @param minutes Number of minutes to remove
	 * @returns Epoch seconds of clock start time
	 */
	removeFromClock(minutes: number) {
		if (minutes > 0 && this.clockStartEpoch) {
			this.clockStartEpoch -= minutes * 60;
		}
		return this.clockStartEpoch;
	}

	/**
	 * The state of the clock
	 * @returns Clock state
	 */
	getClockState() {
		return this.clockState;
	}

	/**
	 * Edit the state of the clock
	 * @param state
	 * @returns Clock state
	 */
	setClockState(state: 'Paused' | 'Running') {
		this.clockState = state;
		return this.clockState;
	}
}
