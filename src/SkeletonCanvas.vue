<script setup lang="ts">
import { computed } from 'vue'
import type { SkeletonDescriptor, SkeletonPrimitive } from './core/descriptor'

const props = withDefaults(
  defineProps<{
    descriptor: SkeletonDescriptor
    /**
     * Repeat the whole captured block N times, stacked vertically. Useful for
     * lists (v-for) whose real length isn't known while loading. 1 = as captured.
     */
    count?: number
  }>(),
  { count: 1 },
)

interface PlacedPrimitive extends SkeletonPrimitive {
  key: string
}

// Expand the descriptor into a flat, positioned list. When count > 1 the
// captured block is tiled downward by its own height.
const items = computed<PlacedPrimitive[]>(() => {
  const { primitives, height } = props.descriptor
  const reps = Math.max(1, Math.floor(props.count))
  const out: PlacedPrimitive[] = []
  for (let r = 0; r < reps; r++) {
    const dy = r * height
    for (let i = 0; i < primitives.length; i++) {
      const p = primitives[i]
      out.push({ ...p, y: p.y + dy, key: `${r}-${i}` })
    }
  }
  return out
})

const totalHeight = computed(
  () => props.descriptor.height * Math.max(1, Math.floor(props.count)),
)
</script>

<template>
  <div
    class="as-canvas"
    :style="{ width: descriptor.width + 'px', height: totalHeight + 'px' }"
    aria-hidden="true"
  >
    <div
      v-for="p in items"
      :key="p.key"
      class="as-primitive"
      :class="`as-primitive--${p.type}`"
      :style="{
        left: p.x + 'px',
        top: p.y + 'px',
        width: p.w + 'px',
        height: p.h + 'px',
        borderRadius: p.type === 'text' ? undefined : p.radius + 'px',
      }"
    />
  </div>
</template>
