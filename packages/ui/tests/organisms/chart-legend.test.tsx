import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ChartContainer } from '@ui/organisms/charts/chart-container'
import { ChartLegendContent } from '@ui/organisms/charts/chart-legend'

// Same rationale as chart-tooltip.test.tsx: Recharts normally supplies
// `payload` at render time (legends aren't hover-gated like tooltips are),
// so passing it directly tests the same rendering logic without needing a
// full chart underneath.
describe('ChartLegendContent', () => {
  test('renders nothing without a payload', () => {
    render(
      <ChartContainer config={{ desktop: { label: 'Desktop' } }}>
        <ChartLegendContent payload={[]} />
      </ChartContainer>
    )
    expect(screen.queryByText('Desktop')).not.toBeInTheDocument()
  })

  test('resolves each entry label from the chart config and shows a color swatch', () => {
    render(
      <ChartContainer
        config={{ desktop: { label: 'Desktop', color: '#111827' }, mobile: { label: 'Mobile' } }}
      >
        <ChartLegendContent
          payload={[
            { value: 'desktop', dataKey: 'desktop', color: '#111827' },
            { value: 'mobile', dataKey: 'mobile', color: '#f97316' }
          ]}
        />
      </ChartContainer>
    )
    expect(screen.getByText('Desktop')).toBeVisible()
    expect(screen.getByText('Mobile')).toBeVisible()
  })

  test('hides the color swatch when hideIcon is set', () => {
    const { container } = render(
      <ChartContainer config={{ desktop: { label: 'Desktop' } }}>
        <ChartLegendContent hideIcon payload={[{ value: 'desktop', dataKey: 'desktop' }]} />
      </ChartContainer>
    )
    expect(container.querySelector('.rounded-\\[2px\\]')).not.toBeInTheDocument()
  })
})
