import { render, screen } from '@testing-library/svelte';
import Title from './Title.svelte';

describe('Title Test Suite', () => {
	beforeEach(() => {
		render(Title, {
			title: 'Test title'
		});
	});

	it('Correctly displays the title when passed in as a prop', () => {
		expect(screen.getByText('Test title')).toBeTruthy();
	});
});

describe('ParticipantBadge snapshot', () => {
	it('Should match snapshot', () => {
		const participantComponent = render(Title);
		expect(participantComponent).toMatchSnapshot();
	});
});
