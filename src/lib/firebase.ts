import { initializeApp } from 'firebase/app';
import { Database, getDatabase, onValue, ref, set, child, get } from 'firebase/database';
import { writable } from 'svelte/store';
import { roomDefaults, type Iroom } from './roomDefaults';

export const roomTitleStore = writable<string>();
export const participantsStore = writable<string[]>(roomDefaults.participants);
export const timerIntervalMinutesStore = writable<number>(roomDefaults.timerIntervalMinutes);
export const timerPausedEpochStore = writable<number>(roomDefaults.timerEndEpoch);
export const timerLastEpochStore = writable<number>(roomDefaults.timerLastEpoch);
export const timerStartEpochStore = writable<number>(roomDefaults.timerStartEpoch);
export const roundInProgressStore = writable<boolean>(roomDefaults.roundInProgress);
export const timerPausedStore = writable<boolean>(roomDefaults.timerPaused);
export const driverStore = writable<string>(roomDefaults.driver);
export const navigatorStore = writable<string>(roomDefaults.navigator);
export const epochLastActiveStore = writable<number>(roomDefaults.epochLastActive);
//export const lastLog = writable<Record<string, string>>();
let db: Database;
let roomId: string;

export async function initialiseApp(id: string) {
	initializeApp({
		databaseURL: 'https://pairprogramme-default-rtdb.europe-west1.firebasedatabase.app'
	});
	db = getDatabase();
	roomId = id;

	const dataSnapshot = await get(child(ref(db), `/rooms/${roomId}`));
	if (dataSnapshot.exists()) {
		const data: Iroom = await dataSnapshot.val();

		roundInProgressStore.set(data.inProgress);
		timerIntervalMinutesStore.set(data.timerInterval);
		timerPausedStore.set(data.timer.paused);
		roomTitleStore.set(data.title);

		data.participants && participantsStore.set(data.participants);
		data.driver && driverStore.set(data.driver);
		data.navigator && navigatorStore.set(data.navigator);
		data.timer.pausedTimestamp && timerPausedEpochStore.set(data.timer.pausedTimestamp);
		data.timer.startEpoch && timerStartEpochStore.set(data.timer.startEpoch);
		//epochLastActiveStore.set(data.epochLastActive);
	} else {
		setTitle(roomId);
		setRoundInProgress(roomDefaults.roundInProgress);
		setTimerIntervalMinutes(roomDefaults.timerIntervalMinutes);
		setTimerStatus(roomDefaults.timerPaused);
	}
}

export function setTitle(newTitle: string) {
	roomTitleStore.set(newTitle);
	set(ref(db, `/rooms/${roomId}/title`), newTitle);
}

export function setParticipants(newParticipants: string[]) {
	participantsStore.set(newParticipants);
	set(ref(db, `/rooms/${roomId}/participants`), newParticipants);
}

export function setTimerIntervalMinutes(minutes: number) {
	timerIntervalMinutesStore.set(minutes);
	set(ref(db, `/rooms/${roomId}/timerInterval`), minutes);
}

export function setPausedTimestamp(epoch: number) {
	timerPausedEpochStore.set(epoch);
	set(ref(db, `/rooms/${roomId}/timer/pausedTimestamp`), epoch);
}

export function watchTitle() {
	const title = ref(db, `/rooms/${roomId}/title`);
	onValue(title, (snapshot) => {
		if (snapshot.val()) {
			roomTitleStore.set(snapshot.val());
		}
	});
}

export function watchParticipants() {
	const participants = ref(db, `/rooms/${roomId}/participants`);
	onValue(participants, (snapshot) => {
		if (snapshot.val()) {
			participantsStore.set(snapshot.val());
		}
	});
}

export function watchTimerIntervalMinutes() {
	const intervalTimer = ref(db, `/rooms/${roomId}/timerInterval`);
	onValue(intervalTimer, (snapshot) => {
		if (snapshot.val()) {
			timerIntervalMinutesStore.set(snapshot.val());
		}
	});
}

export function watchStartEpoch() {
	const startEpoch = ref(db, `/rooms/${roomId}/timer/startEpoch`);
	onValue(startEpoch, (snapshot) => {
		if (snapshot.val()) {
			timerStartEpochStore.set(snapshot.val());
		}
	});
}

export function setStartEpoch(epoch: number) {
	timerStartEpochStore.set(epoch);
	set(ref(db, `/rooms/${roomId}/timer/startEpoch`), epoch);
}

export function watchPausedTimestamp() {
	const lastEpoch = ref(db, `/rooms/${roomId}/timer/pausedTimestamp`);
	onValue(lastEpoch, (snapshot) => {
		if (snapshot.val()) {
			timerPausedEpochStore.set(snapshot.val());
		}
	});
}

export function watchRoundInProgress() {
	const inProgress = ref(db, `/rooms/${roomId}/inProgress`);
	onValue(inProgress, (snapshot) => {
		if (snapshot.val() !== undefined) {
			roundInProgressStore.set(snapshot.val());
		}
	});
}

export function setRoundInProgress(status: boolean) {
	roundInProgressStore.set(status);
	set(ref(db, `/rooms/${roomId}/inProgress`), status);
}

export function setTimerStatus(status: boolean) {
	timerPausedStore.set(status);
	set(ref(db, `/rooms/${roomId}/timer/paused`), status);
}

export function watchTimerStatus() {
	const timerStatus = ref(db, `/rooms/${roomId}/timer/paused`);
	onValue(timerStatus, (snapshot) => {
		if (snapshot) {
			timerPausedStore.set(snapshot.val());
		}
	});
}

export function setDriver(driver: string) {
	driverStore.set(driver);
	set(ref(db, `/rooms/${roomId}/driver`), driver);
}

export function watchDriver() {
	const driver = ref(db, `/rooms/${roomId}/driver`);
	onValue(driver, (snapshot) => {
		if (snapshot) {
			driverStore.set(snapshot.val());
		}
	});
}

export function setNavigator(navigator: string) {
	navigatorStore.set(navigator);
	set(ref(db, `/rooms/${roomId}/navigator`), navigator);
}

export function watchNavigator() {
	const navigator = ref(db, `/rooms/${roomId}/navigator`);
	onValue(navigator, (snapshot) => {
		if (snapshot) {
			navigatorStore.set(snapshot.val());
		}
	});
}
