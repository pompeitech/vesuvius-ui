import type { EcommerceDashboardStats } from '@pompeitech/mock-data'
import { ChartCard, SimpleBarChart } from '@pompeitech/vesuvius-ui'
import { DollarSignIcon, UsersIcon } from 'lucide-react'
import { CHANNEL_COLORS, compactCurrency } from '../../_shared/format'

/** Yearly revenue bar chart next to a per-channel revenue breakdown. */
export function RevenueChannelCards({ stats }: { stats: EcommerceDashboardStats }) {
  const totalChannelRevenue = stats.revenueByChannel.reduce((s, c) => s + c.value, 0)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ChartCard
        className="lg:col-span-2"
        icon={DollarSignIcon}
        label="Total Revenue"
        value={compactCurrency.format(stats.totalRevenueThisYear)}
        caption="This year, vs. the same months last year"
      >
        <SimpleBarChart
          data={stats.revenueByMonth}
          index="month"
          categories={['thisYear', 'prevYear']}
          colors={['var(--chart-1)', 'var(--muted-foreground)']}
          className="h-72"
        />
      </ChartCard>

      <ChartCard
        icon={UsersIcon}
        label="Revenue by Channel"
        value={compactCurrency.format(totalChannelRevenue)}
        caption="All-time, by channel"
      >
        <ul className="flex flex-col gap-4">
          {stats.revenueByChannel.map((channel, i) => (
            <li key={channel.channel} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{channel.label}</span>
                <span className="text-muted-foreground tabular-nums">
                  {compactCurrency.format(channel.value)}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(channel.value / (totalChannelRevenue || 1)) * 100}%`,
                    backgroundColor: CHANNEL_COLORS[i % CHANNEL_COLORS.length]
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </ChartCard>
    </div>
  )
}
