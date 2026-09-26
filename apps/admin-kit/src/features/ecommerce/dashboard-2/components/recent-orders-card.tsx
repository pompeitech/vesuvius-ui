import type { Order, OrderStatus } from '@pompeitech/mock-data'
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DataTable,
  DataTableColumnHeader,
  UserAvatar,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import { currency, dateFormatter, ORDER_STATUS_VARIANT } from '../../_shared/format'

const columns: DataTableColumnDef<Order>[] = [
  {
    id: 'index',
    header: '#',
    cell: ({ row }) => <span className="text-muted-foreground">{row.index + 1}</span>,
    size: 40
  },
  {
    accessorKey: 'orderNumber',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Order" />,
    cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>
  },
  {
    accessorKey: 'customerName',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Customer" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <UserAvatar
          name={row.original.customerName}
          src={row.original.customerAvatarUrl}
          size="sm"
        />
        <span className="truncate">{row.original.customerName}</span>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
    cell: ({ getValue }) => {
      const status = getValue<OrderStatus>()
      return <Badge variant={ORDER_STATUS_VARIANT[status]}>{status}</Badge>
    }
  },
  {
    accessorKey: 'itemCount',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Items" />,
    cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span>,
    size: 80
  },
  {
    accessorKey: 'channel',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Channel" />,
    cell: ({ getValue }) => (
      <Badge variant="outline" className="capitalize">
        {getValue<string>().replace('_', ' ')}
      </Badge>
    )
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Payment" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground capitalize">
        {getValue<string>().replace('_', ' ')}
      </span>
    )
  },
  {
    accessorKey: 'total',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Total" />,
    cell: ({ getValue }) => (
      <span className="tabular-nums">{currency.format(getValue<number>())}</span>
    )
  },
  {
    accessorKey: 'createdAt',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Date" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">
        {dateFormatter.format(new Date(getValue<string>()))}
      </span>
    )
  }
]

/** The full DataTable variant of recent orders (sortable/paginated), unlike dashboard-1's plain table. */
export function RecentOrdersCard({ orders }: { orders: Order[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Recent Orders{' '}
          <span className="ml-1 font-normal text-muted-foreground">{orders.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={orders} toolbar={() => null} />
      </CardContent>
    </Card>
  )
}
