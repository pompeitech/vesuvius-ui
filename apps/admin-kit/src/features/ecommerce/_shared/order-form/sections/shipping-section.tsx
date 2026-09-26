import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { AddressFields } from './address-fields'

export function ShippingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping address</CardTitle>
      </CardHeader>
      <CardContent>
        <AddressFields prefix="shippingAddress" />
      </CardContent>
    </Card>
  )
}
