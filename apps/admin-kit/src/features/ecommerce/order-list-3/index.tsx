import { getOrders, type Order } from '@pompeitech/mock-data'
import { Badge, Button, Typography } from '@pompeitech/vesuvius-ui'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { FiltersSidebar } from './components/filters-sidebar'
import { OrderRow } from './components/order-row'
import type { SortOption, StatusFilter } from './types'

export async function loader() {
  const result = await getOrders({ pageSize: 1000 })
  return result.data
}

export function Component() {
  const orders = useLoaderData() as Order[]
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [sort, setSort] = useState<SortOption>('date-desc')

  const statusCounts = useMemo(
    () => ({
      all: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    }),
    [orders]
  )

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase()
    const rows = orders.filter(order => {
      if (status !== 'all' && order.status !== status) return false
      if (needle && !`${order.customerName} ${order.orderNumber}`.toLowerCase().includes(needle))
        return false
      return true
    })
    const sorted = [...rows]
    switch (sort) {
      case 'date-desc':
        return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      case 'date-asc':
        return sorted.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      case 'total-desc':
        return sorted.sort((a, b) => b.total - a.total)
      case 'total-asc':
        return sorted.sort((a, b) => a.total - b.total)
    }
  }, [orders, search, status, sort])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Order List 3
          </Typography>
          <Typography variant="muted">Sidebar-driven order filtering with dense rows.</Typography>
        </div>
        <Button onClick={() => navigate('/ecommerce/add-order')}>
          <PlusIcon />
          Add Order
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <FiltersSidebar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          statusCounts={statusCounts}
          sort={sort}
          onSortChange={setSort}
        />

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{filtered.length} orders</Badge>
          </div>
          <Typography variant="muted" className="mb-2">
            Showing the first 60 matches, most relevant first.
          </Typography>

          <div className="divide-y rounded-md border">
            {filtered.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">
                No orders match these filters.
              </p>
            ) : (
              filtered.slice(0, 60).map(order => <OrderRow key={order.id} order={order} />)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
