import type { EcommerceDashboardStats } from '@pompeitech/mock-data'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  RadialProgressChart
} from '@pompeitech/vesuvius-ui'
import { compactCurrency } from '../../_shared/format'
import { ORDER_STATUS_COLOR } from '../format'

/** Two radial breakdowns side by side: orders by status, and sales by category. */
export function OrderStatusCards({ stats }: { stats: EcommerceDashboardStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <RadialProgressChart
            total={stats.orderStatusTotal}
            totalLabel="Orders This Month"
            data={stats.orderStatusBreakdown.map(s => ({
              label: s.label,
              value: s.count,
              color: ORDER_STATUS_COLOR[s.status]
            }))}
            valueFormatter={v => v.toLocaleString()}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <RadialProgressChart
            total={stats.salesByCategory.reduce((s, c) => s + c.value, 0)}
            totalLabel="Total"
            data={stats.salesByCategory.map(c => ({ label: c.category, value: c.value }))}
            valueFormatter={v => compactCurrency.format(v)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
