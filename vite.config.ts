import { defineConfig } from 'vite'
import honox from 'honox/vite'
import build from '@hono/vite-build/cloudflare-workers'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    honox({
      client: {
        input: ['/app/style.css'],
      },
    }),
    build(),
    tailwindcss(),
  ],
  ssr: {
    external: ["encoding-japanese"],
  },
})
