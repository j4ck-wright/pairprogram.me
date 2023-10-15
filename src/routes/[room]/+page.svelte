<script lang="ts">
	export let data;
	import { initialiseApp } from '$lib/firebase.js';
	import { Participants, Title, Timer, TimerEditor, ActiveParticipants } from '$lib/components';

	initialiseApp(data.slug);
</script>

<div class="container mx-auto flex gap-12 mt-8">
	<div class="left w-1/2"><Timer /></div>
	<div class="right w-1/2 flex-col">
		<Title />
		<Participants />
		<TimerEditor />
		<div class="divider" />
		<ActiveParticipants />
		<div class="divider" />
	</div>
</div>
