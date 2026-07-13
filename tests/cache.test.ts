import { beforeEach, describe, expect, it } from 'vitest'
import { LocalStorageStore, MemoryStore } from '../src/core/cache'
import { DESCRIPTOR_VERSION, type SkeletonDescriptor } from '../src/core/descriptor'

function sample(width = 100): SkeletonDescriptor {
  return {
    width,
    height: 40,
    primitives: [{ type: 'text', x: 0, y: 0, w: width, h: 12, radius: 6 }],
    v: DESCRIPTOR_VERSION,
  }
}

describe('MemoryStore', () => {
  it('stores and retrieves by key', () => {
    const s = new MemoryStore()
    expect(s.get('a')).toBeUndefined()
    s.set('a', sample())
    expect(s.get('a')?.width).toBe(100)
  })

  it('overwrites on repeated set (implicit invalidation)', () => {
    const s = new MemoryStore()
    s.set('a', sample(100))
    s.set('a', sample(200))
    expect(s.get('a')?.width).toBe(200)
  })

  it('clear() removes all entries', () => {
    const s = new MemoryStore()
    s.set('a', sample())
    s.clear()
    expect(s.get('a')).toBeUndefined()
  })
})

describe('LocalStorageStore', () => {
  beforeEach(() => window.localStorage.clear())

  it('round-trips through localStorage', () => {
    const s = new LocalStorageStore({ prefix: 'test:' })
    s.set('k', sample(321))
    // A fresh instance forces a read from localStorage, not the memory layer.
    const fresh = new LocalStorageStore({ prefix: 'test:' })
    expect(fresh.get('k')?.width).toBe(321)
  })

  it('ignores descriptors with a stale format version', () => {
    window.localStorage.setItem(
      'v:bad',
      JSON.stringify({ t: Date.now(), d: { width: 1, height: 1, primitives: [], v: 999 } }),
    )
    const s = new LocalStorageStore({ prefix: 'v:' })
    expect(s.get('bad')).toBeUndefined()
  })

  it('expires entries older than maxAge', () => {
    const s = new LocalStorageStore({ prefix: 'ttl:', maxAgeMs: 1000 })
    // Write an envelope with an ancient timestamp directly.
    window.localStorage.setItem('ttl:old', JSON.stringify({ t: 1, d: sample() }))
    expect(s.get('old')).toBeUndefined()
    // And the stale entry is evicted on read.
    expect(window.localStorage.getItem('ttl:old')).toBeNull()
  })

  it('namespaces keys by version so releases start clean', () => {
    const v1 = new LocalStorageStore({ prefix: 'ns:', namespace: 'v1' })
    v1.set('k', sample(111))
    const v2 = new LocalStorageStore({ prefix: 'ns:', namespace: 'v2' })
    expect(v2.get('k')).toBeUndefined()
    expect(v1.get('k')?.width).toBe(111)
  })

  it('evicts oldest entries past maxEntries', () => {
    const s = new LocalStorageStore({ prefix: 'lru:', maxEntries: 2 })
    // Seed three entries with increasing timestamps written manually so order
    // is deterministic, then trigger a prune via one more set().
    window.localStorage.setItem('lru:a', JSON.stringify({ t: 1, d: sample() }))
    window.localStorage.setItem('lru:b', JSON.stringify({ t: 2, d: sample() }))
    window.localStorage.setItem('lru:c', JSON.stringify({ t: 3, d: sample() }))
    s.set('d', sample()) // now 4 entries -> prune to 2 newest
    const remaining = Object.keys(localStorage).filter((k) => k.startsWith('lru:'))
    expect(remaining).not.toContain('lru:a')
    expect(remaining.length).toBe(2)
  })

  it('clear() wipes only its own namespace', () => {
    const s = new LocalStorageStore({ prefix: 'own:' })
    s.set('x', sample())
    window.localStorage.setItem('other:y', 'keep')
    s.clear()
    expect(s.get('x')).toBeUndefined()
    expect(window.localStorage.getItem('other:y')).toBe('keep')
  })
})
