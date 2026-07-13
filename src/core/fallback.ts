import type { SkeletonDescriptor } from './descriptor'
import { DESCRIPTOR_VERSION } from './descriptor'

/**
 * A generic descriptor shown on the very first load of a component, before any
 * real render has been captured. A few stacked text lines — deliberately
 * neutral. Persistent cache removes this flash on subsequent visits.
 */
export function fallbackDescriptor(width = 320, lines = 3): SkeletonDescriptor {
  const lineH = 14
  const gap = 12
  const primitives = []
  for (let i = 0; i < lines; i++) {
    // Last line is shorter, mimicking a paragraph's ragged edge.
    const w = i === lines - 1 ? width * 0.6 : width
    primitives.push({
      type: 'text' as const,
      x: 0,
      y: i * (lineH + gap),
      w,
      h: lineH,
      radius: lineH / 2,
    })
  }
  return {
    width,
    height: lines * (lineH + gap) - gap,
    primitives,
    v: DESCRIPTOR_VERSION,
  }
}
