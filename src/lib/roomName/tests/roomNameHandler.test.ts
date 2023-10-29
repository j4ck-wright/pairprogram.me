import { generateRoomName } from '../roomNameHandler';

describe('Room Name Handler Test Suite', () => {
	it('Correctly returns a three word room name in the format a-b-c where a,b, and c are unique', () => {
		const roomName = generateRoomName();
		const splitRoomName = roomName.split('-');
		expect(splitRoomName).toHaveLength(3);
		expect(splitRoomName[0]).not.toBe(splitRoomName[1]);
		expect(splitRoomName[0]).not.toBe(splitRoomName[2]);
		expect(splitRoomName[1]).not.toBe(splitRoomName[2]);
	});
});
