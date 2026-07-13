import { describe, expect, it } from 'vitest'
import { cacheKey, componentIdFromVNodes, widthBucket } from '../src/core/key'

describe('widthBucket', () => {
  it('snaps widths to the nearest step', () => {
    expect(widthBucket(0, 160)).toBe(0)
    expect(widthBucket(80, 160)).toBe(160)
    expect(widthBucket(159, 160)).toBe(160)
    expect(widthBucket(240, 160)).toBe(320)
  })

  it('never returns negative', () => {
    expect(widthBucket(-50, 160)).toBe(0)
  })
})

describe('componentIdFromVNodes', () => {
  it('prefers an explicit id', () => {
    expect(componentIdFromVNodes(undefined, 'my-id')).toBe('my-id')
  })

  it('uses the component __name', () => {
    const vnodes = [{ type: { __name: 'UserCard' } }] as never
    expect(componentIdFromVNodes(vnodes)).toBe('UserCard')
  })

  it('falls back to element tag for plain elements', () => {
    const vnodes = [{ type: 'div' }] as never
    expect(componentIdFromVNodes(vnodes)).toBe('el:div')
  })

  it('hashes structure for anonymous components (stable, non-constant)', () => {
    const anon = [{ type: { setup() {} }, children: [{ type: 'span' }] }] as never
    const id = componentIdFromVNodes(anon)
    expect(id).toMatch(/^auto:/)
    // Deterministic across calls...
    expect(componentIdFromVNodes(anon)).toBe(id)
    // ...but different for a different structure.
    const other = [{ type: { setup() {} }, children: [{ type: 'img' }] }] as never
    expect(componentIdFromVNodes(other)).not.toBe(id)
  })
})

describe('cacheKey', () => {
  it('combines id and width bucket', () => {
    expect(cacheKey('UserCard', 500, 160)).toBe('UserCard@480')
  })
})
