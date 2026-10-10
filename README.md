# auto-skeleton-vue
[![npm version](https://img.shields.io/npm/v/auto-skeleton-vue.svg)](https://www.npmjs.com/package/auto-skeleton-vue)
[![Nuxt 3 & 4](https://img.shields.io/badge/Nuxt-3%20%26%204-00DC82?logo=nuxt&logoColor=white)](https://oleksiizlotnik.github.io/AutoSkeleton/guide/nuxt)
[![license](https://img.shields.io/npm/l/auto-skeleton-vue.svg)](https://github.com/oleksiizlotnik/AutoSkeleton/blob/main/LICENSE)

Auto-generated skeleton loaders for **Vue 3** and **Nuxt** that mirror a component's *real
rendered layout* — no separate skeleton component to author, and it stays in
sync automatically because it's derived from the component itself.

> **New in 1.0 — Nuxt support.** Add `modules: ['auto-skeleton-vue/nuxt']` and
> `<AutoSkeleton>` is auto-imported, styled, and SSR-safe. See the
> [Nuxt guide](https://oleksiizlotnik.github.io/AutoSkeleton/guide/nuxt) and the
> [changelog](https://github.com/oleksiizlotnik/AutoSkeleton/blob/main/CHANGELOG.md).

```vue
<AutoSkeleton :loading="isLoading">
  <UserCard :user="user" />
</AutoSkeleton>
```

That's it. No `<Skeleton>` tags to place inside `UserCard`, no hand-drawn
placeholder to keep matching your layout.

## Live demo

**[Docs & live demo →](https://oleksiizlotnik.github.io/AutoSkeleton/)** &nbsp;·&nbsp;
[interactive demo](https://oleksiizlotnik.github.io/AutoSkeleton/guide/demo)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/oleksiizlotnik/AutoSkeleton/tree/main/examples/vue)

Runnable examples, both open in StackBlitz straight from this repo: [Vue](https://github.com/oleksiizlotnik/AutoSkeleton/tree/main/examples/vue) · [Nuxt](https://github.com/oleksiizlotnik/AutoSkeleton/tree/main/examples/nuxt).

Toggle **loading** to watch each component's skeleton generate itself.

## How it works

The skeleton is always **one render behind**:

1. When `loading` is `false`, the real component renders. After paint,
   AutoSkeleton walks its DOM and **captures** the layout into a compact,
   serializable descriptor (text → per-line bars, images → blocks, etc.),
   keyed by component + viewport width.
2. When `loading` is `true`, it **replays** the cached descriptor — a
   pixel-accurate skeleton of the last real render.
3. On the very first load (no capture yet) it shows a small generic fallback.
   Enable `persist` to cache across reloads and skip that flash.

Because every successful render overwrites the cache, changing your component
automatically updates its skeleton. There is no sync step, and the child is
**never** force-rendered without data.

## Install

```sh
npm i auto-skeleton-vue
```

```ts
import { createApp } from 'vue'
import { createAutoSkeleton } from 'auto-skeleton-vue'
import 'auto-skeleton-vue/style.css'

createApp(App)
  .use(
    createAutoSkeleton({
      baseColor: '#e2e5e9',
      highlightColor: '#f2f4f7',
      duration: '1.5s',
      animation: true, // shimmer on by default; set false for static gray
      persist: true, // cache geometry in localStorage across reloads
      version: '1.4.0', // namespace the cache; a new value starts clean
      maxAge: 7 * 24 * 60 * 60 * 1000, // expire persisted geometry after 7 days
      maxEntries: 200, // LRU cap on persisted entries
    }),
  )
  .mount('#app')
```

The shimmer is disabled automatically when the user has `prefers-reduced-motion`
set. Persisted geometry expires by `maxAge`, is namespaced by `version`, and is
LRU-capped by `maxEntries`; call `store.clear()` to wipe it (e.g. on logout).

You can also import `AutoSkeleton` directly without installing the plugin;
it falls back to sensible defaults.

### Nuxt

Add the module — components, composables, and the stylesheet are wired up for
you, and rendering is SSR-safe:

```sh
npx nuxi module add auto-skeleton-vue
```

or add it to `nuxt.config` yourself:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['auto-skeleton-vue/nuxt'],
  autoSkeleton: { persist: true }, // same options as createAutoSkeleton()
})
```

```vue
<script setup lang="ts">
const { data: user, status } = useLazyFetch('/api/user')
</script>

<template>
  <AutoSkeleton :loading="status === 'pending'">
    <UserCard :user="user" />
  </AutoSkeleton>
</template>
```

See the [Nuxt guide](https://oleksiizlotnik.github.io/AutoSkeleton/guide/nuxt) for
SSR details, client-only fetches, and custom stores, or try the
[Nuxt example](https://github.com/oleksiizlotnik/AutoSkeleton/tree/main/examples/nuxt) in your browser:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/oleksiizlotnik/AutoSkeleton/tree/main/examples/nuxt)

## `<AutoSkeleton>` props

| Prop             | Type      | Default | Description                                              |
| ---------------- | --------- | ------- | -------------------------------------------------------- |
| `loading`        | `boolean` | —       | Show the skeleton when `true`, the content when `false`. |
| `id`             | `string`  | auto    | Cache identity. Defaults to the child's name / file.     |
| `count`          | `number`  | `1`     | Repeat the captured block N times (for lists).           |
| `animated`       | `boolean` | global  | Play the shimmer; overrides the global default when set. |
| `baseColor`      | `string`  | —       | Per-instance theme override.                             |
| `highlightColor` | `string`  | —       | Per-instance theme override.                             |
| `radius`         | `string`  | —       | Border radius for media/box primitives.                  |
| `duration`       | `string`  | —       | Shimmer animation duration.                              |

## Limitations

- First-ever load shows a generic fallback (mitigated by `persist`).
- Responsive reflow is handled by width-bucketed cache keys + resize
  re-capture, not by live reflow of a captured descriptor.
- Capture is client-only. Server rendering works (and hydrates cleanly), but a
  loading state rendered on the server shows the fallback until the page mounts.
- Pseudo-elements, CSS transforms, and `position: sticky` are approximated.

## License

MIT
