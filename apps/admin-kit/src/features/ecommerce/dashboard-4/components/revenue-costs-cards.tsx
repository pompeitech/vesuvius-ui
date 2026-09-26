import type { FinanceDashboardStats } from '@pompeitech/mock-data'
import { ChartCard, SimpleAreaChart, SimpleBarChart } from '@pompeitech/vesuvius-ui'
import { compactCurrency } from '../format'

/** Revenue trend area chart next to the stacked costs breakdown bar chart. */
export function RevenueCostsCards({ stats }: { stats: FinanceDashboardStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ChartCard
        label="Revenue Overview"
        value={compactCurrency.format(stats.revenueOverview)}
        changePct={stats.revenueOverviewChangePct}
      >
        <SimpleAreaChart
          data={stats.revenueByMonth}
          index="month"
          categories={['revenue']}
          colors={['var(--chart-1)']}
          showLegend={false}
          className="h-64"
        />
      </ChartCard>

      <ChartCard
        label="Costs Breakdown"
        value={compactCurrency.format(stats.costsBreakdown)}
        changePct={stats.costsBreakdownChangePct}
      >
        <SimpleBarChart
          data={stats.costsByMonth}
          index="month"
          categories={['cogs', 'operatingExpenses']}
          colors={['var(--foreground)', 'var(--muted-foreground)']}
          stacked
          className="h-64"
        />
      </ChartCard>
    </div>
  )
}
