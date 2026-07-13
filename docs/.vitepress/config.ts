import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

// Docs are served from the /AutoSkeleton/ subpath on GitHub Pages.
export default defineConfig({
  title: 'auto-skeleton-vue',
  description:
    'Auto-generated Vue 3 skeleton loaders that mirror a component’s real rendered layout.',
  base: '/AutoSkeleton/',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'Demo', link: '/guide/getting-started#live-demo' },
      { text: 'npm', link: 'https://www.npmjs.com/package/auto-skeleton-vue' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting started', link: '/guide/getting-started' },
            { text: 'How it works', link: '/guide/how-it-works' },
            { text: 'Configuration & theming', link: '/guide/configuration' },
            { text: 'Caching & persistence', link: '/guide/caching' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: '<AutoSkeleton>', link: '/api/auto-skeleton' },
            { text: 'createAutoSkeleton()', link: '/api/plugin' },
            { text: 'useAutoSkeleton()', link: '/api/composable' },
            { text: 'Stores', link: '/api/stores' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/oleksiizlotnik/AutoSkeleton' },
    ],

    editLink: {
      pattern: 'https://github.com/oleksiizlotnik/AutoSkeleton/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Oleksii Zlotnik',
    },

    search: { provider: 'local' },
  },

  vite: {
    resolve: {
      alias: {
        // Docs render live demos against the library source, so they always
        // reflect the latest code (no publish step needed).
        'auto-skeleton-vue': resolve(__dirname, '../../src/index.ts'),
      },
    },
  },
})
