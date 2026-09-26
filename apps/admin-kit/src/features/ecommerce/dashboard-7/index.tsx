import { getChannelSalesStats, type ChannelSalesStats } from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useLoaderData } from 'react-router'
import { CategoryTrafficStatusCards } from './components/category-traffic-status-cards'
import { ChannelStatCards } from './components/channel-stat-cards'
import { RecentInvoicesCard } from './components/recent-invoices-card'
import { RevenuePipelineCards } from './components/revenue-pipeline-cards'

export async function loader() {
  return getChannelSalesStats()
}

export function Component() {
  const stats = useLoaderData() as ChannelSalesStats

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Ecommerce App
        </Typography>
        <Typography variant="muted">
          Sales by channel, traffic, and every recent invoice.
        </Typography>
      </div>

      <ChannelStatCards stats={stats} />
      <RevenuePipelineCards stats={stats} />
      <CategoryTrafficStatusCards stats={stats} />
      <RecentInvoicesCard stats={stats} />
    </div>
  )
}
