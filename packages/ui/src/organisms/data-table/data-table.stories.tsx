import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  CheckCircle2Icon,
  ClockIcon,
  CopyIcon,
  EyeIcon,
  PackageIcon,
  TrashIcon,
  TruckIcon,
  XCircleIcon
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Badge } from '../../atoms/badge/badge'
import { Button } from '../../atoms/button/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../molecules/dropdown-menu/dropdown-menu'
import { DataTable } from './data-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { createSelectionColumn } from './data-table-selection-column'
import { DataTableToolbar } from './data-table-toolbar'
import type { ColumnDef, SortingState } from './table-core'

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { columns: [], data: [] }
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Mock "orders" dataset — deterministic, no external dependency needed just
// for a Storybook demo (the real mock-data package lands in a later
// milestone and will replace this with Faker-generated fixtures).
// ---------------------------------------------------------------------------

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

type Order = {
  id: string
  customer: string
  status: OrderStatus
  items: number
  amount: number
  date: string
  region: string
}

const STATUSES: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
const REGIONS = ['North America', 'Europe', 'Asia', 'South America', 'Oceania']
const FIRST_NAMES = [
  'Olivia',
  'Liam',
  'Emma',
  'Noah',
  'Ava',
  'Ethan',
  'Sophia',
  'Mason',
  'Isabella',
  'Lucas',
  'Mia',
  'Elijah',
  'Charlotte',
  'James',
  'Amelia'
]
const LAST_NAMES = [
  'Bennett',
  'Carter',
  'Diaz',
  'Ellis',
  'Foster',
  'Grant',
  'Hayes',
  'Irwin',
  'Jensen',
  'Kelly',
  'Lowe',
  'Moretti',
  'Nguyen',
  'Owens',
  'Parker'
]

