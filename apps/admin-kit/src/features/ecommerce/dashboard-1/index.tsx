import { getEcommerceDashboardStats, type EcommerceDashboardStats } from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useLoaderData } from 'react-router'
import { KpiStatCards } from '../_shared/kpi-stat-cards'
import { LowStockCard } from './components/low-stock-card'
import { OrderValueCards } from './components/order-value-cards'
import { RecentOrdersCard } from './components/recent-orders-card'
import { RevenueChannelCards } from './components/revenue-channel-cards'

export async function loader() {
  return getEcommerceDashboardStats()
}

export function Component() {
  const stats = useLoaderData() as EcommerceDashboardStats

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Dashboard
        </Typography>
        <Typography variant="muted">Overview of your store's performance this month.</Typography>
      </div>

      <KpiStatCards stats={stats} />
      <RevenueChannelCards stats={stats} />
      <OrderValueCards stats={stats} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RecentOrdersCard stats={stats} />
        <LowStockCard stats={stats} />
      </div>
    </div>
  )
}
