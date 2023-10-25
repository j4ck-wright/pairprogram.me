import { initializeApp } from 'firebase/app';
import { Database, getDatabase, onValue, ref, set } from 'firebase/database';
import { writable } from 'svelte/store';
import { roomDefaults } from './roomDefaults';

export const roomTitleStore = writable<string>(roomDefaults.roomTitle);
export const participantsStore = writable<string[]>(roomDefaults.participants);
export const timerIntervalMinutesStore = writable<number>(roomDefaults.timerIntervalMinutes);
export const timerEndEpochStore = writable<number>(roomDefaults.timerEndEpoch);
export const timerPausedStore = writable<boolean>(roomDefaults.timerPaused);
export const driverStore = writable<string>(roomDefaults.driver);
export const navigatorStore = writable<string>(roomDefaults.navigator);
export const epochLastActiveStore = writable<number>(roomDefaults.epochLastActive);
//export const lastLog = writable<Record<string, string>>();
let db: Database;
let roomId: string;

export function initialiseApp(id: string) {
	initializeApp({
		databaseURL: 'https://pairprogramme-default-rtdb.europe-west1.firebasedatabase.app'
	});
	db = getDatabase();
	roomId = id;
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

export function setTimerStatus(status: boolean) {
	timerPausedStore.set(status);
	set(ref(db, `/rooms/${roomId}/timerStatus`), status);
}

export function watchTitle() {
	const title = ref(db, `/rooms/${roomId}/title`);
	onValue(title, (snapshot) => {
		roomTitleStore.set(snapshot.val() || 'New Room');
	});
}

export function watchParticipants() {
	const participants = ref(db, `/rooms/${roomId}/participants`);
	onValue(participants, (snapshot) => {
		participantsStore.set(snapshot.val() || ([] as string[]));
	});
}

export function watchTimerIntervalMinutes() {
	const intervalTimer = ref(db, `/rooms/${roomId}/timerInterval`);
	onValue(intervalTimer, (snapshot) => {
		timerIntervalMinutesStore.set(snapshot.val() || 10);
	});
}

export function watchTimerStatus() {
	const timerStatus = ref(db, `/rooms/${roomId}/timerStatus`);
	onValue(timerStatus, (snapshot) => {
		timerPausedStore.set(snapshot.val() || false);
	});
}