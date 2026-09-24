import { vi } from 'vitest'

// vitest.setup.ts stubs every HTMLElement's getBoundingClientRect to a fixed
// 1024x768 so Recharts' ResponsiveContainer has a non-zero box to measure.
// Recharts also measures its Legend's content div the same way to reserve
// space for it — with the blanket stub that comes back as 768px tall, which
// leaves zero height for the actual plot area (no bars/lines/radar shapes
// render, only the legend and axis). Scope a smaller, realistic height to
// just the legend content so the rest of the chart gets real space back.
export function mockChartLegendHeight() {
  const original = HTMLElement.prototype.getBoundingClientRect
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement
  ) {
    if (this.closest('.recharts-legend-wrapper')) {
      return {
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 1024,
        bottom: 24,
        width: 1024,
        height: 24,
        toJSON: () => ({})
      } as DOMRect
    }
    return original.call(this)
  })
}
