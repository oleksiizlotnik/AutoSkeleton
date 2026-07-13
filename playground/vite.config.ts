import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: resolve(__dirname),
  server: { port: Number(process.env.PORT) || 5321 },
  plugins: [vue()],
  resolve: {
    alias: {
      'auto-skeleton-vue': resolve(__dirname, '../src/index.ts'),
    },
  },
})
