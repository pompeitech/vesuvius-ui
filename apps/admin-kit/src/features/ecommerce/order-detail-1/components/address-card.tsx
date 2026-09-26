import type { Address } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'

/** Shipping or billing address — same shape, used for both cards. */
export function AddressCard({ title, address }: { title: string; address: Address }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0.5 text-sm">
        <p className="font-medium">{address.name}</p>
        <p className="text-muted-foreground">{address.line1}</p>
        {address.line2 && <p className="text-muted-foreground">{address.line2}</p>}
        <p className="text-muted-foreground">
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p className="text-muted-foreground">{address.country}</p>
        {address.phone && <p className="mt-1 text-muted-foreground">{address.phone}</p>}
      </CardContent>
    </Card>
  )
}
