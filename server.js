import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from './build/handler.js';
import WebSocketHandler from './dist/WebSocketHandler.js';

const port = 3000;
const app = express();
const server = createServer(app);

WebSocketHandler(new Server(server));

app.use(handler);

server.listen(port);
