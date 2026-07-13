# Configuration & theming

## Global defaults

Pass options to `createAutoSkeleton()` to set defaults for every
`<AutoSkeleton>` in your app:

```ts
app.use(
  createAutoSkeleton({
    baseColor: '#e2e5e9',
    highlightColor: '#f2f4f7',
    radius: '4px',
    duration: '1.5s',
    animation: true,
  }),
)
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `baseColor` | `string` | `#e2e5e9` | Base fill of skeleton blocks. |
| `highlightColor` | `string` | `#f2f4f7` | Color of the moving shimmer band. |
| `radius` | `string` | `4px` | Border radius for media/box primitives (text is always pill-shaped). |
| `duration` | `string` | `1.5s` | Time for one full shimmer sweep. Lower = faster. |
| `animation` | `boolean` | `true` | Whether the shimmer plays at all. |

See the [plugin API](/api/plugin) for the caching-related options.

## Per-instance overrides

Any theme value can be overridden on a single `<AutoSkeleton>`, which wins over
the global default:

```vue
<AutoSkeleton :loading="loading" base-color="#dfe6ff" duration="0.9s">
  <PromoBanner />
</AutoSkeleton>
```

## Turning the animation off

The shimmer is on by default. Disable it globally or per-instance for a static
gray placeholder:

```ts
// globally
app.use(createAutoSkeleton({ animation: false }))
```

```vue
<!-- per instance -->
<AutoSkeleton :loading="loading" :animated="false">
  <UserCard :user="user" />
</AutoSkeleton>
```

::: tip Reduced motion is automatic
The shimmer is disabled automatically for users whose OS has
`prefers-reduced-motion: reduce` — you don't need to handle that yourself.
:::

## Theming with CSS variables

Under the hood the options set CSS custom properties on the wrapper. You can
also set them in your own CSS for finer control (e.g. dark mode):

```css
.as-root {
  --as-base: #2a2a2e;
  --as-highlight: #3a3a40;
  --as-radius: 6px;
  --as-duration: 1.5s;
}
```

| Variable | Maps to |
| --- | --- |
| `--as-base` | `baseColor` |
| `--as-highlight` | `highlightColor` |
| `--as-radius` | `radius` |
| `--as-duration` | `duration` |
