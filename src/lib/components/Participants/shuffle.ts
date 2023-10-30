export const shuffle = (participants: string[]) => {
	if (participants.length <= 2) return participants;
	const shuffledParticipants = participants
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
	return shuffledParticipants;
};
