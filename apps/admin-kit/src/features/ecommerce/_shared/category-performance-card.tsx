import type { OperationalDashboardStats } from '@pompeitech/mock-data'
import { ChartCard, SimpleLineChart, ToggleGroup, ToggleGroupItem } from '@pompeitech/vesuvius-ui'

/**
 * Category performance line chart with a week/month toggle (visual only —
 * both use the same series today). Shared between dashboard-5 and dashboard-6.
 */
export function CategoryPerformanceCard({ operations }: { operations: OperationalDashboardStats }) {
  return (
    <ChartCard
      label="Category Performance"
      value={operations.categoryPerformanceTotal.toLocaleString()}
      action={
        <ToggleGroup type="single" defaultValue="week" variant="outline" size="sm">
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
      }
    >
      <SimpleLineChart
        data={operations.categoryPerformance}
        index="day"
        categories={['electronics', 'clothing', 'homeGarden', 'sports']}
        className="h-64"
      />
    </ChartCard>
  )
}
