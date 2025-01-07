import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    rollupOptions: {
      // 排除.idea文件夹
      external: [
        /\/md-assets\//,
        /\/resource\//,
        /\/\.idea\//
      ]
    },
  }
})
