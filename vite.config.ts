import { sveltekit } from '@sveltejs/kit/vite';
import { type ViteDevServer, defineConfig } from 'vite';

import { Server } from 'socket.io';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);

		io.on('connection', (socket) => {
			socket.emit('eventFromServer', 'Hello, World 👋');

			socket.on('broadcast-room', (data) => {
				console.log(data);
				io.to(data.roomId).emit('broadcast-room', data.message);
			});

			socket.on('join-room', (id: string) => {
				socket.join(id);
			});
		});

		io.of('/').adapter.on('create-room', (room) => {
			console.log(`room ${room} was created`);
		});

		io.of('/').adapter.on('join-room', (room, id) => {
			console.log(`socket ${id} has joined room ${room}`);
		});
	}
};

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
});
