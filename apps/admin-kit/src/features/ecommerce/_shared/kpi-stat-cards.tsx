import type { EcommerceDashboardStats } from '@pompeitech/mock-data'
import { StatCard } from '@pompeitech/vesuvius-ui'
import { DollarSignIcon, RotateCcwIcon, TruckIcon, UserPlusIcon } from 'lucide-react'
import { currency } from './format'

/**
 * The four headline KPIs every ecommerce dashboard variant opens with:
 * monthly revenue, orders fulfilled, new customers, refunds issued.
 * Shared because dashboard-1/2/3 all render this exact block.
 */
export function KpiStatCards({ stats }: { stats: EcommerceDashboardStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Monthly Revenue"
        value={currency.format(stats.monthlyRevenue)}
        icon={DollarSignIcon}
        changePct={stats.monthlyRevenueChangePct}
      />
      <StatCard
        label="Orders Fulfilled"
        value={stats.ordersFulfilled.toLocaleString()}
        icon={TruckIcon}
        changePct={stats.ordersFulfilledChangePct}
      />
      <StatCard
        label="New Customers"
        value={stats.newCustomers.toLocaleString()}
        icon={UserPlusIcon}
        changePct={stats.newCustomersChangePct}
      />
      <StatCard
        label="Refunds Issued"
        value={currency.format(stats.refundsIssued)}
        icon={RotateCcwIcon}
        changePct={stats.refundsIssuedChangePct}
        changeLabel="vs last month (lower is better)"
      />
    </div>
  )
}
