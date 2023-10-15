import { initializeApp } from 'firebase/app';
import { Database, getDatabase, onValue, ref, set } from 'firebase/database';
import { writable } from 'svelte/store';
import { roomDefaults } from './roomDefaults';

export const roomTitle = writable<string>(roomDefaults.roomTitle);
export const participants = writable<string[]>(roomDefaults.participants);
export const timerIntervalMinutes = writable<number>(roomDefaults.timerIntervalMinutes);
export const timerEndEpoch = writable<number>(roomDefaults.timerEndEpoch);
export const timerPaused = writable<boolean>(roomDefaults.timerPaused);
export const driver = writable<string>(roomDefaults.driver);
export const navigator = writable<string>(roomDefaults.navigator);
export const epochLastActive = writable<number>(roomDefaults.epochLastActive);
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
	roomTitle.set(newTitle);
	set(ref(db, `/rooms/${roomId}`), {
		title: newTitle
	});
}

export function watchTitle() {
	const title = ref(db, `/rooms/${roomId}`);
	onValue(title, (snapshot) => {
		roomTitle.set(snapshot?.val()?.title || 'New Room');
	});
}
