import type { EcommerceDashboardStats } from '@pompeitech/mock-data'
import { ChartCard, SimpleLineChart } from '@pompeitech/vesuvius-ui'
import { compactCurrency } from './format'

/**
 * Trailing 6-month revenue line, this year vs. last — shared because
 * dashboard-5 and dashboard-6 both open with this exact card.
 */
export function RevenueLineChartCard({
  last6Months
}: {
  last6Months: EcommerceDashboardStats['revenueByMonth']
}) {
  return (
    <ChartCard
      label="Total Revenue"
      value={compactCurrency.format(last6Months.reduce((s, m) => s + m.thisYear, 0))}
      caption="Total Revenue (Last 6 Months)"
    >
      <SimpleLineChart
        data={last6Months}
        index="month"
        categories={['thisYear', 'prevYear']}
        colors={['var(--chart-1)', 'var(--muted-foreground)']}
        className="h-56"
      />
    </ChartCard>
  )
}
