import { ChartCard, SimpleLineChart } from '@pompeitech/vesuvius-ui'
import type { EcommerceDashboardStats } from '@pompeitech/mock-data'
import { compactCurrency } from '../../_shared/format'

/** Trailing 6-month revenue line, this year vs. last. */
export function RevenueChartCard({
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
        className="h-64"
      />
    </ChartCard>
  )
}
