import { describe, expect, it } from 'vitest'
import { classify, hasDirectText, readRadius } from '../src/core/classify'

function el(html: string): Element {
  const host = document.createElement('div')
  host.innerHTML = html
  return host.firstElementChild as Element
}

describe('classify', () => {
  const style = (overrides: Partial<CSSStyleDeclaration> = {}) =>
    ({ display: 'block', visibility: 'visible', opacity: '1', backgroundImage: 'none', ...overrides }) as CSSStyleDeclaration

  it('classifies media tags', () => {
    expect(classify(el('<img />'), style())).toBe('media')
    expect(classify(el('<svg></svg>'), style())).toBe('media')
  })

  it('classifies form/box tags', () => {
    expect(classify(el('<button>Go</button>'), style())).toBe('box')
    expect(classify(el('<input />'), style())).toBe('box')
  })

  it('treats background-image as media', () => {
    expect(classify(el('<div></div>'), style({ backgroundImage: 'url(x.png)' }))).toBe('media')
  })

  it('classifies elements with direct text as text', () => {
    expect(classify(el('<p>hello</p>'), style())).toBe('text')
  })

  it('classifies element-only wrappers as containers', () => {
    expect(classify(el('<div><span></span></div>'), style())).toBe('container')
  })

  it('classifies empty leaf elements as box', () => {
    expect(classify(el('<div></div>'), style())).toBe('box')
  })

  it('skips hidden elements', () => {
    expect(classify(el('<div>hi</div>'), style({ display: 'none' }))).toBe('skip')
    expect(classify(el('<div>hi</div>'), style({ visibility: 'hidden' }))).toBe('skip')
  })
})

describe('hasDirectText', () => {
  it('detects direct text but ignores nested-only text', () => {
    expect(hasDirectText(el('<p>hi <b>x</b></p>'))).toBe(true)
    expect(hasDirectText(el('<p><b>x</b></p>'))).toBe(false)
    expect(hasDirectText(el('<p>   </p>'))).toBe(false)
  })
})

describe('readRadius', () => {
  it('parses pixel radius', () => {
    expect(readRadius({ borderTopLeftRadius: '8px', borderRadius: '' } as CSSStyleDeclaration)).toBe(8)
    expect(readRadius({ borderTopLeftRadius: '', borderRadius: '' } as CSSStyleDeclaration)).toBe(0)
  })
})
