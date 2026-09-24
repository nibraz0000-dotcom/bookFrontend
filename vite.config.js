import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

process.env.VITE_CONFIG_NATIVE_IGNORE_WARNING = 'true';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})



