import { CUSTOMERS, type Order } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, UserAvatar } from '@pompeitech/vesuvius-ui'
import { InfoField } from '../../_shared/info-field'
import { currency } from '../../_shared/format'

/** Customer identity, cross-referenced against the customer list for email/lifetime stats. */
export function CustomerCard({ order }: { order: Order }) {
  const customer = CUSTOMERS.find(c => c.id === order.customerId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <UserAvatar name={order.customerName} src={order.customerAvatarUrl} />
          <div className="min-w-0">
            <p className="truncate font-medium">{order.customerName}</p>
            {customer && <p className="truncate text-sm text-muted-foreground">{customer.email}</p>}
          </div>
        </div>
        {customer && (
          <div className="grid grid-cols-2 gap-4">
            <InfoField label="Lifetime orders">{customer.totalOrders}</InfoField>
            <InfoField label="Lifetime spent">{currency.format(customer.totalSpent)}</InfoField>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
