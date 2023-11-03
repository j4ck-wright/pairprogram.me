<script lang="ts">
	import '../app.css';

	import { browser } from '$app/environment';
	function querySelector(state: 'light' | 'dark') {
		if (browser) {
			document?.querySelector('html')?.setAttribute('data-theme', state);
		}
	}
	let light = true;
	$: light ? querySelector('light') : querySelector('dark');
</script>

<svelte:head>
	<title>pairprogram.me</title>
</svelte:head>

<nav class="flex justify-between items-center p-2">
	<a href="/">pairprogram.me</a>
	<input
		type="checkbox"
		class="toggle toggle-primary toggle-sm"
		checked
		on:click={() => {
			light = !light;
		}}
	/>
</nav>

<slot />
