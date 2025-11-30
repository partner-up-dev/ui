import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
// Vite is used for development only - source files are published directly
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Auto-inject common @use statements
        additionalData: (source: string, file: string) => {
          if (file.includes("src/components/")) {
            return `@use "@/styles/functions" as fn;@use "@/styles/mixins" as *;${source}`
          }
          return source;
        },
      },
    },
  },
})
