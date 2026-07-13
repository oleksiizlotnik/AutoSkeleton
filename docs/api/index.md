# API reference

Everything the package exports.

## Components

- [`<AutoSkeleton>`](/api/auto-skeleton) — the wrapper component (also globally
  registered by the plugin).
- `<SkeletonCanvas>` — renders a descriptor as absolutely-positioned blocks.
  Used internally by `<AutoSkeleton>`; exported for advanced use.

## Plugin

- [`createAutoSkeleton(options)`](/api/plugin) — Vue plugin that provides global
  config and registers the components.

## Composable

- [`useAutoSkeleton(params)`](/api/composable) — the capture/replay lifecycle,
  for building custom wrappers.

## Stores

- [`MemoryStore`, `LocalStorageStore`, `SkeletonStore`](/api/stores) — where
  captured geometry is kept.

## Low-level utilities & types

| Export | Description |
| --- | --- |
| `captureDescriptor(root)` | Walk a DOM subtree → `SkeletonDescriptor`. |
| `fallbackDescriptor(width?, lines?)` | Build a generic placeholder descriptor. |
| `SkeletonDescriptor`, `SkeletonPrimitive` | Descriptor types. |
| `AutoSkeletonOptions`, `AutoSkeletonTheme`, `AutoSkeletonConfig` | Config types. |
| `AUTO_SKELETON_KEY` | Injection key for the resolved config. |
| `getDefaultConfig()`, `resolveConfig(options)`, `useAutoSkeletonConfig()` | Config helpers. |
