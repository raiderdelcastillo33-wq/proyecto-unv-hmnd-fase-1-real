import { defineConfig } from 'vite'

export default defineConfig({
  root: 'frontend',
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      },
      '/health': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    }
  }
})
