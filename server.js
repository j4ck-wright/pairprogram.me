import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
//import { createClient } from 'redis';
import { createServer } from 'http';
import { handler } from './build/handler.js';

import dotenv from 'dotenv';
import express from 'express';
import WebSocketHandler from './dist/WebSocketHandler.js';

console.log('\x1b[33m%s\x1b[0m', '• Starting Express server...');

dotenv.config();

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);

// console.log('\x1b[33m%s\x1b[0m', '• Connecting to Redis server...');
// const pubClient = createClient({
// 	password: process.env.REDIS_CREDS,
// 	socket: {
// 		host: process.env.REDIS_HOST,
// 		port: process.env.REDIS_PORT
// 	}
// });

// const subClient = pubClient.duplicate();

// Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
// 	io.adapter(createAdapter(pubClient, subClient));
// 	io.listen(4000);
// });

WebSocketHandler(io);

app.use(handler);

server.listen(port);
console.log('\x1b[32m%s\x1b[0m', `• Listening on port ${port}`);
