import { newActiveParticipants } from '../newActiveParticipants';

describe('New Active Participant Test Suite', () => {
	it('Correctly returns undefined driver and navigator if length of participants is < 2', () => {
		const participants = ['Jack'];
		const activeParticipants = newActiveParticipants(participants);
		expect(activeParticipants.driver).toBeUndefined();
		expect(activeParticipants.navigator).toBeUndefined();
	});

	it('Correctly picks the first two participants when no current driver', () => {
		const participants = ['Jack', 'Amy', 'Ryan', 'Jenny'];
		const activeParticipants = newActiveParticipants(participants);
		expect(activeParticipants.driver).toEqual('Jack');
		expect(activeParticipants.navigator).toEqual('Amy');
	});

	it('Correctly swaps to a new driver and the previous driver becomes the navigator', () => {
		const participants = ['Jack', 'Amy', 'Ryan', 'Jenny'];
		const activeParticipants = newActiveParticipants(participants, 'Jack');
		expect(activeParticipants.driver).toEqual('Amy');
		expect(activeParticipants.navigator).toEqual('Ryan');
	});

	it('Correctly cycles back to the start for the navigator if the driver is at the end', () => {
		const participants = ['Jack', 'Amy', 'Ryan', 'Jenny'];
		const activeParticipants = newActiveParticipants(participants, 'Ryan');
		expect(activeParticipants.driver).toEqual('Jenny');
		expect(activeParticipants.navigator).toEqual('Jack');
	});

	it('Correctly cycles both participants back to the start if both driver and nviagor are at the end', () => {
		const participants = ['Jack', 'Amy', 'Ryan', 'Jenny'];
		const activeParticipants = newActiveParticipants(participants, 'Jenny');
		expect(activeParticipants.driver).toEqual('Jack');
		expect(activeParticipants.navigator).toEqual('Amy');
	});
});
