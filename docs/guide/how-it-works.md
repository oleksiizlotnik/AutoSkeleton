# How it works

## The problem

To mirror a component's layout you need it *rendered* — but while you're loading
you don't have data yet. That's the chicken-and-egg every skeleton library
faces. Most solve it by making you hand-author the skeleton.

## The "one render behind" model

`auto-skeleton-vue` learns geometry from **successful renders** and replays it on
the next load:

1. **`loading = false`** → the real component renders. After it paints,
   AutoSkeleton walks the DOM and **captures** the layout into a compact,
   serializable *descriptor*, cached by component + viewport width.
2. **`loading = true`** with a cached descriptor → it **replays** that
   descriptor as a skeleton — pixel-accurate to the last real render.
3. **`loading = true`** with no cache (first-ever load) → a small generic
   **fallback** skeleton shows. Enable [`persist`](/guide/caching) to cache
   across reloads and skip that flash.

Because every successful render overwrites the cache, editing your component
**automatically updates its skeleton** — there's no sync step. And the child is
**never** force-rendered without data, so you won't hit prop errors.

<Demo />

## What gets captured

The DOM walk classifies each node and emits primitives positioned relative to
the wrapper:

| Rendered element | Becomes |
| --- | --- |
| Text nodes | One **bar per visual line** (via `Range.getClientRects()`), last line naturally shorter |
| `<img>`, `<svg>`, `<video>`, background images | A **media block** with the element's size + border-radius |
| Buttons, inputs, leaf boxes | A rounded **box** |
| Containers | Not drawn — recursed into (layout is preserved by the absolute positions of leaves) |
| Hidden / `display:none` / `<script>` | Skipped |

Capture waits for images to load and web fonts to be ready (with a timeout
guard) so measurements are accurate, and a `ResizeObserver` re-captures when the
content's size changes.

## Lists

<Demo variant="list" />

Whatever the last render produced is what's captured — a 3-item list yields a
3-row skeleton. See [`count`](/api/auto-skeleton#count) for repeating a block
when the length isn't known yet.

## Limitations

- **First-ever load** shows a generic fallback (mitigated by `persist`).
- **Responsive reflow** is handled by width-bucketed cache keys + resize
  re-capture, not by live reflow of a captured descriptor.
- **SSR/Nuxt** — capture is client-only; guard usage accordingly.
- Pseudo-elements, CSS transforms, and `position: sticky` are approximated.
