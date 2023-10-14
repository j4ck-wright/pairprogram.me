import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	databaseURL: process.env.FIREBASE_URL
};
initializeApp(firebaseConfig);
const db = getDatabase();

// export const writeUserData = (userId, name, email, imageUrl) => {
// 	set(ref(db, 'users/' + userId), {
// 		participants: name,
// 		email: email,
// 		profile_picture: imageUrl
// 	});
// };
