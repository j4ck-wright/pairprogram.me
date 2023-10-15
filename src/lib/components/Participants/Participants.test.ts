import { render, screen } from '@testing-library/svelte';
import Participants from './Participants.svelte';

describe('Participants test suite', () => {
	beforeEach(() => {
		render(Participants);
	});

	it('Should render zero participants on page load', () => {
		const participantBadges = screen.getByTestId('participantBadges');
		expect(participantBadges).toBeTruthy();
		expect(participantBadges.childElementCount).toBe(1);
	});

	it('Should display the add participant button', () => {
		const addParticipantBtn = screen.getByTestId('addParticipantBtn');
		expect(addParticipantBtn).toBeTruthy();
	});
});

describe('Participants snapshot', () => {
	it('Should match snapshot', () => {
		const participantComponent = render(Participants);
		expect(participantComponent).toMatchSnapshot();
	});
});
