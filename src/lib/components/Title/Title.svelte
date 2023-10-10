<script lang="ts">
	export let title: string;

	const MAX_CHARACTERS = 32;
	let previousTitle = title;
	let editHint = false;
	let active = false;
	let error = false;
	let errorMessage: string;

	function toggleActive() {
		active = !active;
	}

	function validTitle() {
		return title.length > 0 && title.length < MAX_CHARACTERS;
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<h3
	class="text-3xl mb-2 font-bold cursor-pointer w-max tooltip-error tooltip-left {error &&
		'tooltip tooltip-open'}"
	data-tip={errorMessage}
	on:click={toggleActive}
	on:mouseenter={() => {
		if (!active) {
			editHint = !editHint;
		}
	}}
	on:mouseleave={() => {
		if (!active) {
			editHint = false;
		}
	}}
>
	{#if active}
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			autofocus
			class="pl-2 outline-primary bg-transparent"
			size="12"
			bind:value={title}
			on:keydown={(e) => {
				if (e.key === 'Enter' && validTitle()) {
					active = false;
					error = false;
					previousTitle = title;
				} else if (!validTitle()) {
					error = true;
					errorMessage = `Title must be between 1-${MAX_CHARACTERS} letters`;
				} else {
					console.log('here');
					error = false;
				}
			}}
			on:focusout={() => {
				active = false;
				editHint = false;
				error = false;
				if (validTitle()) {
					previousTitle = title;
				} else {
					title = previousTitle;
				}
			}}
		/>
	{:else}
		{title}
	{/if}
	<iconify-icon
		role="button"
		icon="mdi:pencil"
		class="text-primary text-2xl bg-transparent text-opacity-75 {!editHint && 'invisible'}"
	/>
</h3>
