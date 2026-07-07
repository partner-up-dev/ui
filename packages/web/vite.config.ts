import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import presetIcons from 'unocss/preset-icons'
import { resolve } from 'node:path'
import partnerUpUiPreset from './src/styles/unocss-preset'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        partnerUpUiPreset(),
        presetIcons({
          warn: true
        })
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PartnerUpUiWeb',
      fileName: 'index',
      cssFileName: 'style',
      formats: ['es']
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
