import { Room } from '../Room';

describe('Room class test suite', () => {
	const room = new Room();

	it('Participants should be null by default, and add/remove properly', () => {
		expect(room.getParticipants().length).toBe(0);
		room.addParticipant('Jack');
		room.addParticipant('John');
		expect(room.getParticipants().length).toBe(2);
		room.addParticipant('Laura');
		room.removeParticipant('Jack');

		const participants = room.getParticipants();
		expect(participants.length).toBe(2);
		expect(participants[0]).toEqual('John');
		expect(participants[1]).toEqual('Laura');
	});

	it('Adding/Removing time from the clock should return correctly', () => {
		const epoch = Date.now();
		const timeAfterInterval = room.getClockInterval() * 60;
		room.setClockEndTime(epoch + timeAfterInterval);
		expect(room.getClockEndTime()).toEqual(epoch + timeAfterInterval);
		room.addToClock(30);
		expect(room.getClockEndTime()).toEqual(epoch + timeAfterInterval + 30 * 60);
		room.removeFromClock(30 + room.getClockInterval());
		expect(room.getClockEndTime()).toEqual(epoch);
		room.addToClock(-100);
		room.removeFromClock(-500);
		expect(room.getClockEndTime()).toEqual(epoch);
	});

	it('Correctly toggles the clock state', () => {
		expect(room.getClockState()).toEqual('Paused');
		room.setClockState('Running');
		expect(room.getClockState()).toEqual('Running');
	});

	it('Correctly sets driver and navigators', () => {
		expect(room.getNavigator()).toBeUndefined();
		expect(room.getDriver()).toBeUndefined();
		room.setNavigator('John');
		room.setDriver('Jack');
		expect(room.getNavigator()).toEqual('John');
		expect(room.getDriver()).toEqual('Jack');
	});

	it('Correctly edits clock interval', () => {
		expect(room.getClockInterval()).toEqual(10);
		room.setClockInterval(20);
		room.setClockInterval(-100);
		expect(room.getClockInterval()).toEqual(20);
	});
});
