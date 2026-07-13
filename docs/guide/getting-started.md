---
title: Getting started
description: Install auto-skeleton-vue, register the plugin, and wrap any Vue 3 component in <AutoSkeleton :loading> to generate a skeleton from its real rendered layout.
---

# Getting started

`auto-skeleton-vue` generates skeleton loaders for **Vue 3** that mirror a
component's *real rendered layout*. You don't author or maintain a separate
skeleton — it's derived from the component itself.

## Install

::: code-group

```sh [npm]
npm i auto-skeleton-vue
```

```sh [pnpm]
pnpm add auto-skeleton-vue
```

```sh [yarn]
yarn add auto-skeleton-vue
```

:::

## Set up the plugin

Register the plugin and **import the stylesheet** (this is required — without it
the skeleton blocks have no styling and appear invisible):

```ts
import { createApp } from 'vue'
import { createAutoSkeleton } from 'auto-skeleton-vue'
import 'auto-skeleton-vue/style.css' // ← required
import App from './App.vue'

createApp(App)
  .use(createAutoSkeleton({ persist: true }))
  .mount('#app')
```

::: warning Don't forget the CSS
The positioning, colors, and shimmer animation all live in
`auto-skeleton-vue/style.css`. If you skip the import, geometry is still
captured but nothing is visible.
:::

## Use it

Wrap any component and pass a `loading` boolean:

```vue
<script setup lang="ts">
import { AutoSkeleton } from 'auto-skeleton-vue'
import UserCard from './UserCard.vue'

const { data: user, pending } = useFetchUser()
</script>

<template>
  <AutoSkeleton :loading="pending">
    <UserCard :user="user" />
  </AutoSkeleton>
</template>
```

That's the whole API surface for the common case. No `<Skeleton>` tags inside
`UserCard`, no hand-drawn placeholder.

## Live demo

<Demo />

The first time a component loads there's no capture yet, so a small generic
fallback shows. After it renders once, the skeleton mirrors the real layout —
and with `persist: true` that mirror survives page reloads. See
[How it works](/guide/how-it-works) for why.

## Next steps

- [How it works](/guide/how-it-works) — the "one render behind" model
- [Configuration & theming](/guide/configuration) — props, colors, animation, per-instance overrides
- [Caching & persistence](/guide/caching) — TTL, versioning, storage
- [Live demo](/guide/demo) — every example in one place
