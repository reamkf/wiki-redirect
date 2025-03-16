import app from '../app/server.jsx'

export default {
	async fetch(request, env, ctx) {
		return app.fetch(request, env, ctx);
	}
};