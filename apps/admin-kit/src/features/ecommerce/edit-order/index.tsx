import { ORDERS, type Order } from '@pompeitech/mock-data'
import { toast } from '@pompeitech/vesuvius-ui'
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router'
import { orderToFormValues, OrderForm } from '../_shared/order-form'

export async function loader({ params }: LoaderFunctionArgs) {
  const order = ORDERS.find(o => o.id === params.id)
  if (!order) {
    throw new Response('Order not found', { status: 404 })
  }
  return order
}

export function Component() {
  const order = useLoaderData() as Order
  const navigate = useNavigate()

  return (
    <OrderForm
      key={order.id}
      mode="edit"
      defaultValues={orderToFormValues(order)}
      onSaved={() => {
        // No write API on top of the static mock catalog — see add-order.
        toast.success(`Order ${order.orderNumber} was updated.`)
        navigate('/ecommerce/order-list-1')
      }}
    />
  )
}