function generateOrders(count: number): Order[] {
  return Array.from({ length: count }, (_, i) => {
    const amount = Math.round((((i * 37) % 950) + 20 + (i % 3) * 15.5) * 100) / 100
    return {
      id: `ORD-${1000 + i}`,
      customer: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 7) % LAST_NAMES.length]}`,
      status: STATUSES[i % STATUSES.length]!,
      items: (i % 5) + 1,
      amount,
      date: new Date(2026, i % 12, (i % 28) + 1).toISOString(),
      region: REGIONS[i % REGIONS.length]!
    }
  })
}

const STATUS_OPTIONS = [
  { label: 'Pending', value: 'pending', icon: ClockIcon },
  { label: 'Processing', value: 'processing', icon: PackageIcon },
  { label: 'Shipped', value: 'shipped', icon: TruckIcon },
  { label: 'Delivered', value: 'delivered', icon: CheckCircle2Icon },
  { label: 'Cancelled', value: 'cancelled', icon: XCircleIcon }
]

const STATUS_BADGE_VARIANT: Record<
  OrderStatus,
  'default' | 'secondary' | 'success' | 'warning' | 'destructive'
> = {
  pending: 'warning',
  processing: 'secondary',
  shipped: 'default',
  delivered: 'success',
  cancelled: 'destructive'
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})
const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })

function buildColumns(): ColumnDef<Order, unknown>[] {
  return [
    createSelectionColumn<Order>(),
    {
      accessorKey: 'id',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Order" />,
      cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
      size: 120
    },
    {
      accessorKey: 'customer',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Customer" />,
      size: 180
    },
    {
      accessorKey: 'status',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
      cell: ({ getValue }) => {
        const status = getValue<OrderStatus>()
        return (
          <Badge variant={STATUS_BADGE_VARIANT[status]} className="capitalize">
            {status}
          </Badge>
        )
      },
      // `status` is a single scalar value per row, filtered against the
      // array of checked options in the faceted filter below — that's
      // "arrHas" ("row value equals one of the filter values"), not
      // "arrIncludesSome" (which requires the *row* value itself to be an
      // array, e.g. a multi-value tags column).
      filterFn: 'arrHas',
      size: 130
    },
    {
      accessorKey: 'items',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Items" />,
      cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span>,
      size: 90
    },
    {
      accessorKey: 'amount',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Amount" />,
      cell: ({ getValue }) => (
        <span className="tabular-nums">{currency.format(getValue<number>())}</span>
      ),
      size: 120
    },
    {
      accessorKey: 'date',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Date" />,
      cell: ({ getValue }) => dateFormat.format(new Date(getValue<string>())),
      size: 130
    },
    {
      accessorKey: 'region',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Region" />,
      size: 150
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <EyeIcon />
              <span className="sr-only">Open actions for {row.original.id}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <EyeIcon />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon />
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <TrashIcon />
              Cancel order
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

// ---------------------------------------------------------------------------
// Client-side: every feature enabled, all 300 rows sorted/filtered/paginated
// in the browser.
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: function Render() {
    const data = useMemo(() => generateOrders(300), [])
    const columns = useMemo(() => buildColumns(), [])

    return (
      <DataTable
        columns={columns}
        data={data}
        getRowId={row => row.id}
        enableRowSelection
        defaultColumnPinning={{ start: ['select', 'id'], end: ['actions'] }}
        searchPlaceholder="Search orders..."
        toolbar={({ table, density, setDensity }) => (
          <DataTableToolbar
            table={table}
            globalFilter={table.getState().globalFilter ?? ''}
            onGlobalFilterChange={value => table.setGlobalFilter(value)}
            searchPlaceholder="Search orders..."
            density={density}
            onDensityChange={setDensity}
            filters={
              <DataTableFacetedFilter
                column={table.getColumn('status')}
                title="Status"
                options={STATUS_OPTIONS}
              />
            }
          />
        )}
      />
    )
  }
}

// ---------------------------------------------------------------------------
// Server-side: DataTable only renders whatever `data` it's given for the
// current page — sorting/filtering/pagination state is lifted and a fake
// ~500ms network round-trip does the actual work, exactly like a real API.
// ---------------------------------------------------------------------------

const ALL_ORDERS = generateOrders(500)

function fakeServerFetch({
  pageIndex,
  pageSize,
  sorting,
  globalFilter
}: {
  pageIndex: number
  pageSize: number
  sorting: SortingState
  globalFilter: string
}): Promise<{ rows: Order[]; rowCount: number }> {
  return new Promise(resolve => {
    setTimeout(() => {
      let rows = ALL_ORDERS

      if (globalFilter) {
        const query = globalFilter.toLowerCase()
        rows = rows.filter(
          order =>
            order.id.toLowerCase().includes(query) || order.customer.toLowerCase().includes(query)
        )
      }

      const sort = sorting[0]
      if (sort) {
        const { id, desc } = sort
        rows = [...rows].sort((a, b) => {
          const av = a[id as keyof Order]
          const bv = b[id as keyof Order]
          if (av === bv) return 0
          return (av < bv ? -1 : 1) * (desc ? -1 : 1)
        })
      }

      const rowCount = rows.length
      const start = pageIndex * pageSize
      resolve({ rows: rows.slice(start, start + pageSize), rowCount })
    }, 500)
  })
}

export const ServerSide: Story = {
  name: 'Server-side data',
  render: function Render() {
    const columns = useMemo(() => buildColumns().filter(c => c.id !== 'select'), [])

    const [data, setData] = useState<Order[]>([])
    const [rowCount, setRowCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState(() => ({
      pageIndex: 0,
      pageSize: 10
    }))
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    useEffect(() => {
      let cancelled = false
      setLoading(true)
      fakeServerFetch({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sorting,
        globalFilter
      }).then(result => {
        if (cancelled) return
        setData(result.rows)
        setRowCount(result.rowCount)
        setLoading(false)
      })
      return () => {
        cancelled = true
      }
    }, [pagination.pageIndex, pagination.pageSize, sorting, globalFilter])

    return (
      <DataTable
        columns={columns}
        data={data}
        getRowId={row => row.id}
        loading={loading}
        manualPagination
        manualSorting
        manualFiltering
        rowCount={rowCount}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        searchPlaceholder="Search orders (server-side)..."
      />
    )
  }
}

// ---------------------------------------------------------------------------
// Loading / empty states
// ---------------------------------------------------------------------------

export const Loading: Story = {
  render: () => (
    <DataTable
      columns={buildColumns()}
      data={[]}
      loading
      pagination={{ pageIndex: 0, pageSize: 8 }}
    />
  )
}

export const Empty: Story = {
  render: () => <DataTable columns={buildColumns()} data={[]} />
}
