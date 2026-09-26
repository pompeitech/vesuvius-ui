import type { ChannelSalesStats } from '@pompeitech/mock-data'
import { ChartCard, SimpleBarChart, Sparkline, StatCard } from '@pompeitech/vesuvius-ui'
import { compactCurrency } from '../format'

/** Revenue-vs-expenses bar chart, plus sales pipeline / total sales sparklines beside it. */
export function RevenuePipelineCards({ stats }: { stats: ChannelSalesStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ChartCard
        className="lg:col-span-2"
        label="Revenue"
        value={compactCurrency.format(stats.revenueByWeekday.reduce((s, d) => s + d.revenue, 0))}
        caption="Revenue vs. Expenses, by weekday"
      >
        <SimpleBarChart
          data={stats.revenueByWeekday}
          index="day"
          categories={['revenue', 'expenses']}
          colors={['var(--chart-1)', 'var(--muted-foreground)']}
          className="h-64"
        />
      </ChartCard>

      <div className="flex flex-col gap-4">
        <StatCard
          label="Sales Pipeline"
          value={stats.salesPipelineTotal.toLocaleString()}
          changeLabel="total orders"
          trend={<Sparkline data={stats.salesPipelineTrend} filled />}
        />
        <StatCard
          label="Total Sales"
          value={compactCurrency.format(stats.totalSalesValue)}
          changeLabel="total sales"
          trend={<Sparkline data={stats.totalSalesTrend} filled />}
        />
      </div>
    </div>
  )
}
