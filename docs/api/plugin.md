# `createAutoSkeleton(options)`

The Vue plugin. It provides the resolved config to every `<AutoSkeleton>` via
provide/inject and registers `<AutoSkeleton>` and `<SkeletonCanvas>` globally.

```ts
import { createAutoSkeleton } from 'auto-skeleton-vue'
import 'auto-skeleton-vue/style.css'

app.use(
  createAutoSkeleton({
    baseColor: '#e2e5e9',
    highlightColor: '#f2f4f7',
    duration: '1.5s',
    animation: true,
    persist: true,
    version: '1.0.0',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    maxEntries: 200,
    widthStep: 160,
  }),
)
```

Using it without the plugin works too — `<AutoSkeleton>` falls back to sensible
defaults via `getDefaultConfig()`.

## Options

### Theme

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `baseColor` | `string` | `#e2e5e9` | Base fill of skeleton blocks. |
| `highlightColor` | `string` | `#f2f4f7` | Shimmer highlight color. |
| `radius` | `string` | `4px` | Radius for media/box primitives. |
| `duration` | `string` | `1.5s` | Shimmer sweep duration. |
| `animation` | `boolean` | `true` | Whether the shimmer plays. |

### Caching

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `persist` | `boolean` | `false` | Persist geometry to `localStorage` across reloads. |
| `store` | `SkeletonStore` | — | Provide a custom store; overrides `persist`. |
| `widthStep` | `number` | `160` | Viewport-width bucket size (px) for responsive cache keys. |
| `maxAge` | `number` | `604800000` (7d) | Persisted entries older than this are ignored and re-captured. |
| `maxEntries` | `number` | `200` | LRU cap on persisted entries. |
| `version` | `string` | — | Namespaces persisted keys so a new release starts clean. |

See [Caching & persistence](/guide/caching) for the full story.

## Related exports

- `resolveConfig(options)` → `AutoSkeletonConfig` — resolve options without
  installing the plugin.
- `getDefaultConfig()` → `AutoSkeletonConfig` — the fallback config used when
  the plugin isn't installed.
- `useAutoSkeletonConfig()` → `AutoSkeletonConfig` — read the active config
  inside `setup()`.
- `AUTO_SKELETON_KEY` — the injection key.
