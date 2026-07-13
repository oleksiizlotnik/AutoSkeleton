<script setup lang="ts">
import { computed, useSlots } from 'vue'
import SkeletonCanvas from './SkeletonCanvas.vue'
import { componentIdFromVNodes } from './core/key'
import { useAutoSkeleton } from './composables/useAutoSkeleton'
import { useAutoSkeletonConfig } from './config'

const props = withDefaults(
  defineProps<{
    /** Whether the wrapped content is loading. */
    loading: boolean
    /** Explicit cache identity. Defaults to the wrapped component's name/file. */
    id?: string
    /** Repeat the captured block N times (lists whose length is unknown yet). */
    count?: number
    /** Play the shimmer animation. Overrides the global default when set. */
    animated?: boolean
    // Per-instance theme overrides (fall back to plugin defaults).
    baseColor?: string
    highlightColor?: string
    radius?: string
    duration?: string
  }>(),
  { count: 1, animated: undefined },
)

const slots = useSlots()
const config = useAutoSkeletonConfig()

const componentId = computed(() => componentIdFromVNodes(slots.default?.(), props.id))

const { contentEl, activeDescriptor } = useAutoSkeleton({
  loading: () => props.loading,
  componentId,
  config,
})

// Per-instance prop wins over the global default, which defaults to on.
const isAnimated = computed(() => props.animated ?? config.theme.animation ?? true)

// Merge plugin theme with per-instance overrides into CSS custom properties.
const themeVars = computed(() => {
  const t = config.theme
  const vars: Record<string, string> = {}
  const base = props.baseColor ?? t.baseColor
  const hi = props.highlightColor ?? t.highlightColor
  const radius = props.radius ?? t.radius
  const duration = props.duration ?? t.duration
  if (base) vars['--as-base'] = base
  if (hi) vars['--as-highlight'] = hi
  if (radius) vars['--as-radius'] = radius
  if (duration) vars['--as-duration'] = duration
  return vars
})
</script>

<template>
  <div
    class="as-root"
    :class="{ 'as-root--static': !isAnimated }"
    :style="themeVars"
    :aria-busy="loading || undefined"
  >
    <Transition name="as-fade" mode="out-in">
      <SkeletonCanvas
        v-if="loading"
        key="skeleton"
        :descriptor="activeDescriptor"
        :count="count"
      />
      <div v-else key="content" ref="contentEl" class="as-content">
        <slot />
      </div>
    </Transition>
  </div>
</template>
