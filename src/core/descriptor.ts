/**
 * A SkeletonDescriptor is the serializable source of truth captured from a
 * component's real rendered layout and replayed as a skeleton. It is a flat
 * list of primitives positioned relative to the wrapper root, so the render
 * path is identical whether the descriptor came from memory or persistent cache.
 */

export type PrimitiveType = 'text' | 'media' | 'box'

export interface SkeletonPrimitive {
  type: PrimitiveType
  /** Offset from the wrapper root's top-left, in CSS pixels. */
  x: number
  y: number
  w: number
  h: number
  /** Border radius in pixels. Text lines default to a pill radius. */
  radius: number
}

export interface SkeletonDescriptor {
  /** Width of the captured root box in CSS pixels. */
  width: number
  /** Height of the captured root box in CSS pixels. */
  height: number
  primitives: SkeletonPrimitive[]
  /**
   * Version stamp of the capture format. Bump when the primitive shape
   * changes so stale persisted descriptors can be discarded on read.
   */
  v: number
}

export const DESCRIPTOR_VERSION = 1

export function emptyDescriptor(): SkeletonDescriptor {
  return { width: 0, height: 0, primitives: [], v: DESCRIPTOR_VERSION }
}

export function isDescriptor(value: unknown): value is SkeletonDescriptor {
  if (!value || typeof value !== 'object') return false
  const d = value as Partial<SkeletonDescriptor>
  return (
    typeof d.width === 'number' &&
    typeof d.height === 'number' &&
    Array.isArray(d.primitives) &&
    d.v === DESCRIPTOR_VERSION
  )
}
