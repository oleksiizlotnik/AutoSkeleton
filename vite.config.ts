import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Library build: ESM + CJS, Vue externalized as a peer dependency.
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AutoSkeleton',
      fileName: (format) => (format === 'es' ? 'auto-skeleton.js' : 'auto-skeleton.cjs'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        assetFileNames: 'auto-skeleton.[ext]',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.test.ts'],
    // Geometry tests need a real browser (jsdom has no layout engine).
    exclude: ['tests/**/*.browser.test.ts', 'node_modules/**'],
  },
})
