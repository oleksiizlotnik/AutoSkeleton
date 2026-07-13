# Stores

A store is where captured geometry lives. The plugin picks one for you based on
`persist`, but you can supply your own via the `store` option.

## `SkeletonStore` interface

```ts
interface SkeletonStore {
  get(key: string): SkeletonDescriptor | undefined
  set(key: string, descriptor: SkeletonDescriptor): void
  clear(): void
}
```

Implementations are synchronous and best-effort: a failing store must never
break rendering.

## `MemoryStore`

The default. Holds descriptors in a `Map` for the current page session.

```ts
import { MemoryStore } from 'auto-skeleton-vue'

const store = new MemoryStore()
```

## `LocalStorageStore`

Persists across reloads, wrapped in a memory layer. Enabled via `persist: true`,
or constructed directly for full control:

```ts
import { LocalStorageStore, createAutoSkeleton } from 'auto-skeleton-vue'

app.use(
  createAutoSkeleton({
    store: new LocalStorageStore({
      prefix: 'auto-skeleton:',
      namespace: '1.0.0',
      maxAgeMs: 7 * 24 * 60 * 60 * 1000,
      maxEntries: 200,
    }),
  }),
)
```

### Constructor options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `prefix` | `string` | `auto-skeleton:` | localStorage key prefix. |
| `namespace` | `string` | — | Extra key segment (e.g. app version). |
| `maxAgeMs` | `number` | `604800000` (7d) | Entries older than this are ignored + evicted. |
| `maxEntries` | `number` | `200` | LRU cap; oldest evicted on write. |

### Clearing the cache

```ts
import { useAutoSkeletonConfig } from 'auto-skeleton-vue'

// inside setup()
const { store } = useAutoSkeletonConfig()
store.clear() // e.g. on logout — wipes only this store's namespace
```

## Custom store

Implement `SkeletonStore` to back the cache with anything (IndexedDB, a store
shared across tabs, etc.):

```ts
class MyStore implements SkeletonStore {
  get(key) {
    /* ... */
  }
  set(key, descriptor) {
    /* ... */
  }
  clear() {
    /* ... */
  }
}

app.use(createAutoSkeleton({ store: new MyStore() }))
```
