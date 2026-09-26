import type { OperationalDashboardStats } from '@pompeitech/mock-data'
import { StatCard } from '@pompeitech/vesuvius-ui'
import {
  DollarSignIcon,
  EyeIcon,
  PercentIcon,
  RotateCcwIcon,
  ShoppingCartIcon,
  TimerIcon
} from 'lucide-react'
import { compactCurrency } from './format'

/**
 * The six operational KPIs — revenue, fulfillment, orders, conversion,
 * returns, page views — shared between dashboard-5 and dashboard-6.
 */
export function OperationsStatCards({ operations }: { operations: OperationalDashboardStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard
        label="Total Revenue"
        value={compactCurrency.format(operations.totalRevenue)}
        icon={DollarSignIcon}
        changePct={operations.totalRevenueChangePct}
      />
      <StatCard
        label="Avg. Fulfillment"
        value={`${operations.avgFulfillmentDays} days`}
        icon={TimerIcon}
        changePct={operations.avgFulfillmentDaysChangePct}
      />
      <StatCard
        label="Orders"
        value={operations.totalOrders.toLocaleString()}
        icon={ShoppingCartIcon}
        changePct={operations.totalOrdersChangePct}
      />
      <StatCard
        label="Conversion Rate"
        value={`${operations.conversionRate}%`}
        icon={PercentIcon}
        changePct={operations.conversionRateChangePct}
      />
      <StatCard
        label="Return Rate"
        value={`${operations.returnRate}%`}
        icon={RotateCcwIcon}
        changePct={operations.returnRateChangePct}
        changeLabel="vs last month (lower is better)"
      />
      <StatCard
        label="Page Views"
        value={operations.pageViews}
        icon={EyeIcon}
        changePct={operations.pageViewsChangePct}
      />
    </div>
  )
}
