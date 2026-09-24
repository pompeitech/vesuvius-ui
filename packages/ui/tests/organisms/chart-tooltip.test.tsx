import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ChartContainer } from '@ui/organisms/charts/chart-container'
import { ChartTooltipContent } from '@ui/organisms/charts/chart-tooltip'

// ChartTooltipContent only needs the ChartContainer's config context — it
// doesn't need a real chart underneath, so `active`/`payload` (normally
// supplied by Recharts on hover) can be passed directly to test its
// rendering logic without simulating a pointer hover over an SVG chart.
describe('ChartTooltipContent', () => {
  test('renders nothing when inactive or empty', () => {
    const { rerender } = render(
      <ChartContainer config={{ desktop: { label: 'Desktop' } }}>
        <ChartTooltipContent
          active={false}
          payload={[{ dataKey: 'desktop', value: 42, graphicalItemId: 'bar-desktop' }]}
        />
      </ChartContainer>
    )
    expect(document.querySelector('.grid')).not.toBeInTheDocument()

    rerender(
      <ChartContainer config={{ desktop: { label: 'Desktop' } }}>
        <ChartTooltipContent active payload={[]} />
      </ChartContainer>
    )
    expect(document.querySelector('.grid')).not.toBeInTheDocument()
  })

  test('resolves the configured series label and formats the value', () => {
    render(
      <ChartContainer config={{ desktop: { label: 'Desktop sales' } }}>
        <ChartTooltipContent
          active
          label="Jan"
          payload={[
            {
              dataKey: 'desktop',
              name: 'desktop',
              value: 1234,
              color: '#111827',
              graphicalItemId: 'bar-desktop'
            }
          ]}
          valueFormatter={value => `$${value}`}
        />
      </ChartContainer>
    )
    expect(screen.getByText('Jan')).toBeVisible()
    expect(screen.getByText('Desktop sales')).toBeVisible()
    expect(screen.getByText('$1234')).toBeVisible()
  })
})
