import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DataTable,
  DataTableColumnHeader,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import type { EcommerceDashboardStats, Order, OrderStatus } from '@pompeitech/mock-data'
import { currency, dateFormatter, ORDER_STATUS_VARIANT } from '../../_shared/format'

const transactionColumns: DataTableColumnDef<Order>[] = [
  {
    accessorKey: 'orderNumber',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Order Ref" />,
    cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>
  },
  {
    accessorKey: 'customerName',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Buyer" />
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
    accessorKey: 'total',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Total" />,
    cell: ({ getValue }) => (
      <span className="tabular-nums">{currency.format(getValue<number>())}</span>
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
    accessorKey: 'createdAt',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Date" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">
        {dateFormatter.format(new Date(getValue<string>()))}
      </span>
    )
  }
]

/** The 6-row recent transactions table, spanning 2/3 of its grid row. */
export function RecentTransactionsCard({ stats }: { stats: EcommerceDashboardStats }) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={transactionColumns}
          data={stats.recentOrders}
          toolbar={() => null}
          defaultPagination={{ pageIndex: 0, pageSize: 6 }}
        />
      </CardContent>
    </Card>
  )
}
