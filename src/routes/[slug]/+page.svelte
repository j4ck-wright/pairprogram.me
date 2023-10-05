<script lang="ts">
	export let data;
	import { io } from 'socket.io-client';

	const socket = io();

	let roomExists: boolean | undefined;
	socket.emit('client.room.exists', data.slug, (response: { roomExists: boolean }) => {
		roomExists = response.roomExists;
		if (roomExists) {
			socket.emit('client.join.room', data.slug);
		}
	});

	socket.on('broadcast-room', (message) => {
		messages = [...messages, message];
	});

	let messages: string[] = [];
</script>

{#if roomExists === undefined}
	<p>loading...</p>
{:else if roomExists == false}
	<p>Not a valid room!</p>
{:else}
	<h1>{data.slug}</h1>
	{#if roomExists}
		<button
			class="bg-slate-400"
			on:click={() => socket.emit('broadcast-room', { roomId: data.slug, message: 'hello' })}
			>Broadcast to room</button
		>
		{#each messages as message}
			<h1>{message}</h1>
		{/each}
	{:else}
		<p>Not a valid room!</p>
	{/if}
{/if}
