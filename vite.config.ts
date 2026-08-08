import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import About from './app/islands/about'

function prerenderIndex() {
	return {
		name: 'prerender-index',
		transformIndexHtml: {
			order: 'post' as const,
			handler(html: string, context: { server?: unknown }) {
				if (context.server) {
					return html
				}

				const content = renderToString(createElement(About))
				return html.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
			},
		},
	}
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		prerenderIndex(),
		cloudflare(),
	],
})
