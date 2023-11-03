<script lang="ts">
	export let data;
	import { initialiseApp } from '$lib/firebase.js';
	import { Participants, Title, Timer, TimerEditor, ActiveParticipants } from '$lib/components';
	import join from '$lib/audios/join.wav';

	let firebaseData = initialiseApp(data.slug);

	new Audio(join).play();
</script>

<div class="container mx-auto flex flex-col items-center gap-8 lg:flex-row mt-8">
	{#await firebaseData}
		<div class="loading-container flex flex-col m-auto mt-[15%]">
			<span class="loading loading-spinner loading-lg m-auto" />
			<p>Loading Room Data</p>
		</div>
	{:then}
		<div class="left lg:w-1/2"><Timer /></div>
		<div class="right w-[94%] lg:w-1/2 flex-col">
			<Title />
			<Participants />
			<TimerEditor />
			<div class="divider" />
			<ActiveParticipants />
			<div class="divider" />
		</div>
	{/await}
</div>
