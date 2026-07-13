/**
 * Rules for classifying a rendered DOM element into a skeleton primitive kind,
 * or skipping it. Kept pure and DOM-only so it can be unit-tested with fixtures.
 */

export type Classification = 'text' | 'media' | 'box' | 'container' | 'skip'

const MEDIA_TAGS = new Set(['IMG', 'SVG', 'VIDEO', 'CANVAS', 'PICTURE'])
const BOX_TAGS = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'HR', 'PROGRESS'])

/** Elements that never contribute to a skeleton. */
function isSkippable(el: Element, style: CSSStyleDeclaration): boolean {
  if (style.display === 'none' || style.visibility === 'hidden') return true
  if (style.opacity === '0') return true
  const tag = el.tagName
  if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEMPLATE' || tag === 'NOSCRIPT') {
    return true
  }
  return false
}

function hasBackgroundImage(style: CSSStyleDeclaration): boolean {
  const bg = style.backgroundImage
  return !!bg && bg !== 'none'
}

/**
 * Does this element hold visible text directly in its own child text nodes
 * (as opposed to nested elements)? Used to decide whether to emit per-line
 * text primitives for it.
 */
export function hasDirectText(el: Element): boolean {
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE && (node.textContent ?? '').trim().length > 0) {
      return true
    }
  }
  return false
}

export function classify(el: Element, style: CSSStyleDeclaration): Classification {
  if (isSkippable(el, style)) return 'skip'

  // SVG elements report a lowercase, case-preserving tagName; normalize.
  const tag = el.tagName.toUpperCase()
  if (MEDIA_TAGS.has(tag)) return 'media'
  if (BOX_TAGS.has(tag)) return 'box'
  if (hasBackgroundImage(style)) return 'media'

  // A leaf element with no element children but no text either (e.g. an empty
  // decorative box with a background color) becomes a plain box.
  const hasElementChildren = el.children.length > 0
  if (hasDirectText(el)) return 'text'
  if (!hasElementChildren) return 'box'

  return 'container'
}

/** Parse the largest border-radius from computed style into pixels. */
export function readRadius(style: CSSStyleDeclaration): number {
  const raw = style.borderTopLeftRadius || style.borderRadius || '0'
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : 0
}
