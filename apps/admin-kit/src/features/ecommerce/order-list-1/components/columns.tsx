import {
  Badge,
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  UserAvatar,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import type { Order } from '@pompeitech/mock-data'
import { EyeIcon, MoreHorizontalIcon, PencilIcon } from 'lucide-react'
import {
  currency,
  dateFormatter,
  ORDER_CHANNEL_LABEL,
  ORDER_STATUS_VARIANT,
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUS_VARIANT
} from '../../_shared/format'

type BuildColumnsOptions = {
  onView: (order: Order) => void
  onEdit: (order: Order) => void
}

/** The Orders list column set: customer, order #, items, total, status, payment, channel, method, date, actions. */
export function buildOrderColumns({
  onView,
  onEdit
}: BuildColumnsOptions): DataTableColumnDef<Order>[] {
  return [
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
          <span className="truncate font-medium">{row.original.customerName}</span>
        </div>
      ),
      size: 200
    },
    {
      accessorKey: 'orderNumber',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Order" />,
      cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>,
      size: 100
    },
    {
      accessorKey: 'itemCount',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Items" />,
      cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span>,
      size: 70
    },
    {
      accessorKey: 'total',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Total" />,
      cell: ({ getValue }) => (
        <span className="tabular-nums">{currency.format(getValue<number>())}</span>
      ),
      size: 100
    },
    {
      accessorKey: 'status',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
      cell: ({ getValue }) => {
        const status = getValue<Order['status']>()
        return (
          <Badge variant={ORDER_STATUS_VARIANT[status]} className="capitalize">
            {status}
          </Badge>
        )
      },
      filterFn: 'arrHas',
      size: 110
    },
    {
      accessorKey: 'paymentStatus',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Payment" />,
      cell: ({ getValue }) => {
        const status = getValue<Order['paymentStatus']>()
        return (
          <Badge variant={PAYMENT_STATUS_VARIANT[status]} className="capitalize">
            {status}
          </Badge>
        )
      },
      size: 100
    },
    {
      accessorKey: 'paymentMethod',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Method" />,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {PAYMENT_METHOD_LABEL[getValue<Order['paymentMethod']>()]}
        </span>
      ),
      size: 120
    },
    {
      accessorKey: 'channel',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Channel" />,
      cell: ({ getValue }) => ORDER_CHANNEL_LABEL[getValue<Order['channel']>()],
      filterFn: 'arrHas',
      size: 100
    },
    {
      accessorKey: 'createdAt',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Created" />,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {dateFormatter.format(new Date(getValue<string>()))}
        </span>
      ),
      size: 110
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon />
              <span className="sr-only">Open actions for order {row.original.orderNumber}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(row.original)}>
              <EyeIcon />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <PencilIcon />
              Edit order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      size: 56
    }
  ]
}
