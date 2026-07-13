import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

// Canonical origin for the deployed site (GitHub project Pages subpath).
const HOSTNAME = 'https://oleksiizlotnik.github.io/AutoSkeleton'
const DESCRIPTION =
  'Auto-generated Vue 3 skeleton loaders that mirror a component’s real rendered layout — no separate skeleton to author, and it stays in sync automatically.'

// Docs are served from the /AutoSkeleton/ subpath on GitHub Pages.
export default defineConfig({
  title: 'auto-skeleton-vue',
  description: DESCRIPTION,
  base: '/AutoSkeleton/',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,

  // Emit sitemap.xml so search engines can discover every page.
  sitemap: { hostname: `${HOSTNAME}/` },

  // Global <head>: favicon, theme color, Open Graph / Twitter defaults, and a
  // JSON-LD SoftwareSourceCode block so AI crawlers and search engines can
  // understand what the package is.
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/AutoSkeleton/favicon.svg' }],
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'UEN_IHDCNOfmwf2_jqsLadGMWZUHj5ZYQ84RhO8s8K4',
      },
    ],
    ['meta', { name: 'theme-color', content: '#7c3aed' }],
    ['meta', { name: 'author', content: 'Oleksii Zlotnik' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'vue, vue 3, skeleton, skeleton loader, skeleton screen, loading placeholder, shimmer, content placeholder, vue skeleton, auto skeleton',
      },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'auto-skeleton-vue' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'auto-skeleton-vue',
        description: DESCRIPTION,
        codeRepository: 'https://github.com/oleksiizlotnik/AutoSkeleton',
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'Vue 3',
        license: 'https://opensource.org/licenses/MIT',
        author: { '@type': 'Person', name: 'Oleksii Zlotnik' },
        url: `${HOSTNAME}/`,
      }),
    ],
  ],

  // Per-page canonical + Open Graph / Twitter tags derived from each page's
  // own title/description frontmatter.
  transformPageData(pageData) {
    const path = pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
    const url = `${HOSTNAME}/${path}`
    const title = pageData.frontmatter.title
      ? `${pageData.frontmatter.title} | auto-skeleton-vue`
      : pageData.title
        ? `${pageData.title} | auto-skeleton-vue`
        : 'auto-skeleton-vue'
    const description = pageData.frontmatter.description || pageData.description || DESCRIPTION

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    )
  },

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Demo', link: '/guide/demo' },
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
            { text: 'Live demo', link: '/guide/demo' },
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
