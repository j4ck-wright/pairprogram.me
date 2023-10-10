<script lang="ts">
	import { ParticipantBadge } from '../';

	let participants: string[] = [];
	let newParticipant: string;
	let active = false;

	function removeParticipant(event: { detail: { participant: string } }) {
		const removedParticipant = event.detail.participant;
		const index = participants.indexOf(removedParticipant);
		participants.splice(index, 1);
		participants = participants;
	}

	function toggleActive() {
		active = !active;
	}
</script>

<div class="container flex gap-2 items-center">
	<span class="">Participants:</span>
	<div class="badges flex gap-1" data-testid="participantBadges">
		{#each participants as participant}
			<ParticipantBadge {participant} on:removeParticipant={removeParticipant} />
		{/each}
	</div>

	<div
		class="bg-primary rounded-full outline outline-primary bg-transparent flex items-center"
		data-testid="addParticipantBtn"
	>
		<iconify-icon
			role="button"
			tabindex="0"
			icon={active ? 'mdi:pencil' : 'ic:baseline-plus'}
			on:click={toggleActive}
			on:keydown={toggleActive}
			class="cursor-pointer text-primary {active && 'ml-1'}"
		/>
		{#if active}
			<!-- svelte-ignore a11y-autofocus -->
			<input
				autofocus
				class="mr-2 outline-none"
				data-testid="participantInput"
				type="text"
				size="3"
				bind:value={newParticipant}
				on:keydown={(e) => {
					if (e.key === 'Enter' && newParticipant && newParticipant.length > 0) {
						participants = [...participants, newParticipant];
						newParticipant = '';
					}
				}}
				on:focusout={() => {
					active = false;
					newParticipant = '';
				}}
			/>
		{/if}
	</div>
</div>
