import type { App } from 'vue'
import AutoSkeleton from './AutoSkeleton.vue'
import SkeletonCanvas from './SkeletonCanvas.vue'
import { AUTO_SKELETON_KEY, resolveConfig, type AutoSkeletonOptions } from './config'

import './styles/skeleton.css'

/** Vue plugin: `app.use(createAutoSkeleton({ ... }))`. */
export function createAutoSkeleton(options: AutoSkeletonOptions = {}) {
  const config = resolveConfig(options)
  return {
    install(app: App) {
      app.provide(AUTO_SKELETON_KEY, config)
      app.component('AutoSkeleton', AutoSkeleton)
      app.component('SkeletonCanvas', SkeletonCanvas)
    },
  }
}

export { AutoSkeleton, SkeletonCanvas }
export {
  AUTO_SKELETON_KEY,
  getDefaultConfig,
  resolveConfig,
  useAutoSkeletonConfig,
} from './config'
export type {
  AutoSkeletonConfig,
  AutoSkeletonOptions,
  AutoSkeletonTheme,
} from './config'
export { MemoryStore, LocalStorageStore } from './core/cache'
export type { SkeletonStore, LocalStorageStoreOptions } from './core/cache'
export type { SkeletonDescriptor, SkeletonPrimitive } from './core/descriptor'
export { captureDescriptor } from './core/capture'
export { fallbackDescriptor } from './core/fallback'
export { useAutoSkeleton } from './composables/useAutoSkeleton'
