import type { Server } from 'socket.io';

export default function WebSocketHandler(io: Server) {
	io.on('connection', (socket) => {
		socket.emit('eventFromServer', 'Hello, World 👋');

		socket.on('broadcast-room', (data: { roomId: string; message: string }) => {
			io.to(data.roomId).emit('broadcast-room', data.message);
		});

		socket.on('join-room', (id: string) => {
			socket.join(id);
		});
	});

	io.of('/').adapter.on('create-room', (room: string) => {
		console.log(`room ${room} was created`);
	});

	io.of('/').adapter.on('join-room', (room: string, id: string) => {
		console.log(`socket ${id} has joined room ${room}`);
	});
}
