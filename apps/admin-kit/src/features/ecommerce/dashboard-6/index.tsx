import { Typography } from '@pompeitech/vesuvius-ui'
import {
  getEcommerceDashboardStats,
  getOperationalDashboardStats,
  getOrders,
  type EcommerceDashboardStats,
  type OperationalDashboardStats,
  type Order
} from '@pompeitech/mock-data'
import { useLoaderData } from 'react-router'
import { CategoryPerformanceCard } from '../_shared/category-performance-card'
import { FulfillmentTableCard } from '../_shared/fulfillment-table-card'
import { OperationsStatCards } from '../_shared/operations-stat-cards'
import { RevenueLineChartCard } from '../_shared/revenue-line-chart-card'
import { RecentOrdersCard } from './components/recent-orders-card'

export async function loader() {
  const [ecommerce, operations, ordersResult] = await Promise.all([
    getEcommerceDashboardStats(),
    getOperationalDashboardStats(),
    getOrders({ page: 1, pageSize: 20, sortBy: 'createdAt', sortDirection: 'desc' })
  ])
  return { ecommerce, operations, orders: ordersResult.data }
}

export function Component() {
  const { ecommerce, operations, orders } = useLoaderData() as {
    ecommerce: EcommerceDashboardStats
    operations: OperationalDashboardStats
    orders: Order[]
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
          Fulfillment, conversion, category performance, and every recent order.
        </Typography>
      </div>

      <RevenueLineChartCard last6Months={last6Months} />
      <OperationsStatCards operations={operations} />
      <CategoryPerformanceCard operations={operations} />
      <FulfillmentTableCard operations={operations} />
      <RecentOrdersCard orders={orders} />
    </div>
  )
}
