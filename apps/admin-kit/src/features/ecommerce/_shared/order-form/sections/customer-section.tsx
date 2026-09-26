import { Field } from '@admin/form'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { ORDER_STATUS_OPTIONS } from '../../format'
import { CUSTOMER_OPTIONS } from '../schema'

export function CustomerSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field.Select
          name="customerId"
          label="Customer"
          placeholder="Select a customer"
          options={CUSTOMER_OPTIONS}
          required
        />
        <Field.Select name="status" label="Order status" options={ORDER_STATUS_OPTIONS} />
      </CardContent>
    </Card>
  )
}
