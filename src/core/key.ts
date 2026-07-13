import type { VNode } from 'vue'

/** djb2-style string hash → short base36 token. Stable across renders. */
function hashString(input: string): string {
  let h = 5381
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h) ^ input.charCodeAt(i)
  }
  return (h >>> 0).toString(36)
}

/**
 * A structural signature of a vnode subtree (tag/component names, nested), used
 * only as a last-resort identity when a component exposes no stable name.
 */
function vnodeSignature(vnodes: VNode[] | undefined, depth = 0): string {
  if (!vnodes || depth > 4) return ''
  return vnodes
    .map((v) => {
      if (!v || v.type == null) return ''
      const t =
        typeof v.type === 'string'
          ? v.type
          : ((v.type as Record<string, unknown>).__name as string) ||
            ((v.type as Record<string, unknown>).name as string) ||
            'c'
      const kids = Array.isArray(v.children)
        ? vnodeSignature(v.children as VNode[], depth + 1)
        : ''
      return `${t}(${kids})`
    })
    .join(',')
}

/**
 * Derive a stable identity for the wrapped component so its captured geometry
 * can be cached and replayed. Prefers an explicit id, then the component's
 * compiled name / source file. Falls back to a hash of the vnode structure —
 * which is stable across renders and far less collision-prone than a constant.
 */
export function componentIdFromVNodes(vnodes: VNode[] | undefined, explicit?: string): string {
  if (explicit) return explicit
  const first = vnodes?.find((v) => v && v.type != null)
  if (first && typeof first.type === 'object') {
    const type = first.type as Record<string, unknown>
    const name = (type.__name || type.name) as string | undefined
    const file = type.__file as string | undefined
    if (name) return name
    if (file) return file
  }
  if (typeof first?.type === 'string') return `el:${first.type}`
  // Anonymous/inline component with no name: fingerprint its structure.
  return `auto:${hashString(vnodeSignature(vnodes))}`
}

/**
 * Snap a viewport width to a bucket so responsive layouts with different
 * reflows cache separately, without exploding the cache on every 1px resize.
 */
export function widthBucket(width: number, step = 160): number {
  return Math.max(0, Math.round(width / step) * step)
}

export function cacheKey(componentId: string, viewportWidth: number, step?: number): string {
  return `${componentId}@${widthBucket(viewportWidth, step)}`
}
