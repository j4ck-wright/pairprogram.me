import { sveltekit } from '@sveltejs/kit/vite';
import { type ViteDevServer, defineConfig } from 'vite';

import type { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import WebSocketHandler from './src/lib/server/WebSocketHandler';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;
		WebSocketHandler(new Server(server.httpServer as HttpServer));
	}
};

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
});
