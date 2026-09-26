import {
  getEcommerceDashboardStats,
  getOrders,
  type EcommerceDashboardStats,
  type Order
} from '@pompeitech/mock-data'
import { useLoaderData } from 'react-router'
import { KpiStatCards } from '../_shared/kpi-stat-cards'
import { WelcomeHeader } from '../_shared/welcome-header'
import { RecentOrdersCard } from './components/recent-orders-card'
import { RevenueChannelChartCards } from './components/revenue-channel-chart-cards'

export async function loader() {
  const [stats, ordersResult] = await Promise.all([
    getEcommerceDashboardStats(),
    getOrders({ page: 1, pageSize: 20, sortBy: 'createdAt', sortDirection: 'desc' })
  ])
  return { stats, orders: ordersResult.data }
}

export function Component() {
  const { stats, orders } = useLoaderData() as { stats: EcommerceDashboardStats; orders: Order[] }
  // `revenueByMonth` is a fixed Jan-Dec calendar array, so a plain `slice(-6)` always
  // grabs Jul-Dec — once the current month is past June that includes future months,
  // whose `thisYear` is always 0 and drew as a sharp drop-to-zero in the chart. Slicing
  // up to the current month first keeps this a real trailing window of elapsed months.
  const last6Months = stats.revenueByMonth.slice(0, new Date().getMonth() + 1).slice(-6)

  return (
    <div className="flex flex-col gap-6">
      <WelcomeHeader stats={stats} />
      <KpiStatCards stats={stats} />
      <RevenueChannelChartCards last6Months={last6Months} stats={stats} />
      <RecentOrdersCard orders={orders} />
    </div>
  )
}
