<script>
	import '../app.css';
	import ThemeToggle from '$components/ThemeToggle.svelte';
</script>

<nav class="flex justify-between mx-4 mt-2">
	<h2>pairprogram.me</h2>
	<ThemeToggle />
</nav>
<slot />
