import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@root': '/src/_root',
      '@components': '/src/components',
      '@shared': '/src/components/shared',
      '@auth': '/src/_auth'
    }
  }
})
