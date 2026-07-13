# `<AutoSkeleton>`

Wraps a component: shows the real content when `loading` is false and a
skeleton (mirroring the last captured render) when true.

```vue
<AutoSkeleton :loading="pending" :count="3" :animated="true">
  <ArticleList :items="articles" />
</AutoSkeleton>
```

## Props

### `loading`

- Type: `boolean` · **required**

Show the skeleton when `true`, the real content when `false`. Geometry is
captured whenever content is shown, then replayed while loading.

### `id`

- Type: `string` · Default: derived from the child

Explicit cache identity. Defaults to the wrapped component's compiled
name/file, falling back to a structural hash for anonymous components. Set this
when a component's name may be minified in production, or to share/segregate a
cache entry deliberately.

### `count`

- Type: `number` · Default: `1`

Repeats the captured block `count` times, stacked vertically. Useful for lists
whose length isn't known while loading (capture one row, replay N).

### `animated`

- Type: `boolean` · Default: global `animation` (which defaults to `true`)

Play the shimmer for this instance. Overrides the global default when set.
Ignored under `prefers-reduced-motion`.

### Theme overrides

Per-instance overrides of the global theme (see
[Configuration](/guide/configuration)):

| Prop | Type |
| --- | --- |
| `baseColor` | `string` |
| `highlightColor` | `string` |
| `radius` | `string` |
| `duration` | `string` |

## Slots

### default

The real content to render (and to capture geometry from) when not loading.

## Accessibility

While `loading`, the wrapper sets `aria-busy="true"` and the skeleton blocks are
`aria-hidden` (decorative). Content and skeleton cross-fade on toggle.
