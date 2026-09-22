import { render, screen } from '@testing-library/react'
import { DollarSignIcon } from 'lucide-react'
import { describe, expect, test } from 'vitest'
import { ChartCard } from '@ui/molecules/chart-card'

describe('chart card', () => {
  test('renders label, value, trend, caption and children', () => {
    render(
      <ChartCard
        icon={DollarSignIcon}
        label="Total Revenue"
        value="$276,000.00"
        changePct={12}
        changeLabel="vs last month"
        caption="Last 6 Months"
      >
        <div data-testid="chart-slot">chart</div>
      </ChartCard>
    )
    expect(screen.getByText('Total Revenue')).toBeVisible()
    expect(screen.getByText('$276,000.00')).toBeVisible()
    expect(screen.getByText(/12%/)).toBeVisible()
    expect(screen.getByText('Last 6 Months')).toBeVisible()
    expect(screen.getByTestId('chart-slot')).toBeVisible()
  })
})
