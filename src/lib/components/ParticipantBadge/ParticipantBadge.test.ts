import { render, screen } from '@testing-library/svelte';
import ParticipantBadge from './ParticipantBadge.svelte';

describe('ParticipantBadge Test Suite', () => {
	beforeEach(() => {
		render(ParticipantBadge, {
			participant: 'Jack'
		});
	});

	it('Correctly displays the name when passed in as a prop', () => {
		expect(screen.getByText('Jack')).toBeTruthy();
	});
});

describe('ParticipantBadge snapshot', () => {
	it('Should match snapshot', () => {
		const participantComponent = render(ParticipantBadge);
		expect(participantComponent).toMatchSnapshot();
	});
});
