import { CUSTOMERS } from '@pompeitech/mock-data'
import { toast } from '@pompeitech/vesuvius-ui'
import { useNavigate } from 'react-router'
import { ORDER_FORM_DEFAULT_VALUES, OrderForm } from '../_shared/order-form'

export function Component() {
  const navigate = useNavigate()

  return (
    <OrderForm
      mode="add"
      defaultValues={ORDER_FORM_DEFAULT_VALUES}
      onSaved={values => {
        // No write API on top of the static mock catalog (see packages/mock-data)
        // — this simulates a save and returns to the list, same as Add Product.
        const customer = CUSTOMERS.find(c => c.id === values.customerId)
        toast.success(`Order created for ${customer?.name ?? 'customer'}.`)
        navigate('/ecommerce/order-list-1')
      }}
    />
  )
}
