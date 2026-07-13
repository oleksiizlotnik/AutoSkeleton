import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// `base` only applies to `build` (GitHub Pages serves this repo at the
// /AutoSkeleton/ subpath). Local `dev` stays at the root path.
export default defineConfig(({ command }) => ({
  root: resolve(__dirname),
  base: command === 'build' ? '/AutoSkeleton/' : '/',
  server: { port: Number(process.env.PORT) || 5321 },
  plugins: [vue()],
  resolve: {
    alias: {
      'auto-skeleton-vue': resolve(__dirname, '../src/index.ts'),
    },
  },
}))
