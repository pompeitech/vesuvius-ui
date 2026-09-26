import type { EcommerceDashboardStats } from '@pompeitech/mock-data'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DEFAULT_CHART_COLORS,
  RadialProgressChart,
  Sparkline,
  StatCard
} from '@pompeitech/vesuvius-ui'
import { CreditCardIcon, ShapesIcon, TruckIcon } from 'lucide-react'
import { currency } from '../../_shared/format'

/** Average order value + average sales sparklines, plus the product-category mix. */
export function OrderValueCards({ stats }: { stats: EcommerceDashboardStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <StatCard
        label="Average Order Value"
        value={currency.format(stats.avgOrderValue)}
        icon={CreditCardIcon}
        changePct={stats.avgOrderValueChangePct}
        trend={<Sparkline data={stats.avgOrderValueTrend} filled />}
      />
      <StatCard
        label="Average Sales"
        value={stats.avgSales.toLocaleString()}
        icon={TruckIcon}
        changePct={stats.avgSalesChangePct}
        changeLabel="orders in the last 28 days"
        trend={<Sparkline data={stats.avgSalesTrend} filled />}
      />
      <Card>
        <CardHeader className="flex flex-row items-center gap-2.5 space-y-0">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted/40">
            <ShapesIcon className="size-4 text-muted-foreground" aria-hidden="true" />
          </span>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Product Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadialProgressChart
            data={stats.productCategories.map((c, i) => ({
              label: c.category,
              value: c.value,
              color: DEFAULT_CHART_COLORS[i % DEFAULT_CHART_COLORS.length]
            }))}
            totalLabel={stats.productCategories[0]?.category ?? 'Total'}
            valueFormatter={v => `${v}%`}
            size={128}
          />
        </CardContent>
      </Card>
    </div>
  )
}
