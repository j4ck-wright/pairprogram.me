<script lang="ts">
	import 'iconify-icon';
	import { createEventDispatcher } from 'svelte';

	export let participant: string;

	const dispatch = createEventDispatcher();

	function removeParticipant() {
		dispatch('removeParticipant', {
			participant: participant
		});
	}
</script>

<div class="badge badge-lg badge-primary gap-2 text-inherit">
	<span class="capitalize select-none">{participant}</span>
	<iconify-icon
		icon="iconoir:cancel"
		role="button"
		tabindex="0"
		class="cursor-pointer"
		on:click={removeParticipant}
		on:keydown={removeParticipant}
	/>
</div>
