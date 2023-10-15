import { createServer } from 'http';
import { handler } from './build/handler.js';
import express from 'express';

console.log('\x1b[33m%s\x1b[0m', '• Starting Express server...');

const port = 3000;
const app = express();
const server = createServer(app);

app.use(handler);

server.listen(port);
