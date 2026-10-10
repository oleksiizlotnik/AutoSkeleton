export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  modules: ['auto-skeleton-vue/nuxt'],
  // Remember captured layouts across reloads, so even the first load after a
  // refresh replays the real layout instead of the generic fallback.
  autoSkeleton: { persist: true },
})
