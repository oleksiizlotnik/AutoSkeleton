# auto-skeleton-vue — Nuxt example

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/oleksiizlotnik/AutoSkeleton/tree/main/examples/nuxt)

A small Nuxt 4 app using the `auto-skeleton-vue/nuxt` module. Each page shows
one way of loading data:

- **Server-rendered** (`/`): the card is rendered on the server. Press
  Refresh to see the skeleton generated from its real layout.
- **Lazy fetch** (`/lazy`): `useLazyFetch` lets the page open right away, and
  the skeleton fills the gap while data loads.
- **Client-only** (`/client`): `server: false`, so the server renders the
  loading state. The list is a plain element, so it gets an explicit `id`.

The API routes in `server/api` wait 1.2 seconds on purpose, so the loading
state is easy to see.

## Run it locally

```sh
npm install
npm run dev
```

See the [Nuxt guide](https://oleksiizlotnik.github.io/AutoSkeleton/guide/nuxt)
for the full setup.
