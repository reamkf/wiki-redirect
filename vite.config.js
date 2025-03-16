import { defineConfig } from 'vite';
import honox from 'honox/vite';
import devServer from '@hono/vite-dev-server';
import cloudflare from '@hono/vite-cloudflare-pages';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    honox(),
    devServer({
      entry: 'app/server.jsx'
    }),
    cloudflare(),
    react()
  ],
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ['encoding-japanese']
  },
  ssr: {
    noExternal: ['encoding-japanese']
  }
});