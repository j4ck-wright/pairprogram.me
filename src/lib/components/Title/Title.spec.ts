import { render, screen } from '@testing-library/svelte';
import { watchTitle } from '$lib/firebase';
import * as fb from '$lib/firebase';
import Title from './Title.svelte';

describe('first', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Correctly mocks watching the title', () => {
		const spy = vi.spyOn(fb, 'watchTitle').mockImplementation(() => 'Mock Title Watching');
		render(Title);
		expect(spy).toHaveBeenCalledOnce();
	});

	it('Correctly mocks title changing', () => {
		const watchSpy = vi.spyOn(fb, 'watchTitle').mockImplementation(() => 'Mock Title Watching');
		const setSpy = vi.spyOn(fb, 'setTitle').mockImplementation(() => 'Mock Title Set');
		render(Title);
		expect(fb.setTitle('New')).toBe('Mock Title Set');
	});
});
