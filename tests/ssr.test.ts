import { afterEach, describe, expect, it, vi } from 'vitest'
import { createSSRApp, defineComponent, h, nextTick } from 'vue'
import { renderToString } from 'vue/server-renderer'
import {
  AUTO_SKELETON_KEY,
  AutoSkeleton,
  createAutoSkeleton,
  getDefaultConfig,
  useAutoSkeletonConfig,
  type AutoSkeletonConfig,
  type AutoSkeletonOptions,
} from '../src'

// SSR + hydration of <AutoSkeleton> (Nuxt, VitePress, any createSSRApp host).
// Capture itself is client-only; these tests check that rendering on the server
// works and that the client hydrates the same markup without mismatches.

const Card = defineComponent({
  name: 'Card',
  render: () => h('article', [h('h4', 'Ada Lovelace'), h('p', 'Principal Engineer')]),
})

function makeApp(loading: boolean, options?: AutoSkeletonOptions) {
  const app = createSSRApp({
    render: () => h(AutoSkeleton, { loading, id: 'card' }, () => h(Card)),
  })
  if (options) app.use(createAutoSkeleton(options))
  return app
}

/** Render on the "server", then hydrate that HTML; return any hydration warnings. */
async function hydrate(serverLoading: boolean, clientLoading = serverLoading) {
  const html = await renderToString(makeApp(serverLoading, {}))
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.appendChild(container)

  const messages: string[] = []
  const collect = (...args: unknown[]) => messages.push(args.map(String).join(' '))
  vi.spyOn(console, 'warn').mockImplementation(collect)
  vi.spyOn(console, 'error').mockImplementation(collect)

  const app = makeApp(clientLoading, {})
  app.mount(container)
  await nextTick()
  app.unmount()
  container.remove()
  return messages.filter((m) => /hydration/i.test(m))
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('server rendering', () => {
  it('renders the real content when not loading', async () => {
    const html = await renderToString(makeApp(false, {}))
    expect(html).toContain('as-root')
    expect(html).toContain('as-content')
    expect(html).toContain('Ada Lovelace')
    expect(html).not.toContain('as-canvas')
  })

  it('renders the fallback skeleton when loading', async () => {
    const html = await renderToString(makeApp(true, {}))
    expect(html).toContain('as-canvas')
    expect(html).toContain('as-primitive--text')
    expect(html).toContain('aria-busy="true"')
    expect(html).not.toContain('Ada Lovelace')
  })

  it('renders without the plugin installed', async () => {
    const html = await renderToString(makeApp(true))
    expect(html).toContain('as-canvas')
  })
})

describe('hydration', () => {
  it('hydrates server-rendered content without mismatches', async () => {
    expect(await hydrate(false)).toEqual([])
  })

  it('hydrates a server-rendered skeleton without mismatches', async () => {
    expect(await hydrate(true)).toEqual([])
  })

  it('reports a mismatch when server and client disagree (sanity check)', async () => {
    expect((await hydrate(true, false)).length).toBeGreaterThan(0)
  })
})

describe('SSR config isolation', () => {
  it('uses a registered symbol as the injection key', () => {
    expect(AUTO_SKELETON_KEY).toBe(Symbol.for('auto-skeleton'))
  })

  it('gives each app its own config and store', async () => {
    const seen: AutoSkeletonConfig[] = []
    const Probe = defineComponent({
      setup() {
        seen.push(useAutoSkeletonConfig())
        return () => h('span')
      },
    })
    for (const widthStep of [100, 200]) {
      await renderToString(createSSRApp(Probe).use(createAutoSkeleton({ widthStep })))
    }
    expect(seen.map((c) => c.widthStep)).toEqual([100, 200])
    expect(seen[0].store).not.toBe(seen[1].store)
  })

  it('does not share the default config between requests on the server', () => {
    vi.stubGlobal('window', undefined)
    expect(getDefaultConfig()).not.toBe(getDefaultConfig())
    vi.unstubAllGlobals()
    expect(getDefaultConfig()).toBe(getDefaultConfig())
  })
})
