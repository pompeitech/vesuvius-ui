import {
  getEcommerceDashboardStats,
  getOperationalDashboardStats,
  type EcommerceDashboardStats,
  type OperationalDashboardStats
} from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useLoaderData } from 'react-router'
import { CategoryPerformanceCard } from '../_shared/category-performance-card'
import { FulfillmentTableCard } from '../_shared/fulfillment-table-card'
import { OperationsStatCards } from '../_shared/operations-stat-cards'
import { RevenueLineChartCard } from '../_shared/revenue-line-chart-card'

export async function loader() {
  const [ecommerce, operations] = await Promise.all([
    getEcommerceDashboardStats(),
    getOperationalDashboardStats()
  ])
  return { ecommerce, operations }
}

export function Component() {
  const { ecommerce, operations } = useLoaderData() as {
    ecommerce: EcommerceDashboardStats
    operations: OperationalDashboardStats
  }
  // `revenueByMonth` is a fixed Jan-Dec calendar array, so a plain `slice(-6)` always
  // grabs Jul-Dec — once the current month is past June that includes future months,
  // whose `thisYear` is always 0 and drew as a sharp drop-to-zero in the chart. Slicing
  // up to the current month first keeps this a real trailing window of elapsed months.
  const last6Months = ecommerce.revenueByMonth.slice(0, new Date().getMonth() + 1).slice(-6)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Ecommerce App
        </Typography>
        <Typography variant="muted">
          Fulfillment, conversion, and category performance at a glance.
        </Typography>
      </div>

      <RevenueLineChartCard last6Months={last6Months} />
      <OperationsStatCards operations={operations} />
      <CategoryPerformanceCard operations={operations} />
      <FulfillmentTableCard operations={operations} />
    </div>
  )
}
