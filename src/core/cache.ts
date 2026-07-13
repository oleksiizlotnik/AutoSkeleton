import type { SkeletonDescriptor } from './descriptor'
import { isDescriptor } from './descriptor'

/**
 * A persistent store lets captured geometry survive full page reloads, removing
 * the generic-fallback flash on cold start. Implementations are synchronous and
 * best-effort — failures (quota, private mode) must never break rendering.
 */
export interface SkeletonStore {
  get(key: string): SkeletonDescriptor | undefined
  set(key: string, descriptor: SkeletonDescriptor): void
  /** Remove every entry owned by this store. */
  clear(): void
}

/** Default store: in-memory only, scoped to the current page session. */
export class MemoryStore implements SkeletonStore {
  private map = new Map<string, SkeletonDescriptor>()
  get(key: string): SkeletonDescriptor | undefined {
    return this.map.get(key)
  }
  set(key: string, descriptor: SkeletonDescriptor): void {
    this.map.set(key, descriptor)
  }
  clear(): void {
    this.map.clear()
  }
}

export interface LocalStorageStoreOptions {
  prefix?: string
  /** App/build version segment so a new release starts with a clean cache. */
  namespace?: string
  /** Entries older than this are treated as absent. Default: 7 days. */
  maxAgeMs?: number
  /** Cap on stored entries; oldest are evicted on write. Default: 200. */
  maxEntries?: number
}

/** Envelope persisted per entry: timestamp + descriptor. */
interface Envelope {
  t: number
  d: SkeletonDescriptor
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

/**
 * Opt-in persistent store backed by localStorage, wrapped in a memory layer.
 * Entries expire by age, are namespaced by version, and are LRU-capped so the
 * cache can never approach the storage quota.
 */
export class LocalStorageStore implements SkeletonStore {
  private mem = new MemoryStore()
  private prefix: string
  private maxAgeMs: number
  private maxEntries: number

  constructor(options: LocalStorageStoreOptions = {}) {
    const base = options.prefix ?? 'auto-skeleton:'
    this.prefix = options.namespace ? `${base}${options.namespace}:` : base
    this.maxAgeMs = options.maxAgeMs ?? WEEK_MS
    this.maxEntries = options.maxEntries ?? 200
  }

  private canUse(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage
  }

  get(key: string): SkeletonDescriptor | undefined {
    const hit = this.mem.get(key)
    if (hit) return hit
    if (!this.canUse()) return undefined
    try {
      const raw = window.localStorage.getItem(this.prefix + key)
      if (!raw) return undefined
      const env = JSON.parse(raw) as Partial<Envelope>
      if (typeof env.t !== 'number' || !isDescriptor(env.d)) return undefined
      // Expire stale geometry so layouts self-heal after a deploy.
      if (Date.now() - env.t > this.maxAgeMs) {
        window.localStorage.removeItem(this.prefix + key)
        return undefined
      }
      this.mem.set(key, env.d)
      return env.d
    } catch {
      /* ignore parse/security errors */
    }
    return undefined
  }

  set(key: string, descriptor: SkeletonDescriptor): void {
    this.mem.set(key, descriptor)
    if (!this.canUse()) return
    try {
      const env: Envelope = { t: Date.now(), d: descriptor }
      window.localStorage.setItem(this.prefix + key, JSON.stringify(env))
      this.prune()
    } catch {
      /* ignore quota/security errors */
    }
  }

  clear(): void {
    this.mem.clear()
    if (!this.canUse()) return
    try {
      for (const key of this.ownKeys()) window.localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
  }

  /** Full localStorage keys belonging to this store. */
  private ownKeys(): string[] {
    const keys: string[] = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i)
      if (k && k.startsWith(this.prefix)) keys.push(k)
    }
    return keys
  }

  /** Evict the oldest entries when over the cap (best-effort LRU by timestamp). */
  private prune(): void {
    const keys = this.ownKeys()
    if (keys.length <= this.maxEntries) return
    const dated = keys.map((k) => {
      let t = 0
      try {
        t = (JSON.parse(window.localStorage.getItem(k) || '{}') as Envelope).t || 0
      } catch {
        /* treat unparseable as oldest */
      }
      return { k, t }
    })
    dated.sort((a, b) => a.t - b.t)
    for (const { k } of dated.slice(0, dated.length - this.maxEntries)) {
      window.localStorage.removeItem(k)
    }
  }
}
