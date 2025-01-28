import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'
import react from '@vitejs/plugin-react'
import path from 'path'

const manifestPath = path.resolve(__dirname, 'public/manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest,
      
    })
  ],
  resolve: {
    alias: {
      '@data': path.resolve(__dirname, './src/data'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
})
