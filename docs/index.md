---
layout: home
title: 'auto-skeleton-vue: Vue 3 skeleton loaders that mirror your components'
titleTemplate: false
description: Auto-generated Vue 3 skeleton loaders derived from a component's real rendered layout — zero authoring, always in sync. Wrap any component in <AutoSkeleton :loading>.

hero:
  name: auto-skeleton-vue
  text: Skeletons that mirror your components
  tagline: Auto-generated Vue 3 skeleton loaders derived from a component's real rendered layout — zero authoring, always in sync.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
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
---

## Try it

Toggle **loading** to watch the skeleton generate itself from the card's real layout:

<Demo />

```vue
<AutoSkeleton :loading="isLoading">
  <UserCard :user="user" />
</AutoSkeleton>
```
