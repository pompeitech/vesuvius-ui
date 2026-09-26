import { getOrders, type Order } from '@pompeitech/mock-data'
import { Button, DataTable, Typography } from '@pompeitech/vesuvius-ui'
import { PlusIcon } from 'lucide-react'
import { useMemo } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { buildOrderColumns } from './components/columns'
import { OrdersTableToolbar } from './components/table-toolbar'

// The full order history (900 rows) — fetched once and handed to DataTable
// for client-side search/sort/filter/pagination, same pattern as Product
// List 1's fixed catalog.
export async function loader() {
  const result = await getOrders({ pageSize: 1000 })
  return result.data
}

export function Component() {
  const orders = useLoaderData() as Order[]
  const navigate = useNavigate()

  const columns = useMemo(
    () =>
      buildOrderColumns({
        onView: order => navigate(`/ecommerce/order-detail-1/${order.id}`),
        onEdit: order => navigate(`/ecommerce/edit-order/${order.id}`)
      }),
    [navigate]
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Orders
          </Typography>
          <Typography variant="muted">
            Every order across every channel, most recent first.
          </Typography>
        </div>
        <Button onClick={() => navigate('/ecommerce/add-order')}>
          <PlusIcon />
          Add Order
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        getRowId={row => row.id}
        defaultSorting={[{ id: 'createdAt', desc: true }]}
        searchPlaceholder="Search orders..."
        toolbar={ctx => <OrdersTableToolbar {...ctx} />}
      />
    </div>
  )
}
