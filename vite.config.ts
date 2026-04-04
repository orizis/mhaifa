import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Player images use /img/... URLs — proxy to the image CDN in dev
      '/img': {
        target: 'https://images.api.mhaifafc.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img/, ''),
      },
    },
  },
});
