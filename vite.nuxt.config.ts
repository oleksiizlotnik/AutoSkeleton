import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Nuxt module build (`auto-skeleton-vue/nuxt`): ESM only, runs after the main
// library build into dist/nuxt. Nuxt and the library itself stay external — the
// module only references the library by package name.
export default defineConfig({
  build: {
    outDir: 'dist/nuxt',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/nuxt/module.ts'),
      formats: ['es'],
      fileName: () => 'module.js',
    },
    rollupOptions: {
      external: ['@nuxt/kit', '@nuxt/schema', 'auto-skeleton-vue'],
    },
  },
})
