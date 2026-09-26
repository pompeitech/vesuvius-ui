import type { EcommerceDashboardStats } from '@pompeitech/mock-data'
import { Button, Typography } from '@pompeitech/vesuvius-ui'
import { DownloadIcon, PlusIcon } from 'lucide-react'
import { CURRENT_USER } from '../../../lib/current-user'

/**
 * Greeting + today's fulfillment/returns summary, plus the Export/Add Product
 * actions — the exact header dashboard-2 and dashboard-3 both open with.
 */
export function WelcomeHeader({ stats }: { stats: EcommerceDashboardStats }) {
  const adminFirstName = CURRENT_USER.name.split(' ')[0]

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Typography as="h1" variant="h3">
          Welcome Back, {adminFirstName}!
        </Typography>
        <Typography variant="muted">
          Today you have{' '}
          <span className="font-medium text-foreground">{stats.ordersToFulfill} orders</span> to
          fulfill,{' '}
          <span className="font-medium text-foreground">{stats.returnsPending} returns</span>{' '}
          pending
        </Typography>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <DownloadIcon />
          Export
        </Button>
        <Button>
          <PlusIcon />
          Add Product
        </Button>
      </div>
    </div>
  )
}
