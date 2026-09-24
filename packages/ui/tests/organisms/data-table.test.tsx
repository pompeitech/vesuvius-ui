import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DataTable } from '@ui/organisms/data-table/data-table'
import { DataTableColumnHeader } from '@ui/organisms/data-table/data-table-column-header'
import { createSelectionColumn } from '@ui/organisms/data-table/data-table-selection-column'
import type { ColumnDef } from '@ui/organisms/data-table/table-core'
import { beforeEach, describe, expect, test, vi } from 'vitest'

type Order = { id: string; customer: string; amount: number }
const columns: ColumnDef<Order>[] = [
  createSelectionColumn<Order>(),
  {
    accessorKey: 'id',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Order" />
  },
  {
    accessorKey: 'customer',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Customer" />
  },
  { accessorKey: 'amount', header: 'Amount' }
]
const rows: Order[] = [
  { id: 'ORD-1000', customer: 'Ada Lovelace', amount: 120 },
  { id: 'ORD-1001', customer: 'Grace Hopper', amount: 240 },
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `ORD-${1002 + index}`,
    customer: `Customer ${index}`,
    amount: 300 + index
  }))
]
const Table = (props: Partial<React.ComponentProps<typeof DataTable<Order>>> = {}) => (
  <DataTable
    columns={columns}
    data={rows}
    enableRowSelection
    searchPlaceholder="Search orders..."
    bulkActions={<span>Bulk actions</span>}
    {...props}
  />
)

describe('data table', () => {
  beforeEach(() => {
    render(<Table />)
  })

  test('global search narrows rows to the match', async () => {
    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('Search orders...'), 'ORD-1005')
    expect(screen.getByRole('row', { name: /ord-1005/i })).toBeVisible()
    expect(screen.queryByRole('row', { name: /ord-1000/i })).not.toBeInTheDocument()
  })

  test('sorting a column shows the sorted indicator', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Order' }))
    await user.click(screen.getByRole('menuitem', { name: /sort ascending/i }))
    const header = screen.getByRole('button', { name: 'Order' })
    expect(header.querySelector('svg.lucide-arrow-up')).toBeVisible()
  })

  test('hiding a column removes it from the table', async () => {
    const user = userEvent.setup()
    expect(screen.getByRole('columnheader', { name: /amount/i })).toBeVisible()
    await user.click(screen.getByRole('button', { name: /columns/i }))
    await user.click(screen.getByRole('menuitemcheckbox', { name: /amount/i }))
    expect(screen.queryByRole('columnheader', { name: /amount/i })).not.toBeInTheDocument()
  })

  test('pagination advances to the next page', async () => {
    const user = userEvent.setup()
    expect(screen.getByText(/page 1 of 2/i)).toBeVisible()
    await user.click(screen.getByRole('button', { name: /go to next page/i }))
    expect(screen.getByText(/page 2 of/i)).toBeVisible()
  })

  test('selects rows and exposes the bulk selection state', async () => {
    const user = userEvent.setup()
    const selectAll = screen.getByRole('checkbox', { name: /select all/i })
    await user.click(selectAll)
    expect(screen.getAllByText(/row\(s\) selected/i)[0]).toBeVisible()
    expect(screen.getAllByText(/selected/i)[0]).toBeVisible()
  })

  test('resets an active global filter', async () => {
    const user = userEvent.setup()
    const search = screen.getByPlaceholderText('Search orders...')
    await user.type(search, 'ORD-1005')
    await user.click(screen.getByRole('button', { name: /reset/i }))
    expect(search).toHaveValue('')
    expect(screen.getByRole('row', { name: /ord-1000/i })).toBeVisible()
  })

  test('changes page size and reaches the last page', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('combobox', { name: 'Rows per page' }))
    await user.click(screen.getByRole('option', { name: '25' }))
    expect(screen.getByText(/page 1 of 1/i)).toBeVisible()
    expect(screen.getByRole('button', { name: /go to last page/i })).toBeDisabled()
  })

  test('supports a custom toolbar and row activation', async () => {
    const user = userEvent.setup()
    const onRowClick = vi.fn()
    render(
      <Table
        toolbar={() => <button type="button">Custom toolbar</button>}
        onRowClick={onRowClick}
        enableColumnOrdering={false}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Custom toolbar' }))
    const firstDataRow = screen
      .getAllByRole('row')
      .find(
        row => row.textContent?.includes('ORD-1000') && row.className.includes('cursor-pointer')
      )
    expect(firstDataRow).toBeDefined()
    await user.click(firstDataRow as HTMLElement)
    expect(onRowClick).toHaveBeenCalledWith(rows[0])
  })
})

describe('data table states', () => {
  test('renders loading rows while data is being fetched', () => {
    render(<Table loading />)
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1)
    expect(screen.queryByText('No results.')).not.toBeInTheDocument()
  })

  test('renders the empty state when no rows match', () => {
    render(<Table data={[]} />)
    expect(screen.getByText('No results.')).toBeVisible()
  })

  test('renders a custom empty state', () => {
    render(<Table data={[]} emptyState={<span>Nothing here</span>} />)
    expect(screen.getByText('Nothing here')).toBeVisible()
  })

  test('supports manual pagination metadata', () => {
    render(<Table data={rows.slice(0, 2)} manualPagination rowCount={42} />)
    expect(screen.getByText(/page 1 of 5/i)).toBeVisible()
    expect(screen.getByText(/42 row\(s\) total/i)).toBeVisible()
  })

  test('changes row density from the toolbar', async () => {
    const user = userEvent.setup()
    render(<Table />)
    await user.click(screen.getByRole('button', { name: 'Row density' }))
    await user.click(screen.getByRole('menuitem', { name: 'Compact' }))
    expect(screen.getAllByRole('cell')[0]).toHaveClass('h-8')
  })

  test('pins and unpins a column from its menu', async () => {
    const user = userEvent.setup()
    render(<Table />)
    await user.click(screen.getByRole('button', { name: 'Order' }))
    await user.click(screen.getByRole('menuitem', { name: /pin left/i }))
    await user.click(screen.getByRole('button', { name: 'Order' }))
    expect(screen.getByRole('menuitem', { name: /unpin/i })).toBeVisible()
  })

  test('resizes a column with the keyboard handle', async () => {
    const user = userEvent.setup()
    render(<Table />)
    const resizeHandle = screen.getByRole('slider', { name: /resize order column/i })
    const initialSize = resizeHandle.getAttribute('aria-valuenow')
    await user.click(resizeHandle)
    await user.keyboard('{ArrowRight}')
    expect(resizeHandle.getAttribute('aria-valuenow')).not.toBe(initialSize)
  })

  test('exports visible rows as csv', async () => {
    const user = userEvent.setup()
    const createObjectUrl = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test')
    const revokeObjectUrl = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined)
    const clickLink = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined)
    render(<Table enableExport exportFilename="orders" />)
    await user.click(screen.getByRole('button', { name: /export csv/i }))
    expect(createObjectUrl).toHaveBeenCalledOnce()
    expect(revokeObjectUrl).toHaveBeenCalledWith('blob:test')
    createObjectUrl.mockRestore()
    revokeObjectUrl.mockRestore()
    clickLink.mockRestore()
  })
})
