import { render, screen } from '@testing-library/svelte';
import TestComponent from './TestComponent.svelte';

describe('TestComponent test suite', () => {
	beforeEach(() => {
		render(TestComponent);
	});

	it('should render the Hello World! title', () => {
		expect(screen.getByText('Hello World!')).toBeTruthy;
	});

	it('should render the TestComponent paragraph', () => {
		expect(screen.getByText('I am a test component')).toBeTruthy;
	});
});
