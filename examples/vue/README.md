# auto-skeleton-vue — Vue example

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/oleksiizlotnik/AutoSkeleton/tree/main/examples/vue)

A Vue 3 + Vite playground with six components: a user card, stat tiles,
product cards, a feed post, an article list, and a settings form. Toggle
**loading** to see each skeleton generated from the component's real layout,
or press **Simulate reload** for a full loading cycle.

Skeletons appear once a component has rendered at least once. With
`persist: true` (set in `src/main.ts`) they're remembered across reloads.

## Run it locally

```sh
npm install
npm run dev
```

Using Nuxt? See the [Nuxt example](../nuxt).
