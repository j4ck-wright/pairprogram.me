<script lang="ts">
	export let data;
	import { io } from 'socket.io-client';
	import { Participants, Title, Timer, TimerEditor } from '$lib/components';

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

<div class="container mx-auto flex gap-12 mt-8">
	<div class="left w-1/2"><Timer /></div>
	<div class="right w-1/2 flex-col">
		<Title title="Title" />
		<Participants />
		<TimerEditor />
	</div>
</div>

<!-- 
{#if roomExists === undefined}
	<p>loading...</p>
{:else if roomExists == false}
	<p>Not a valid room!</p>
{:else}
	<p>Page loaded</p>
{/if} -->
