import { ORDERS, type Order } from '@pompeitech/mock-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@pompeitech/vesuvius-ui'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { EmptyTab } from '../_shared/empty-tab'
import { AddressCard } from './components/address-card'
import { CustomerCard } from './components/customer-card'
import { DetailHeader } from './components/detail-header'
import { ItemsCard } from './components/items-card'
import { PaymentCard } from './components/payment-card'
import { SummaryCard } from './components/summary-card'

export async function loader({ params }: LoaderFunctionArgs) {
  const order = ORDERS.find(o => o.id === params.id)
  if (!order) {
    throw new Response('Order not found', { status: 404 })
  }
  return order
}

export function Component() {
  const order = useLoaderData() as Order

  return (
    <div className="flex flex-col gap-6">
      <DetailHeader order={order} />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-6 lg:col-span-2">
              <ItemsCard order={order} />
              <AddressCard title="Shipping address" address={order.shippingAddress} />
            </div>

            <div className="flex flex-col gap-6">
              <CustomerCard order={order} />
              <PaymentCard order={order} />
              <SummaryCard order={order} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <EmptyTab
            title="No activity yet"
            description="Status changes and notes for this order will show up here."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
