---
layout: home
title: 'auto-skeleton-vue: Vue 3 & Nuxt skeleton loaders that mirror your components'
titleTemplate: false
description: Auto-generated Vue 3 & Nuxt skeleton loaders derived from a component's real rendered layout — zero authoring, always in sync. Wrap any component in <AutoSkeleton :loading>.

hero:
  name: auto-skeleton-vue
  text: Skeletons that mirror your components
  tagline: Auto-generated skeleton loaders for Vue 3 and Nuxt, derived from a component's real rendered layout — zero authoring, always in sync.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Nuxt
      link: /guide/nuxt
    - theme: alt
      text: How it works
      link: /guide/how-it-works
    - theme: alt
      text: GitHub
      link: https://github.com/oleksiizlotnik/AutoSkeleton

features:
  - title: Zero authoring
    details: Wrap any component in <AutoSkeleton>. No <Skeleton> tags to place, no separate placeholder component to build.
  - title: Always in sync
    details: The skeleton is derived from the component's actual render, so it updates automatically when your layout changes. Nothing to keep in sync by hand.
  - title: Pixel-accurate
    details: Text becomes per-line bars, images and media become blocks — captured from the real DOM, matching spacing, radius, and typography.
  - title: Nuxt-ready
    details: One line in nuxt.config. <AutoSkeleton> is auto-imported, styles are included, and pages render on the server and hydrate cleanly.
    link: /guide/nuxt
    linkText: Nuxt guide
---

## Try it

Toggle **loading** to watch the skeleton generate itself from the card's real layout:

<Demo />

```vue
<AutoSkeleton :loading="isLoading">
  <UserCard :user="user" />
</AutoSkeleton>
```

See more examples — stat tiles, an article list, and a settings form — on the
[live demo page →](/guide/demo).

## Using Nuxt?

Add the module and wrap your components — no plugin file or CSS import needed:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['auto-skeleton-vue/nuxt'],
})
```

See the [Nuxt guide →](/guide/nuxt) for SSR details and data fetching.
