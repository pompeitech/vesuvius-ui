import { render, renderHook, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ChartContainer, useChart } from '@ui/organisms/charts/chart-container'

describe('ChartContainer', () => {
  test('renders its children inside a chart-slotted container', () => {
    render(
      <ChartContainer config={{ desktop: { label: 'Desktop', color: '#111827' } }}>
        <div data-testid="chart-child">chart</div>
      </ChartContainer>
    )
    expect(screen.getByTestId('chart-child')).toBeVisible()
    expect(document.querySelector('[data-slot="chart"]')).toHaveAttribute('data-chart')
  })

  test('emits a CSS variable per configured series color', () => {
    const { container } = render(
      <ChartContainer
        config={{ desktop: { label: 'Desktop', color: '#111827' }, mobile: { color: '#f97316' } }}
      >
        <div>chart</div>
      </ChartContainer>
    )
    const style = container.querySelector('style')?.textContent ?? ''
    expect(style).toContain('--color-desktop: #111827;')
    expect(style).toContain('--color-mobile: #f97316;')
  })

  test('useChart throws outside of a ChartContainer', () => {
    const { result } = renderHook(() => {
      try {
        return useChart()
      } catch (error) {
        return error
      }
    })
    expect(result.current).toBeInstanceOf(Error)
  })
})
