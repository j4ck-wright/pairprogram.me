<script lang="ts">
	export let data;
	import { io } from 'socket.io-client';

	const socket = io();

	socket.emit('join-room', data.slug);

	socket.on('broadcast-room', (message) => {
		messages = [...messages, message];
	});

	let messages: string[] = [];
</script>

<h1>{data.slug}</h1>
<button
	class="bg-slate-400"
	on:click={() => socket.emit('broadcast-room', { roomId: data.slug, message: 'hello' })}
	>Broadcast to room</button
>
{#each messages as message}
	<h1>{message}</h1>
{/each}
