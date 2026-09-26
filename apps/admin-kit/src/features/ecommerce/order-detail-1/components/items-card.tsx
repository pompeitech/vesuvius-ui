import type { Order } from '@pompeitech/mock-data'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@pompeitech/vesuvius-ui'
import { currency } from '../../_shared/format'

/** Every line item on the order: image, product, quantity, unit price, and line total. */
export function ItemsCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Unit price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map(item => (
              <TableRow key={item.productId}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="size-9 shrink-0 rounded-md border object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{item.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{item.sku}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums">{item.quantity}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {currency.format(item.unitPrice)}
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  {currency.format(item.lineTotal)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
