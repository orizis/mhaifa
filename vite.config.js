import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/mhaifa-img': {
        target: 'https://images.api.mhaifafc.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mhaifa-img/, ''),
      },
    },
  },
})
