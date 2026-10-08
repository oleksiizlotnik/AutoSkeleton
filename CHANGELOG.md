# Changelog

All notable changes to `auto-skeleton-vue` are documented here. The project
follows [Semantic Versioning](https://semver.org).

## [1.0.0] — 2026-10-08

Nuxt support, and a stable API. No breaking changes: existing Vue apps upgrade
without code changes.

### Added

- **Nuxt module**, `modules: ['auto-skeleton-vue/nuxt']`, for Nuxt 3.10+ and
  Nuxt 4. `<AutoSkeleton>`, `<SkeletonCanvas>`, `useAutoSkeleton` and
  `useAutoSkeletonConfig` are auto-imported, and the stylesheet is included.
  Options go under a typed `autoSkeleton` key in `nuxt.config`.
- Module options are exposed as public runtime config, so they can be
  overridden per environment with `NUXT_PUBLIC_AUTO_SKELETON_*` variables.
- `nuxtApp.$autoSkeleton` exposes the config, e.g. to plug in a custom store or
  to clear the cache on logout.
- [Nuxt guide](https://oleksiizlotnik.github.io/AutoSkeleton/guide/nuxt) in the
  docs.

### Changed

- Server-side rendering is now supported and tested. Both the content and the
  loading state render on the server and hydrate without mismatches. Capture
  still happens in the browser.
- The injection key is now a registered symbol (`Symbol.for('auto-skeleton')`),
  so provide/inject keep working if the library ends up loaded twice.
- On the server, the fallback config (used without the plugin) is no longer
  shared between requests.

## [0.1.1] — 2026-07-13

### Changed

- The package homepage now points to the documentation site.

## [0.1.0] — 2026-07-13

Initial release.

### Added

- `<AutoSkeleton>`: captures a component's real rendered layout and replays it
  as a skeleton while loading. `<SkeletonCanvas>` renders a captured layout.
- `createAutoSkeleton()` plugin with theming and a shimmer animation toggle.
- In-memory cache, plus an opt-in persistent localStorage cache with expiry, an
  entry cap and version namespacing.

[1.0.0]: https://github.com/oleksiizlotnik/AutoSkeleton/compare/0412812...v1.0.0
