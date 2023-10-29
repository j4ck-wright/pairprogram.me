import wordBank from '../words.json';

function generateRandomWord() {
	const randomWord = wordBank.words[Math.floor(Math.random() * wordBank.words.length)];
	return randomWord;
}

function wordsAreUnique(roomName: string) {
	const splicedWords = roomName.split('-');
	if (
		splicedWords[0] === splicedWords[1] ||
		splicedWords[1] === splicedWords[2] ||
		splicedWords[2] === splicedWords[0]
	) {
		return false;
	}
	return true;
}

export const generateRoomName = (): string => {
	const roomName = `${generateRandomWord()}-${generateRandomWord()}-${generateRandomWord()}`;
	if (wordsAreUnique(roomName)) {
		return roomName;
	} else {
		return generateRoomName();
	}
};
