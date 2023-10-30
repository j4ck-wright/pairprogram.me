import { formatRemainingTime, formattedTimeToSeconds } from '../timerLogic';

describe('timerLogic test suite', () => {
	it('Correctly formats correct remaining time in mm:ss format', () => {
		expect(formatRemainingTime(119)).toBe('01:59');
		expect(formatRemainingTime(2)).toBe('00:02');
		expect(formatRemainingTime(3602)).toBe('60:02');
	});

	it('Correctly formats remaining time to 00:00 if remaining time is less than 0', () => {
		expect(formatRemainingTime(0)).toBe('00:00');
		expect(formatRemainingTime(-5)).toBe('00:00');
	});

	it('Corrects formats reamining mm:ss time into seconds', () => {
		expect(formattedTimeToSeconds('02:00')).toBe(120);
		expect(formattedTimeToSeconds('01:30')).toBe(90);
		expect(formattedTimeToSeconds('00:50')).toBe(50);
	});
});
