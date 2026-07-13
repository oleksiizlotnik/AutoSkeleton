# `useAutoSkeleton(params)`

The capture/replay/cache lifecycle for a single wrapped region.
`<AutoSkeleton>` is a thin shell over this — use it directly to build a custom
wrapper.

```ts
import { useAutoSkeleton } from 'auto-skeleton-vue'
import { computed, ref } from 'vue'

const loading = ref(false)
const { contentEl, activeDescriptor, capture } = useAutoSkeleton({
  loading: () => loading.value,
  componentId: 'my-widget',
})
```

## Parameters

An object with:

| Field | Type | Description |
| --- | --- | --- |
| `loading` | `boolean \| Ref<boolean> \| () => boolean` | Current loading state (a value, ref, or getter). |
| `componentId` | `string \| Ref<string> \| () => string` | Cache identity for this region. |
| `config` | `AutoSkeletonConfig` | Optional explicit config. Defaults to the injected/global config. |

## Returns

| Field | Type | Description |
| --- | --- | --- |
| `contentEl` | `Ref<HTMLElement \| null>` | Attach to the element wrapping the real content. |
| `activeDescriptor` | `Ref<SkeletonDescriptor>` | The descriptor to render while loading (cached geometry, or fallback). |
| `capture` | `() => void` | Capture the current content layout into the cache. Safe to call anytime. |

## Behavior

- Captures after the content mounts (and after images/fonts settle), not on a
  timer — timing-robust even with transitions.
- Re-captures on content resize (`ResizeObserver`) and on viewport width-bucket
  changes (`resize` listener).
- When `loading` turns on, immediately loads the cached descriptor for the
  current key, or a fallback if there's no capture yet.

## Minimal custom wrapper

```vue
<script setup lang="ts">
import { useAutoSkeleton, SkeletonCanvas } from 'auto-skeleton-vue'

const props = defineProps<{ loading: boolean }>()
const { contentEl, activeDescriptor } = useAutoSkeleton({
  loading: () => props.loading,
  componentId: 'custom',
})
</script>

<template>
  <SkeletonCanvas v-if="loading" :descriptor="activeDescriptor" />
  <div v-else ref="contentEl"><slot /></div>
</template>
```
