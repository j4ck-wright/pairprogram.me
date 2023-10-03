import type { Server } from 'socket.io';

export default function WebSocketHandler(io: Server) {
	io.on('connection', (socket) => {
		socket.emit('eventFromServer', 'Hello, World 👋');

		socket.on('broadcast-room', (data: { roomId: string; message: string }) => {
			io.to(data.roomId).emit('broadcast-room', data.message);
		});

		socket.on('client.room.exists', (id: string, callback) => {
			const room = io.sockets.adapter.rooms.get(id);
			callback({
				roomExists: room ? true : false
			});
		});

		socket.on('client.room.join', (id: string) => {
			socket.join(id);
		});

		socket.on('client.create.room', (id: string) => {
			socket.join(id);
		});
	});
}
