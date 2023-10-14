<script lang="ts">
	import { Participants } from '$lib/components';
	import { Title } from '$lib/components';
	import { TimerEditor } from '$lib/components';
</script>

<div class="container mx-auto flex">
	<div class="left w-1/2" />
	<div class="right w-1/2 flex-col">
		<Title title="Title" />
		<Participants />
		<TimerEditor />
	</div>
</div>
