<script lang="ts">
	import { TestComponent } from '$lib/components';
	import { io } from 'socket.io-client';

	const socket = io();

	socket.on('eventFromServer', (message) => {
		console.log(message);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<h2 class="text-red-500">Now with added Tailwind CSS</h2>
<button class="btn">And DaisyUI</button>
<TestComponent />
