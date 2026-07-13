import type { SkeletonDescriptor, SkeletonPrimitive } from './descriptor'
import { DESCRIPTOR_VERSION } from './descriptor'
import { classify, readRadius } from './classify'

/** Text bars are drawn thinner than the full line box, for a cleaner look. */
const TEXT_BAR_RATIO = 0.65
/** Ignore anything smaller than this (sub-pixel artifacts, hairlines). */
const MIN_SIZE = 2

function round(n: number): number {
  return Math.round(n * 10) / 10
}

/**
 * Walk a rendered subtree and produce a serializable skeleton descriptor whose
 * primitives are positioned relative to `root`. This is the core of the
 * package: the skeleton is literally derived from the component's real layout.
 *
 * Must run on the client after layout (getBoundingClientRect needs a real
 * layout engine — it returns zeros in jsdom).
 */
export function captureDescriptor(root: HTMLElement): SkeletonDescriptor {
  const rootRect = root.getBoundingClientRect()
  const primitives: SkeletonPrimitive[] = []

  const push = (
    type: SkeletonPrimitive['type'],
    rect: DOMRect,
    radius: number,
  ): void => {
    const w = rect.width
    const h = rect.height
    if (w < MIN_SIZE || h < MIN_SIZE) return
    primitives.push({
      type,
      x: round(rect.left - rootRect.left),
      y: round(rect.top - rootRect.top),
      w: round(w),
      h: round(h),
      radius: round(radius),
    })
  }

  const walk = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? ''
      if (!text.trim()) return
      // Range.getClientRects() yields one rect per visual line — this is what
      // gives multi-line text its natural, per-line skeleton bars.
      const range = document.createRange()
      range.selectNodeContents(node)
      for (const line of Array.from(range.getClientRects())) {
        const barH = line.height * TEXT_BAR_RATIO
        const inset = (line.height - barH) / 2
        push(
          'text',
          new DOMRect(line.left, line.top + inset, line.width, barH),
          barH / 2,
        )
      }
      range.detach?.()
      return
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return
    const el = node as Element
    const style = getComputedStyle(el)
    const kind = classify(el, style)

    switch (kind) {
      case 'skip':
        return
      case 'media':
        push('media', el.getBoundingClientRect(), readRadius(style))
        return
      case 'box':
        push('box', el.getBoundingClientRect(), readRadius(style))
        return
      // 'text' and 'container' both recurse: text nodes emit line bars, while
      // nested elements are classified on their own.
      default:
        for (const child of Array.from(el.childNodes)) walk(child)
    }
  }

  for (const child of Array.from(root.childNodes)) walk(child)

  return {
    width: round(rootRect.width),
    height: round(rootRect.height),
    primitives,
    v: DESCRIPTOR_VERSION,
  }
}
