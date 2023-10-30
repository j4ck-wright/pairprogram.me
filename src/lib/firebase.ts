import { initializeApp } from 'firebase/app';
import { Database, getDatabase, onValue, ref, set, child, get } from 'firebase/database';
import { writable, type Writable } from 'svelte/store';
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

function setNewStoreAndFirebase(store: Writable<unknown>, path: string, value: unknown) {
	store.set(value);
	set(ref(db, path), value);
}

function watchFirebaseAndUpdateStore(store: Writable<unknown>, path: string) {
	onValue(ref(db, path), (snapshot) => {
		if (snapshot.val() !== undefined) {
			store.set(snapshot.val());
		}
	});
}

export function setTitle(newTitle: string) {
	setNewStoreAndFirebase(roomTitleStore, `/rooms/${roomId}/title`, newTitle);
}

export function watchTitle() {
	watchFirebaseAndUpdateStore(roomTitleStore, `/rooms/${roomId}/title`);
}
export function setParticipants(newParticipants: string[]) {
	setNewStoreAndFirebase(participantsStore, `/rooms/${roomId}/participants`, newParticipants);
}

export function watchParticipants() {
	watchFirebaseAndUpdateStore(participantsStore, `/rooms/${roomId}/participants`);
}

export function setTimerIntervalMinutes(minutes: number) {
	setNewStoreAndFirebase(timerIntervalMinutesStore, `/rooms/${roomId}/timerInterval`, minutes);
}

export function watchTimerIntervalMinutes() {
	watchFirebaseAndUpdateStore(timerIntervalMinutesStore, `/rooms/${roomId}/timerInterval`);
}
export function setPausedTimestamp(epoch: number) {
	setNewStoreAndFirebase(timerPausedEpochStore, `/rooms/${roomId}/timer/pausedTimestamp`, epoch);
}

export function watchPausedTimestamp() {
	watchFirebaseAndUpdateStore(timerPausedEpochStore, `/rooms/${roomId}/timer/pausedTimestamp`);
}

export function setStartEpoch(epoch: number) {
	setNewStoreAndFirebase(timerStartEpochStore, `/rooms/${roomId}/timer/startEpoch`, epoch);
}

export function watchStartEpoch() {
	watchFirebaseAndUpdateStore(timerStartEpochStore, `/rooms/${roomId}/timer/startEpoch`);
}

export function setRoundInProgress(status: boolean) {
	setNewStoreAndFirebase(roundInProgressStore, `/rooms/${roomId}/inProgress`, status);
}

export function watchRoundInProgress() {
	watchFirebaseAndUpdateStore(roundInProgressStore, `/rooms/${roomId}/inProgress`);
}

export function setTimerStatus(status: boolean) {
	setNewStoreAndFirebase(timerPausedEpochStore, `/rooms/${roomId}/timer/paused`, status);
}

export function watchTimerStatus() {
	watchFirebaseAndUpdateStore(timerPausedEpochStore, `/rooms/${roomId}/timer/paused`);
}

export function setDriver(driver: string) {
	setNewStoreAndFirebase(driverStore, `/rooms/${roomId}/driver`, driver);
}

export function watchDriver() {
	watchFirebaseAndUpdateStore(driverStore, `/rooms/${roomId}/driver`);
}

export function setNavigator(navigator: string) {
	setNewStoreAndFirebase(navigatorStore, `/rooms/${roomId}/navigator`, navigator);
}

export function watchNavigator() {
	watchFirebaseAndUpdateStore(navigatorStore, `/rooms/${roomId}/navigator`);
}
