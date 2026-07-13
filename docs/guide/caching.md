# Caching & persistence

Captured geometry is stored so it can be replayed on the next load. By default
the cache lives **in memory** for the page session. Opt into persistence to keep
it across full reloads.

## In-memory (default)

With no options, geometry is cached in a `Map` scoped to the current page. The
very first load of each component shows the generic fallback; every load after
that (in the same session) replays the real layout.

## Persistent (localStorage)

```ts
app.use(createAutoSkeleton({ persist: true }))
```

Now the captured layout survives reloads — so even a cold start replays the real
mirror instead of the fallback flash. Persistence is best-effort: quota or
private-mode errors are swallowed and never break rendering.

## Keeping it fresh

The persistent store manages its own hygiene:

```ts
app.use(
  createAutoSkeleton({
    persist: true,
    version: '1.4.0', // namespace keys; a new value starts with a clean cache
    maxAge: 7 * 24 * 60 * 60 * 1000, // ignore + evict entries older than this (default 7d)
    maxEntries: 200, // LRU cap; oldest are evicted on write (default 200)
  }),
)
```

- **`version`** — prefixes cache keys. Bump it on a release whose layouts
  changed to guarantee a clean slate instead of one stale frame.
- **`maxAge`** — stale entries are treated as absent and re-captured, so
  layouts self-heal over time.
- **`maxEntries`** — the cache can never approach the storage quota.

To wipe the cache manually (e.g. on logout), call `clear()` on the store — see
[Stores](/api/stores).

## How entries are keyed

Each entry is keyed by **component identity + viewport-width bucket**:

- **Identity** comes from the wrapped component's compiled name/file, or an
  explicit [`id`](/api/auto-skeleton#id) prop. For anonymous components a stable
  structural hash is used.
- **Width bucket** snaps the viewport width to a step (default `160px`), so a
  phone layout and a desktop layout of the same component cache separately.
  Tune it with [`widthStep`](/api/plugin).

```
UserCard@320   ← narrow layout
UserCard@480   ← wider layout
```

::: tip Explicit ids
In production, component names can be minified. If you see the wrong skeleton
replayed for a component, give it an explicit `:id` to pin its cache identity.
:::
