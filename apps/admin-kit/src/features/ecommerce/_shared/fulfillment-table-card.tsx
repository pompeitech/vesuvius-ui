import type { OperationalDashboardStats } from '@pompeitech/mock-data'
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@pompeitech/vesuvius-ui'
import { dateFormatter, SHIPMENT_STATUS_LABEL, SHIPMENT_STATUS_VARIANT } from './format'

/** Per-order shipping status and delivery progress — shared between dashboard-5 and dashboard-6. */
export function FulfillmentTableCard({ operations }: { operations: OperationalDashboardStats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Fulfillment</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Shipped</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Del [%]</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operations.orderFulfillment.map(row => (
              <TableRow key={row.orderNumber}>
                <TableCell className="font-medium">{row.orderNumber}</TableCell>
                <TableCell className="text-muted-foreground">
                  {dateFormatter.format(new Date(row.shippedDate))}
                </TableCell>
                <TableCell>
                  <Badge variant={SHIPMENT_STATUS_VARIANT[row.status]}>
                    {SHIPMENT_STATUS_LABEL[row.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Progress value={row.deliveryPct} className="h-1.5 w-24" />
                    <span className="w-9 text-right text-sm tabular-nums text-muted-foreground">
                      {row.deliveryPct}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
