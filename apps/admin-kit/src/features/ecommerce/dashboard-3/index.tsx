import { getEcommerceDashboardStats, type EcommerceDashboardStats } from '@pompeitech/mock-data'
import { useLoaderData } from 'react-router'
import { KpiStatCards } from '../_shared/kpi-stat-cards'
import { WelcomeHeader } from '../_shared/welcome-header'
import { OrderStatusCards } from './components/order-status-cards'
import { RecentActivityCard } from './components/recent-activity-card'
import { RecentTransactionsCard } from './components/recent-transactions-card'
import { RevenueChartCard } from './components/revenue-chart-card'

export async function loader() {
  return getEcommerceDashboardStats()
}

export function Component() {
  const stats = useLoaderData() as EcommerceDashboardStats
  // `revenueByMonth` is a fixed Jan-Dec calendar array, so a plain `slice(-6)` always
  // grabs Jul-Dec — once the current month is past June that includes future months,
  // whose `thisYear` is always 0 and drew as a sharp drop-to-zero in the chart. Slicing
  // up to the current month first keeps this a real trailing window of elapsed months.
  const last6Months = stats.revenueByMonth.slice(0, new Date().getMonth() + 1).slice(-6)

  return (
    <div className="flex flex-col gap-6">
      <WelcomeHeader stats={stats} />
      <KpiStatCards stats={stats} />
      <RevenueChartCard last6Months={last6Months} />
      <OrderStatusCards stats={stats} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RecentTransactionsCard stats={stats} />
        <RecentActivityCard stats={stats} />
      </div>
    </div>
  )
}
