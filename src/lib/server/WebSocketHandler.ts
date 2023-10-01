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
}
