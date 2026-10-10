---
title: Nuxt
description: Use auto-skeleton-vue in Nuxt 3 and 4 with the built-in module — auto-imported <AutoSkeleton>, stylesheet included, typed nuxt.config options, and SSR-safe rendering.
---

# Nuxt

`auto-skeleton-vue` ships a Nuxt module. It registers `<AutoSkeleton>` and the
composables as auto-imports, adds the stylesheet, and provides your options to
every component — on the server and in the browser. Works with Nuxt 3.10+ and
Nuxt 4.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/oleksiizlotnik/AutoSkeleton/tree/main/examples/nuxt)

Try the [Nuxt example](https://github.com/oleksiizlotnik/AutoSkeleton/tree/main/examples/nuxt)
in your browser: server-rendered, lazy, and client-only loading, one page each.

## Install

```sh
npx nuxi module add auto-skeleton-vue
```

This installs the package and adds the module to `nuxt.config`. Or do it by
hand:

```sh
npm i auto-skeleton-vue
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['auto-skeleton-vue/nuxt'],
  autoSkeleton: {
    persist: true, // cache geometry in localStorage across reloads
    version: '1.4.0', // namespace the cache; a new value starts clean
  },
})
```

No CSS import and no plugin file needed. The `autoSkeleton` key takes every
[global option](/guide/configuration#global-defaults) except `store` (see
[custom stores](#custom-store-and-clearing-the-cache)), plus:

| Option | Default | Description |
| --- | --- | --- |
| `css` | `true` | Add `auto-skeleton-vue/style.css` to the app. Set `false` to ship your own styles. |

## Use it

`<AutoSkeleton>` is auto-imported. Drive `loading` from the `status` that
`useFetch` / `useAsyncData` return:

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

::: tip Use a lazy fetch
A blocking `await useFetch()` makes Nuxt wait for the data before it shows the
page, so there is never a loading state to draw a skeleton for. Use
`useLazyFetch` / `useLazyAsyncData` (or `lazy: true`) so the page renders right
away and the skeleton fills the gap while data loads.
:::

## How it behaves with SSR

Capture needs a real layout engine, so it only ever happens in the browser.
Rendering works on both sides, and the server and client markup match, so
hydration is clean:

- **Data fetched on the server** (the default, lazy or not): the server
  renders the real content. After hydration, the browser captures it, so the
  next loading state — a refresh or a client-side navigation — replays the real
  layout.
- **Client-only fetches** (`server: false`): the server renders the loading
  state as the generic fallback skeleton. On mount it switches to the captured
  geometry, if there is any — in memory or, with `persist`, from a previous
  visit.

With `server: false`, `status` is `'idle'` during server rendering but already
`'pending'` while the browser hydrates. Treat both as loading so the server and
client agree:

```vue
<script setup lang="ts">
const { data: user, status } = useLazyFetch('/api/user', { server: false })
</script>

<template>
  <AutoSkeleton :loading="status === 'idle' || status === 'pending'">
    <UserCard :user="user" />
  </AutoSkeleton>
</template>
```

## Tips

### Wrapping a plain element

The captured layout is cached under the wrapped component's name. When the
direct child is a plain element instead, such as a `<div>` or `<ul>` around a
list, every wrapper around the same tag shares one cache entry, and they replay
each other's layout. Give each one an `id`:

```vue
<AutoSkeleton id="team-list" :loading="status === 'pending'">
  <ul>
    <li v-for="member in team" :key="member.id">{{ member.name }}</li>
  </ul>
</AutoSkeleton>
```

### Keeping content visible while refreshing

During `refresh()`, `status` is `'pending'` but `data` still holds the previous
result. To show the skeleton only when there's nothing to show yet:

```vue
<AutoSkeleton :loading="status === 'pending' && !data">
  <UserCard :user="user" />
</AutoSkeleton>
```

## Runtime config

The options are exposed as public runtime config
(`runtimeConfig.public.autoSkeleton`), so any key you set in `nuxt.config` can be
overridden per environment without a rebuild:

```sh
NUXT_PUBLIC_AUTO_SKELETON_VERSION=2026-10-08 node .output/server/index.mjs
```

## Custom store and clearing the cache

The resolved config is available as `$autoSkeleton` on the Nuxt app. To clear
the cache (e.g. on logout):

```ts
const { $autoSkeleton } = useNuxtApp()
$autoSkeleton.store.clear()
```

A custom store isn't serializable, so it can't go in `nuxt.config`. Set it from
a plugin instead — module plugins run before yours:

```ts
// plugins/skeleton-store.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$autoSkeleton.store = new MyStore()
})
```

`useAutoSkeleton` and `useAutoSkeletonConfig` are auto-imported too.

## Without the module

If you'd rather wire it up yourself, install the Vue plugin from a Nuxt plugin
and add the stylesheet:

```ts
// plugins/auto-skeleton.ts
import { createAutoSkeleton } from 'auto-skeleton-vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(createAutoSkeleton({ persist: true }))
})
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['auto-skeleton-vue/style.css'],
})
```
