import { fireEvent, render, screen } from '@testing-library/svelte';
import { TimerEditor } from '..';

describe('Timer Editor Test Suite', () => {
	beforeEach(() => {
		render(TimerEditor);
	});
	it('Should correctly render the timer editor with + and 15 visible', () => {
		expect(screen.getByText('+')).toBeTruthy();
		expect(screen.getByText('-')).toBeTruthy();
		expect(screen.findByText(10)).toBeTruthy();
	});

	it('Should correctly increment the timer when the + button is clicked', async () => {
		const incrementBtn = screen.getAllByRole('button')[0];
		await fireEvent.click(incrementBtn);
		expect(screen.findByText(11)).toBeTruthy();
	});

	it('Should correctly decrease the timer when the + button is clicked', async () => {
		const decreaseButton = screen.getAllByRole('button')[0];
		await fireEvent.click(decreaseButton);
		expect(screen.findByText(9)).toBeTruthy();
	});

	it('Should correctly set the timer to not go below 1', async () => {
		const decreaseButton = screen.getAllByRole('button')[0];
		for (let i = 0; i < 10; i++) {
			await fireEvent.click(decreaseButton);
		}
		expect(screen.findByText(1)).toBeTruthy();
	});
});

describe('ParticipantBadge snapshot', () => {
	it('Should match snapshot', () => {
		const participantComponent = render(TimerEditor);
		expect(participantComponent).toMatchSnapshot();
	});
});
