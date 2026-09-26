import { getOrders, type Order } from '@pompeitech/mock-data'
import { Button, Typography } from '@pompeitech/vesuvius-ui'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { FiltersBar } from './components/filters-bar'
import { OrderCard } from './components/order-card'
import type { ChannelFilter, StatusFilter } from './types'

// Same fixed 900-row order history as Order List 1, presented as
// customer-first cards instead of a data grid.
export async function loader() {
  const result = await getOrders({ pageSize: 1000 })
  return result.data
}

export function Component() {
  const orders = useLoaderData() as Order[]
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [channel, setChannel] = useState<ChannelFilter>('all')

  // Cards (unlike Order List 1's paginated DataTable) render everything at
  // once, so cap to the most recent 60 matches — plenty to browse, without
  // mounting all 900 rows' worth of cards.
  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase()
    return orders
      .filter(order => {
        if (status !== 'all' && order.status !== status) return false
        if (channel !== 'all' && order.channel !== channel) return false
        if (needle && !`${order.customerName} ${order.orderNumber}`.toLowerCase().includes(needle))
          return false
        return true
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 60)
  }, [orders, search, status, channel])

  const onView = (order: Order) => navigate(`/ecommerce/order-detail-1/${order.id}`)
  const onEdit = (order: Order) => navigate(`/ecommerce/edit-order/${order.id}`)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Order List 2
          </Typography>
          <Typography variant="muted">
            Customer-first order cards with item previews and payment status.
          </Typography>
        </div>
        <Button onClick={() => navigate('/ecommerce/add-order')}>
          <PlusIcon />
          Add Order
        </Button>
      </div>

      <FiltersBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        channel={channel}
        onChannelChange={setChannel}
      />

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No orders match these filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(order => (
            <OrderCard key={order.id} order={order} onEdit={onEdit} onView={onView} />
          ))}
        </div>
      )}
    </div>
  )
}
