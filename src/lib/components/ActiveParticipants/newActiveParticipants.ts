function getCorrectIndex(participants: string[], index: number) {
	if (index > participants.length - 1) {
		return 0;
	}
	return index;
}

export const newActiveParticipants = (participants: string[], currentDriver?: string) => {
	if (participants.length < 2) return { driver: undefined, navigator: undefined };
	let currentIndex = 0;

	if (currentDriver) {
		const driverIndex = participants.indexOf(currentDriver) + 1;
		currentIndex = getCorrectIndex(participants, driverIndex);
	}

	const navigatorIndex = getCorrectIndex(participants, currentIndex + 1);

	const driver = participants[currentIndex];
	const navigator = participants[navigatorIndex];
	return { driver: driver, navigator: navigator };
};
