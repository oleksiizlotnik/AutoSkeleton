---
title: Live demo
description: Interactive demo of auto-skeleton-vue — toggle loading on a profile card, stat tiles, article list, and settings form to watch each skeleton generate itself.
---

# Live demo

Toggle **loading** to see each component's skeleton generate itself from its
real rendered layout. Toggle **animated** to switch the shimmer on/off, or hit
**Simulate reload** to run a full loading cycle.

<Playground />

Every skeleton above is derived automatically from the component next to it —
no skeleton markup was written for any of them. Notice how:

- **text** becomes per-line bars (with a shorter last line),
- **images** and **thumbnails** become solid blocks matching their size and radius,
- **grids and lists** keep their structure,
- editing a component would change its skeleton on the next render, with nothing to keep in sync.

See [How it works](/guide/how-it-works) for the mechanism, or
[Getting started](/guide/getting-started) to add it to your app.
