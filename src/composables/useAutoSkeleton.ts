import {
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue'
import { captureDescriptor } from '../core/capture'
import { fallbackDescriptor } from '../core/fallback'
import { cacheKey } from '../core/key'
import type { SkeletonDescriptor } from '../core/descriptor'
import { getDefaultConfig, useAutoSkeletonConfig, type AutoSkeletonConfig } from '../config'

function viewportWidth(): number {
  return typeof window !== 'undefined' ? window.innerWidth : 0
}

function afterPaint(fn: () => void): void {
  if (typeof requestAnimationFrame === 'function') requestAnimationFrame(() => fn())
  else fn()
}

/**
 * Resolve once the content is visually settled: images decoded/loaded and web
 * fonts ready — capturing before then would record zero-height images or text
 * lines that reflow once the real font loads. A timeout guards against assets
 * that never resolve (broken images, offline fonts).
 */
function whenContentReady(el: HTMLElement, done: () => void, timeoutMs = 1200): void {
  let settled = false
  const finish = (): void => {
    if (settled) return
    settled = true
    afterPaint(done)
  }

  const pending: Promise<unknown>[] = []
  for (const img of Array.from(el.querySelectorAll('img'))) {
    if (img.complete || !img.getAttribute('src')) continue
    pending.push(
      new Promise<void>((resolve) => {
        img.addEventListener('load', () => resolve(), { once: true })
        img.addEventListener('error', () => resolve(), { once: true })
      }),
    )
  }
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    pending.push(document.fonts.ready)
  }

  if (pending.length) {
    Promise.all(pending).then(finish)
    setTimeout(finish, timeoutMs)
  } else {
    finish()
  }
}

export interface UseAutoSkeletonParams {
  loading: MaybeRefOrGetter<boolean>
  componentId: MaybeRefOrGetter<string>
  config?: AutoSkeletonConfig
}

export interface UseAutoSkeletonReturn {
  /** Attach to the element wrapping the real content. */
  contentEl: Ref<HTMLElement | null>
  /** The descriptor to render while loading (cached geometry or fallback). */
  activeDescriptor: Ref<SkeletonDescriptor>
  /** Capture the current content layout into the cache. Safe to call anytime. */
  capture: () => void
}

/**
 * Core capture/replay/cache lifecycle for one wrapped region. AutoSkeleton.vue
 * is a thin shell over this; it is also usable standalone for custom wrappers.
 */
export function useAutoSkeleton(params: UseAutoSkeletonParams): UseAutoSkeletonReturn {
  const config = params.config ?? safeConfig()
  const contentEl = ref<HTMLElement | null>(null)
  const activeDescriptor = ref<SkeletonDescriptor>(fallbackDescriptor())

  const keyFor = () => cacheKey(toValue(params.componentId), viewportWidth(), config.widthStep)

  const capture = (): void => {
    const el = contentEl.value
    if (!el || typeof el.getBoundingClientRect !== 'function') return
    // Skip if not laid out (hidden, detached, or SSR). Capturing zeros would
    // poison the cache with an empty skeleton.
    if (el.getBoundingClientRect().width < 1) return
    config.store.set(keyFor(), captureDescriptor(el))
  }

  const loadActive = (): void => {
    const w = Math.min(360, viewportWidth() || 320)
    activeDescriptor.value = config.store.get(keyFor()) ?? fallbackDescriptor(w)
  }

  const scheduleCapture = (): void => {
    const el = contentEl.value
    if (el) whenContentReady(el, capture)
    else afterPaint(capture)
  }

  // When loading turns on, replay cached geometry immediately.
  watch(
    () => toValue(params.loading),
    (loading) => {
      if (loading) loadActive()
    },
  )

  // A ResizeObserver re-captures when the content's own size changes (data
  // updates, container reflow) without a loading cycle — keeping the cache
  // fresh. Debounced so a burst of layout changes captures once.
  let ro: ResizeObserver | undefined
  let firstObservation = true
  const observe = (el: HTMLElement): void => {
    if (typeof ResizeObserver === 'undefined') return
    ro?.disconnect()
    firstObservation = true
    ro = new ResizeObserver(() => {
      // The observer fires once immediately on observe(); skip that — the
      // contentEl watcher already handles the initial capture.
      if (firstObservation) {
        firstObservation = false
        return
      }
      if (!toValue(params.loading)) debouncedCapture()
    })
    ro.observe(el)
  }

  // Capture whenever the real content element becomes available and we are not
  // loading. This is timing-robust: with an out-in transition the content
  // mounts only after the skeleton has left, so keying off the element (rather
  // than the loading flag) guarantees we capture a laid-out DOM.
  watch(contentEl, (el) => {
    if (!el) return
    if (!toValue(params.loading)) scheduleCapture()
    observe(el)
  })

  let resizeTimer: ReturnType<typeof setTimeout> | undefined
  const debouncedCapture = (): void => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => scheduleCapture(), 150)
  }
  const onResize = (): void => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      // Viewport crossed a width bucket: capture the live content under the new
      // key, or replay the descriptor cached for the bucket we moved into.
      if (!toValue(params.loading)) scheduleCapture()
      else loadActive()
    }, 150)
  }

  onMounted(() => {
    // Initial replay when mounting straight into a loading state. The non-loading
    // path is handled by the contentEl watcher above.
    if (toValue(params.loading)) loadActive()
    if (typeof window !== 'undefined') window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    clearTimeout(resizeTimer)
    ro?.disconnect()
    if (typeof window !== 'undefined') window.removeEventListener('resize', onResize)
  })

  return { contentEl, activeDescriptor, capture }
}

function safeConfig(): AutoSkeletonConfig {
  // useAutoSkeletonConfig relies on inject(), which only works during setup.
  try {
    return useAutoSkeletonConfig()
  } catch {
    return getDefaultConfig()
  }
}
