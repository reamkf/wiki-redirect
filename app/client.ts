// app/client.ts
import { createClient } from 'honox/client'

createClient({
	hydrate: async (elem, root) => {
		const { hydrateRoot } = await import('react-dom/client')
		// @ts-expect-error elem is not typed correctly
		hydrateRoot(root, elem)
	},
	// @ts-expect-error createElement is not typed correctly
	createElement: async (type: string | React.JSXElementConstructor<unknown>, props: React.Attributes) => {
		const { createElement } = await import('react')
		return createElement(type, props)
	}
})