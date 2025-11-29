import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/demo/**/*'],
      outDir: 'lib',
      insertTypesEntry: true,
    }),
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
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PartnerUpDesignUniapp',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    outDir: 'lib',
    emptyOutDir: true
  }
})
