import type { EcommerceDashboardStats } from '@pompeitech/mock-data'
import { ChartCard, SimpleAreaChart } from '@pompeitech/vesuvius-ui'
import { CreditCardIcon } from 'lucide-react'
import { Fragment } from 'react'
import { CHANNEL_COLORS, compactCurrency } from '../../_shared/format'

/** Revenue trend area chart next to a per-channel orders/change table. */
export function RevenueChannelChartCards({
  last6Months,
  stats
}: {
  last6Months: EcommerceDashboardStats['revenueByMonth']
  stats: EcommerceDashboardStats
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ChartCard
        className="lg:col-span-2"
        label="Total Revenue"
        value={compactCurrency.format(last6Months.reduce((s, m) => s + m.thisYear, 0))}
        caption="Total Revenue (Last 6 Months)"
      >
        <SimpleAreaChart
          data={last6Months}
          index="month"
          categories={['thisYear', 'prevYear']}
          colors={['var(--chart-1)', 'var(--muted-foreground)']}
          className="h-64"
        />
      </ChartCard>

      <ChartCard
        icon={CreditCardIcon}
        label="Revenue Channels"
        value={compactCurrency.format(stats.revenueByChannel.reduce((s, c) => s + c.value, 0))}
      >
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-3 text-sm">
          <span className="text-xs font-medium text-muted-foreground">Channels</span>
          <span className="text-xs font-medium text-muted-foreground">Orders</span>
          <span className="text-right text-xs font-medium text-muted-foreground">Change</span>
          {stats.revenueByChannel.map((channel, i) => (
            <Fragment key={channel.channel}>
              <span className="flex items-center gap-2 font-medium">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: CHANNEL_COLORS[i % CHANNEL_COLORS.length] }}
                />
                {channel.label}
              </span>
              <span className="tabular-nums text-muted-foreground">
                {channel.orderCount.toLocaleString()}
              </span>
              <span
                className={
                  channel.changePct >= 0
                    ? 'text-right tabular-nums text-success'
                    : 'text-right tabular-nums text-destructive'
                }
              >
                {channel.changePct >= 0 ? '+' : ''}
                {channel.changePct}%
              </span>
            </Fragment>
          ))}
        </div>
      </ChartCard>
    </div>
  )
}
