import { initializeApp } from 'firebase/app';
import { Database, getDatabase, onValue, ref, set } from 'firebase/database';
import { writable } from 'svelte/store';

export const roomTitle = writable<string>();
export const participants = writable<string[]>();
export const timerIntervalMinutes = writable<number>();
export const timerEndEpoch = writable<number>();
export const timerPaused = writable<boolean>();
export const driver = writable<string>();
export const navigator = writable<string>();
export const epochLastActive = writable<number>();
export const lastLog = writable<Record<string, string>>();
let db: Database;
let roomId: string;

export default class Firebase {
	constructor(id: string) {
		initializeApp({
			databaseURL: 'https://pairprogramme-default-rtdb.europe-west1.firebasedatabase.app'
		});
		db = getDatabase();
		roomId = id;
	}

	static setTitle(newTitle: string) {
		roomTitle.set(newTitle);
		set(ref(db, `/rooms/${roomId}`), {
			title: newTitle
		});
	}

	static watchTitle() {
		const title = ref(db, `/rooms/${roomId}`);
		onValue(title, (snapshot) => {
			roomTitle.set(snapshot?.val()?.title || 'New Room');
		});
	}
}
