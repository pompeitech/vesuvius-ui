import type { Shipment } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import { EyeIcon, MoreHorizontalIcon, PencilIcon } from 'lucide-react'
import {
  CARRIER_COLOR,
  dateFormatter,
  SHIPMENT_SERVICE_TIER_LABEL,
  SHIPMENT_STATUS_VARIANT
} from '../../_shared/format'
import { ShipmentEventTracker } from '../../_shared/shipment-tracker'

type BuildColumnsOptions = {
  onView: (shipment: Shipment) => void
  onEdit: (shipment: Shipment) => void
}

/** The Shipments list column set: ID, expected arrival, status(+delay), linked order, event tracker, carrier, actions. */
export function buildShipmentColumns({
  onView,
  onEdit
}: BuildColumnsOptions): DataTableColumnDef<Shipment>[] {
  return [
    {
      accessorKey: 'trackingNumber',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Shipment ID" />,
      cell: ({ row }) => <span className="font-medium">{row.original.trackingNumber}</span>,
      size: 140
    },
    {
      accessorKey: 'estimatedDelivery',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Expected arrival" />,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {dateFormatter.format(new Date(getValue<string>()))}
        </span>
      ),
      size: 130
    },
    {
      accessorKey: 'status',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
      cell: ({ row }) => {
        const { status, delayed } = row.original
        return (
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={SHIPMENT_STATUS_VARIANT[status]} className="capitalize">
              {status.replace(/_/g, ' ')}
            </Badge>
            {delayed && (
              <Badge variant="destructive" className="capitalize">
                Delay
              </Badge>
            )}
          </div>
        )
      },
      filterFn: 'arrHas',
      size: 190
    },
    {
      accessorKey: 'orderNumber',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Order" />,
      cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>,
      size: 100
    },
    {
      id: 'event',
      header: () => 'Shipment Event',
      cell: ({ row }) => <ShipmentEventTracker status={row.original.status} />,
      enableSorting: false,
      size: 140
    },
    {
      accessorKey: 'carrier',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Carrier" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{
              backgroundColor: CARRIER_COLOR[row.original.carrier] ?? 'var(--muted-foreground)'
            }}
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate">{row.original.carrier}</span>
            <span className="truncate text-xs text-muted-foreground">
              {SHIPMENT_SERVICE_TIER_LABEL[row.original.serviceTier]}
            </span>
          </div>
        </div>
      ),
      filterFn: 'arrHas',
      size: 150
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon />
              <span className="sr-only">
                Open actions for shipment {row.original.trackingNumber}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(row.original)}>
              <EyeIcon />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <PencilIcon />
              Edit shipping label
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
