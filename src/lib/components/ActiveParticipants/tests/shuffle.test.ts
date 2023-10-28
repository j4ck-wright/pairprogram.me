import { shuffle } from '../shuffle';

describe('Participants shuffle test suite', () => {
	it('Correctly shuffle the participants', () => {
		const startParticipants = ['Jack', 'John', 'Amy', 'Adam', 'Jess', 'Ellie'];
		const shuffledParticipants = shuffle(startParticipants);
		expect(shuffledParticipants).toHaveLength(startParticipants.length);
		expect(startParticipants).not.toBe(shuffledParticipants);
	});

	it('If length of participants is less or equal to 2, the original array is returned', () => {
		const startParticipants = ['Jack', 'John'];
		const shuffledParticipants = shuffle(startParticipants);
		expect(shuffledParticipants).toHaveLength(startParticipants.length);
		expect(shuffledParticipants![0]).toBe('Jack');
		expect(shuffledParticipants![1]).toBe('John');

		const oneParticipant = ['Jack'];
		const shuffledOne = shuffle(oneParticipant);
		expect(shuffledOne).toHaveLength(1);
		expect(shuffledOne![0]).toBe('Jack');
	});
});
