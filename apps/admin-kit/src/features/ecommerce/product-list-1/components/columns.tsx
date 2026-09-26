import {
  Badge,
  Button,
  cn,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import type { Product, ProductStatus } from '@pompeitech/mock-data'
import {
  CopyIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  StarIcon,
  TrashIcon
} from 'lucide-react'
import { PRODUCT_STATUS_VARIANT } from '../../_shared/product-status'
import {
  STOCK_LEVEL_BAR_COLOR,
  STOCK_LEVEL_TEXT_COLOR,
  stockLevel
} from '../../_shared/stock-level'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

type BuildColumnsOptions = {
  onView: (product: Product) => void
  onEdit: (product: Product) => void
  onDuplicate: (product: Product) => void
  onDelete: (product: Product) => void
}

/** The full Product List 1 column set: identity, SKU/category, stock bar, price/rating/status, row actions. */
export function buildColumns({
  onView,
  onEdit,
  onDuplicate,
  onDelete
}: BuildColumnsOptions): DataTableColumnDef<Product>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Product" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.imageUrl}
            alt=""
            className="size-9 shrink-0 rounded-md border object-cover"
          />
          <span className="truncate font-medium">{row.original.name}</span>
        </div>
      ),
      size: 260
    },
    {
      accessorKey: 'sku',
      header: ({ header }) => <DataTableColumnHeader header={header} title="SKU" />,
      cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>,
      size: 130
    },
    {
      accessorKey: 'category',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Category" />,
      cell: ({ getValue }) => <Badge variant="outline">{getValue<string>()}</Badge>,
      filterFn: 'arrHas',
      size: 150
    },
    {
      accessorKey: 'stock',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Current Stock" />,
      cell: ({ getValue }) => {
        const stock = getValue<number>()
        const level = stockLevel(stock)
        return (
          <div className="flex flex-col gap-1.5 py-1">
            <span className="text-sm tabular-nums">
              {stock.toLocaleString()} units ·{' '}
              <span className={cn('font-medium', STOCK_LEVEL_TEXT_COLOR[level])}>{level}</span>
            </span>
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
              <div
                className={cn('h-full rounded-full', STOCK_LEVEL_BAR_COLOR[level])}
                style={{ width: `${Math.min(100, (stock / 500) * 100)}%` }}
              />
            </div>
          </div>
        )
      },
      size: 190
    },
    {
      // Filter-only: faceted counts need a column whose resolved value IS
      // the level ("Low"/"Medium"/"High"), not the raw stock number — kept
      // out of `defaultColumnVisibility` (see page.tsx) so it never renders.
      id: 'stockLevel',
      accessorFn: row => stockLevel(row.stock),
      header: () => null,
      cell: () => null,
      filterFn: 'arrHas',
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'price',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Unit Price" />,
      cell: ({ getValue }) => (
        <span className="tabular-nums">{currency.format(getValue<number>())}</span>
      ),
      size: 110
    },
    {
      accessorKey: 'rating',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Rating" />,
      cell: ({ getValue }) => (
        <span className="flex items-center gap-1 tabular-nums">
          <StarIcon className="size-3.5 fill-warning text-warning" />
          {getValue<number>().toFixed(1)}
        </span>
      ),
      size: 90
    },
    {
      accessorKey: 'status',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
      cell: ({ getValue }) => {
        const status = getValue<ProductStatus>()
        return (
          <Badge variant={PRODUCT_STATUS_VARIANT[status]} className="capitalize">
            {status}
          </Badge>
        )
      },
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
      size: 120
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon />
              <span className="sr-only">Open actions for {row.original.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <PencilIcon />
              Edit product
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onView(row.original)}>
              <EyeIcon />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate(row.original)}>
              <CopyIcon />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(row.original)}>
              <TrashIcon />
              Delete
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
