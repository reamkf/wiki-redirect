import { defineConfig } from 'vite'
import honox from 'honox/vite'
import build from '@hono/vite-build/cloudflare-workers'
import adapter from "@hono/vite-dev-server/cloudflare";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
	if (mode === 'client') {
		return {
			build: {
				rollupOptions: {
					input: ['./app/client.ts', './app/style.css'],
					output: {
						entryFileNames: 'static/client.js',
						chunkFileNames: 'static/assets/[name]-[hash].js',
						assetFileNames: 'static/assets/[name].[ext]'
					}
				},
				emptyOutDir: false
			},
			plugins: [
				tailwindcss(),
			],
			ssr: {
				external: ['encoding-japanese'],
			},
		}
	} else {
		return {
			ssr: {
				external: ['react', 'react-dom', 'encoding-japanese'],
			},
			plugins: [
				honox({
					devServer: { adapter},
					client: {
						input: ['/app/style.css'],
					},
				}),
				tailwindcss(),
				build(),
			],
		}
	}
})
