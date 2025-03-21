import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    strictPort: true, // Sprečava da se prebacuje na drugi port
  },
  plugins: [react()],
})
