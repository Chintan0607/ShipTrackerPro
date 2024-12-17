import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 10000,  // Use the environment variable PORT or fallback to 10000
    host: '0.0.0.0'  // Ensure the server binds to all network interfaces
  }
})
