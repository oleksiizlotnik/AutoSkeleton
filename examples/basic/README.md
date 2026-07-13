# auto-skeleton-vue — basic example

A minimal Vue 3 + Vite app that consumes the published `auto-skeleton-vue`
package. It shows a `UserCard` and a `v-for` list, each wrapped in
`<AutoSkeleton>`; toggle **loading** to see the auto-generated skeletons.

## Run locally

```sh
npm install
npm run dev
```

## Open in StackBlitz

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/oleksiizlotnik/AutoSkeleton/tree/main/examples/basic)

## The one thing not to forget

`src/main.ts` imports the stylesheet:

```ts
import 'auto-skeleton-vue/style.css'
```

Without it the skeleton blocks have no background/positioning and appear to be
missing — the geometry is still captured, it just isn't styled.
