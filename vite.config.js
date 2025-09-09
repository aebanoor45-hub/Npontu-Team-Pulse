import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    strictPort: true,
    allowedHosts: ['npontu-team-pulse.onrender.com'] // Add your Render domain here
  }
})