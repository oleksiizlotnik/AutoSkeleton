import { createApp } from 'vue'
import { createAutoSkeleton } from 'auto-skeleton-vue'
import App from './App.vue'

createApp(App)
  .use(
    createAutoSkeleton({
      // Persist so a page reload replays the real layout instead of the fallback.
      persist: true,
    }),
  )
  .mount('#app')
