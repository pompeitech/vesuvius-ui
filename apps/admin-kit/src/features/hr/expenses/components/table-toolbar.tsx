import {
  DataTableFacetedFilter,
  DataTableToolbar,
  type DataTableProps
} from '@pompeitech/vesuvius-ui'
import type { ExpenseReport } from '@pompeitech/mock-data'
import { EXPENSE_STATUS_OPTIONS } from '../../_shared/format'

type ToolbarContext = Parameters<NonNullable<DataTableProps<ExpenseReport>['toolbar']>>[0]

const CATEGORY_OPTIONS = [
  { label: 'Travel', value: 'travel' },
  { label: 'Meals', value: 'meals' },
  { label: 'Software', value: 'software' },
  { label: 'Office Supplies', value: 'office_supplies' },
  { label: 'Training', value: 'training' },
  { label: 'Other', value: 'other' }
]

/** Search + density controls, plus the category/status faceted filters. */
export function ExpensesTableToolbar({ table, density, setDensity }: ToolbarContext) {
  return (
    <DataTableToolbar
      table={table}
      globalFilter={table.getState().globalFilter ?? ''}
      onGlobalFilterChange={value => table.setGlobalFilter(value)}
      searchPlaceholder="Search expenses..."
      density={density}
      onDensityChange={setDensity}
      filters={
        <>
          <DataTableFacetedFilter
            column={table.getColumn('category')}
            title="Category"
            options={CATEGORY_OPTIONS}
          />
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={EXPENSE_STATUS_OPTIONS}
          />
        </>
      }
    />
  )
}
