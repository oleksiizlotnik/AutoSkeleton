import { afterEach, describe, expect, it } from 'vitest'
import { captureDescriptor } from '../src/core/capture'

// Geometry tests require a real layout engine — run via `npm run test:browser`
// (jsdom returns zeros from getBoundingClientRect).

let host: HTMLElement | undefined
afterEach(() => host?.remove())

function mount(html: string): HTMLElement {
  host = document.createElement('div')
  host.style.cssText = 'position:absolute;left:0;top:0;width:300px;font-size:16px;line-height:20px'
  host.innerHTML = html
  document.body.appendChild(host)
  return host
}

describe('captureDescriptor', () => {
  it('captures the root box dimensions', () => {
    const root = mount('<div style="width:200px;height:80px"></div>')
    const d = captureDescriptor(root)
    expect(d.width).toBeCloseTo(300, 0)
    expect(d.primitives.length).toBeGreaterThan(0)
  })

  it('emits a media primitive for an image', () => {
    const root = mount('<img style="width:64px;height:64px;border-radius:8px" />')
    const d = captureDescriptor(root)
    const media = d.primitives.find((p) => p.type === 'media')
    expect(media).toBeTruthy()
    expect(media!.w).toBeCloseTo(64, 0)
    expect(media!.radius).toBeCloseTo(8, 0)
  })

  it('emits per-line text bars for wrapping text', () => {
    const root = mount(
      '<p style="margin:0;width:120px">one two three four five six seven eight nine ten</p>',
    )
    const d = captureDescriptor(root)
    const textBars = d.primitives.filter((p) => p.type === 'text')
    // Narrow column forces multiple visual lines -> multiple bars.
    expect(textBars.length).toBeGreaterThan(1)
  })
})
