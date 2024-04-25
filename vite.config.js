import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    proxy: {
      '/bing': {
        target: 'https://www.bing.com', // Bing的服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bing/, '/HPImageArchive.aspx?format=js') // 重写路径
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
