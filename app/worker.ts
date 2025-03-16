import { Env } from '@hono/vite-dev-server/types';
import app from './server.js';
import { ExecutionContext } from 'hono/dist/types/context.js';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		return app.fetch(request, env, ctx);
	}
};