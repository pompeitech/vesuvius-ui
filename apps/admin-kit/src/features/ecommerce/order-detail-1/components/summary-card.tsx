import type { Order } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, Separator } from '@pompeitech/vesuvius-ui'
import { currency } from '../../_shared/format'

/** Subtotal → shipping → tax → discount → total, the same breakdown the Order Form computes live. */
export function SummaryCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="tabular-nums">{currency.format(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="tabular-nums">{currency.format(order.shippingCost)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Tax</dt>
            <dd className="tabular-nums">{currency.format(order.tax)}</dd>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount</dt>
              <dd className="tabular-nums">-{currency.format(order.discount)}</dd>
            </div>
          )}
          <Separator className="my-1" />
          <div className="flex justify-between">
            <dt className="text-base font-semibold">Total</dt>
            <dd className="text-base font-semibold tabular-nums">{currency.format(order.total)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
