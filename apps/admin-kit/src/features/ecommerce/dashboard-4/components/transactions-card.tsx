import type { FinanceDashboardStats, Transaction } from '@pompeitech/mock-data'
import {
  Badge,
  ChartCard,
  DataTable,
  DataTableColumnHeader,
  UserAvatar,
  createColumnHelper
} from '@pompeitech/vesuvius-ui'
import { currency, dateFormatter, STATUS_VARIANT } from '../format'

const column = createColumnHelper<Transaction>()

const columns = [
  column.accessor('id', {
    header: ({ header }) => <DataTableColumnHeader header={header} title="Transaction ID" />,
    cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>
  }),
  column.accessor('customerName', {
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
  }),
  column.accessor('amount', {
    header: ({ header }) => <DataTableColumnHeader header={header} title="Amount" />,
    cell: ({ getValue }) => (
      <span className="tabular-nums">{currency.format(getValue())}</span>
    )
  }),
  column.accessor('type', {
    header: ({ header }) => <DataTableColumnHeader header={header} title="Type" />,
    cell: ({ getValue }) => <Badge variant="outline">{getValue()}</Badge>
  }),
  column.accessor('paymentMethod', {
    header: ({ header }) => <DataTableColumnHeader header={header} title="Payment Method" />,
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>
  }),
  column.accessor('date', {
    header: ({ header }) => <DataTableColumnHeader header={header} title="Date" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">
        {dateFormatter.format(new Date(getValue()))}
      </span>
    )
  }),
  column.accessor('status', {
    header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
    cell: ({ getValue }) => {
      const status = getValue()
      return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>
    }
  })
]

/** The full transaction ledger, sortable/paginated via DataTable. */
export function TransactionsCard({ stats }: { stats: FinanceDashboardStats }) {
  return (
    <ChartCard label="Transactions" value={stats.transactions.length.toLocaleString()}>
      <DataTable columns={columns} data={stats.transactions} toolbar={() => null} />
    </ChartCard>
  )
}
