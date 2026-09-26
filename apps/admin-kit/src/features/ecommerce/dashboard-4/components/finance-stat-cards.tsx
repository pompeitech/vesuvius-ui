import type { FinanceDashboardStats } from '@pompeitech/mock-data'
import { StatCard } from '@pompeitech/vesuvius-ui'
import { currency } from '../format'

/** Gross revenue, net profit, refund rate, and average transaction size. */
export function FinanceStatCards({ stats }: { stats: FinanceDashboardStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Gross Revenue"
        value={currency.format(stats.grossRevenue)}
        changePct={stats.grossRevenueChangePct}
      />
      <StatCard
        label="Net Profit"
        value={currency.format(stats.netProfit)}
        changePct={stats.netProfitChangePct}
      />
      <StatCard
        label="Refund Rate"
        value={`${stats.refundRate}%`}
        changePct={stats.refundRateChangePct}
        changeLabel="vs last year (lower is better)"
      />
      <StatCard
        label="Avg Transaction"
        value={currency.format(stats.avgTransaction)}
        changePct={stats.avgTransactionChangePct}
      />
    </div>
  )
}
