import { createApp } from 'vue'
import { createAutoSkeleton } from 'auto-skeleton-vue'
// Required: the shimmer/positioning styles live in this stylesheet.
// Without it the skeleton blocks are transparent and appear to be missing.
import 'auto-skeleton-vue/style.css'
import App from './App.vue'

createApp(App)
  .use(
    createAutoSkeleton({
      // Persist so a reload replays the real captured layout, not the fallback.
      persist: true,
    }),
  )
  .mount('#app')
