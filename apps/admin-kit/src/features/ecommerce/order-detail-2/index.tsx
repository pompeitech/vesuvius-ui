import { ORDERS, type Order, type OrderLineItem } from '@pompeitech/mock-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@pompeitech/vesuvius-ui'
import { useState } from 'react'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { EmptyTab } from '../_shared/empty-tab'
import { DetailHeader } from './components/detail-header'
import { ItemLineup } from './components/item-lineup'
import { PreviewPanel } from './components/preview-panel'
import { StatCards } from './components/stat-cards'

export async function loader({ params }: LoaderFunctionArgs) {
  const order = ORDERS.find(o => o.id === params.id)
  if (!order) {
    throw new Response('Order not found', { status: 404 })
  }
  return order
}

export function Component() {
  const order = useLoaderData() as Order
  const [focused, setFocused] = useState<OrderLineItem | undefined>(order.items[0])

  return (
    <div className="flex flex-col gap-6">
      <DetailHeader order={order} />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
            <PreviewPanel order={order} focused={focused} />

            <div className="flex flex-col gap-6">
              <StatCards
                itemCount={order.itemCount}
                subtotal={order.subtotal}
                total={order.total}
              />
              <ItemLineup items={order.items} focusedId={focused?.productId} onFocus={setFocused} />
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
