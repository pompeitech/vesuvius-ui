import type { ChannelSalesStats } from '@pompeitech/mock-data'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  HeatmapGrid,
  RadialProgressChart,
  SimpleRadarChart
} from '@pompeitech/vesuvius-ui'
import { ORDER_STATUS_COLOR } from '../format'

/** Three side-by-side cards: category radar, traffic-source heatmap, order-status radial. */
export function CategoryTrafficStatusCards({ stats }: { stats: ChannelSalesStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleRadarChart
            data={stats.salesByCategoryRadar}
            index="category"
            categories={['value']}
            showLegend={false}
            className="h-72"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <HeatmapGrid
            rows={stats.trafficHeatmap.rows}
            columns={stats.trafficHeatmap.columns}
            cells={stats.trafficHeatmap.cells}
            legend={[
              { label: 'Low', value: 0.2 },
              { label: 'Medium', value: 0.55 },
              { label: 'High', value: 1 }
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <RadialProgressChart
            total={stats.orderStatusTotal}
            totalLabel="Orders"
            data={stats.orderStatusBreakdown.map(s => ({
              label: s.label,
              value: s.count,
              color: ORDER_STATUS_COLOR[s.status]
            }))}
            showLegend={false}
            size={128}
          />
        </CardContent>
      </Card>
    </div>
  )
}
