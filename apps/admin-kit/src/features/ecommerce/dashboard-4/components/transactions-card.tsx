import type { FinanceDashboardStats, Transaction, TransactionStatus } from '@pompeitech/mock-data'
import {
  Badge,
  ChartCard,
  DataTable,
  DataTableColumnHeader,
  UserAvatar,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import { currency, dateFormatter, STATUS_VARIANT } from '../format'

const columns: DataTableColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Transaction ID" />,
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
    accessorKey: 'amount',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Amount" />,
    cell: ({ getValue }) => (
      <span className="tabular-nums">{currency.format(getValue<number>())}</span>
    )
  },
  {
    accessorKey: 'type',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Type" />,
    cell: ({ getValue }) => <Badge variant="outline">{getValue<string>()}</Badge>
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Payment Method" />,
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>
  },
  {
    accessorKey: 'date',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Date" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">
        {dateFormatter.format(new Date(getValue<string>()))}
      </span>
    )
  },
  {
    accessorKey: 'status',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
    cell: ({ getValue }) => {
      const status = getValue<TransactionStatus>()
      return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>
    }
  }
]

/** The full transaction ledger, sortable/paginated via DataTable. */
export function TransactionsCard({ stats }: { stats: FinanceDashboardStats }) {
  return (
    <ChartCard label="Transactions" value={stats.transactions.length.toLocaleString()}>
      <DataTable columns={columns} data={stats.transactions} toolbar={() => null} />
    </ChartCard>
  )
}
