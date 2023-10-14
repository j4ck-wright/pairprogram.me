<script lang="ts">
	export let data;
	import { Participants } from '$lib/components';
	import { Title } from '$lib/components';
	import { TimerEditor } from '$lib/components';
	import Firebase from '$lib/Firebase';

	const initialiseApp = new Firebase(data.slug);
</script>

<div class="container mx-auto flex">
	<div class="left w-1/2" />
	<div class="right w-1/2 flex-col">
		<Title />
		<Participants />
		<TimerEditor />
	</div>
</div>
