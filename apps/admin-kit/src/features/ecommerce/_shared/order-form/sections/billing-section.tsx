import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { AddressFields } from './address-fields'

export function BillingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing address</CardTitle>
      </CardHeader>
      <CardContent>
        <AddressFields prefix="billingAddress" />
      </CardContent>
    </Card>
  )
}
