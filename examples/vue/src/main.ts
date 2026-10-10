import { createApp } from 'vue';
import { createAutoSkeleton } from 'auto-skeleton-vue';
import App from './App.vue';
import 'auto-skeleton-vue/style.css';

createApp(App)
  .use(
    createAutoSkeleton({
      baseColor: '#e2e5e9',
      highlightColor: '#f2f4f7',
      duration: '1.5s',
      animation: true, // shimmer on by default; set false for static gray
      persist: true, // cache geometry in localStorage across reloads
      version: '1.4.0', // namespace the cache; a new value starts clean
      maxAge: 7 * 24 * 60 * 60 * 1000, // expire persisted geometry after 7 days
      maxEntries: 200, // LRU cap on persisted entries
    })
  )
  .mount('#app');
