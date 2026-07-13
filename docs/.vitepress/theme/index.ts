import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { createAutoSkeleton } from 'auto-skeleton-vue'
// Import the library styles from source (the /style.css subpath isn't aliased).
import '../../../src/styles/skeleton.css'
import Demo from './components/Demo.vue'
import Playground from './components/Playground.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(createAutoSkeleton())
    app.component('Demo', Demo)
    app.component('Playground', Playground)
  },
} satisfies Theme
