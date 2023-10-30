export function formatRemainingTime(remainingSeconds: number) {
	if (remainingSeconds <= 0) return '00:00';
	const minutes = Math.floor(remainingSeconds / 60);
	const seconds = Math.floor(remainingSeconds % 60);

	return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function formattedTimeToSeconds(formattedTime: string) {
	const split = formattedTime.split(':');
	const minutes = parseInt(split[0]);
	const seconds = parseInt(split[1]);
	return minutes * 60 + seconds;
}
