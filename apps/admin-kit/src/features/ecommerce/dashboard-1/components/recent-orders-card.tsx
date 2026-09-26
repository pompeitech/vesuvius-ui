import type { EcommerceDashboardStats } from '@pompeitech/mock-data'
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  UserAvatar
} from '@pompeitech/vesuvius-ui'
import { currency, ORDER_STATUS_VARIANT } from '../../_shared/format'

/** A plain (non-DataTable) recent-orders table — no sorting/filtering, just the latest rows. */
export function RecentOrdersCard({ stats }: { stats: EcommerceDashboardStats }) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.recentOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UserAvatar name={order.customerName} src={order.customerAvatarUrl} size="sm" />
                    <span className="truncate">{order.customerName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{order.orderNumber}</TableCell>
                <TableCell>
                  <Badge variant={ORDER_STATUS_VARIANT[order.status]}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {currency.format(order.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
