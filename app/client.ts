import './style.css'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createElement } from 'react'
import About from './islands/about'

const root = document.getElementById('root')

if (root) {
	const element = createElement(About)

	if (import.meta.env.DEV) {
		createRoot(root).render(element)
	} else {
		hydrateRoot(root, element)
	}
}
