import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// Geometry tests need a real layout engine (jsdom returns zeros from
// getBoundingClientRect). Run these in a real browser via Playwright.
export default defineConfig({
  plugins: [vue()],
  test: {
    include: ['tests/**/*.browser.test.ts'],
    browser: {
      enabled: true,
      provider: 'playwright',
      name: 'chromium',
      headless: true,
    },
  },
})
