import { inject, type InjectionKey } from 'vue'
import { LocalStorageStore, MemoryStore, type SkeletonStore } from './core/cache'

export interface AutoSkeletonTheme {
  baseColor?: string
  highlightColor?: string
  /** Border radius for media/box primitives, e.g. '4px'. */
  radius?: string
  /** Shimmer animation duration, e.g. '1.5s'. */
  duration?: string
  /** Whether the shimmer animation plays. Default: true. */
  animation?: boolean
}

export interface AutoSkeletonOptions extends AutoSkeletonTheme {
  /** Persist captured geometry across reloads (localStorage). Default: false. */
  persist?: boolean
  /** Provide a custom store; overrides `persist`. */
  store?: SkeletonStore
  /** Viewport-width bucket size in px for responsive cache keys. Default: 160. */
  widthStep?: number
  /** Persisted entries older than this (ms) are ignored and re-captured. Default: 7 days. */
  maxAge?: number
  /** Max persisted entries; the oldest are evicted past this. Default: 200. */
  maxEntries?: number
  /** Namespaces persisted keys (e.g. an app/build version) so releases start clean. */
  version?: string
}

/** Fully-resolved config shared with every <AutoSkeleton> via provide/inject. */
export interface AutoSkeletonConfig {
  store: SkeletonStore
  widthStep: number
  theme: AutoSkeletonTheme
}

export const AUTO_SKELETON_KEY: InjectionKey<AutoSkeletonConfig> = Symbol('auto-skeleton')

export function resolveConfig(options: AutoSkeletonOptions = {}): AutoSkeletonConfig {
  const store =
    options.store ??
    (options.persist
      ? new LocalStorageStore({
          maxAgeMs: options.maxAge,
          maxEntries: options.maxEntries,
          namespace: options.version,
        })
      : new MemoryStore())
  // Strip non-theme keys; whatever remains is the theme.
  const {
    persist: _persist,
    store: _store,
    widthStep,
    maxAge: _maxAge,
    maxEntries: _maxEntries,
    version: _version,
    ...theme
  } = options
  return { store, widthStep: widthStep ?? 160, theme }
}

/** Fallback config for components used without installing the plugin. */
let defaultConfig: AutoSkeletonConfig | null = null
export function getDefaultConfig(): AutoSkeletonConfig {
  if (!defaultConfig) defaultConfig = resolveConfig()
  return defaultConfig
}

export function useAutoSkeletonConfig(): AutoSkeletonConfig {
  return inject(AUTO_SKELETON_KEY, getDefaultConfig())
}
