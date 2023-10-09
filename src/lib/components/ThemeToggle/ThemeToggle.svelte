<script lang="ts">
	import { browser } from '$app/environment';

	function querySelector(state: 'light' | 'dark') {
		if (browser) {
			document?.querySelector('html')?.setAttribute('data-theme', state);
		}
	}

	let light = true;

	$: light ? querySelector('light') : querySelector('dark');
</script>

<input
	type="checkbox"
	class="toggle toggle-neutral toggle-sm"
	checked
	on:click={() => {
		light = !light;
	}}
/>
