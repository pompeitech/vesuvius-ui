import {
  DataTableFacetedFilter,
  DataTableToolbar,
  type DataTableProps
} from '@pompeitech/vesuvius-ui'
import type { Employee } from '@pompeitech/mock-data'

type ToolbarContext = Parameters<NonNullable<DataTableProps<Employee>['toolbar']>>[0]

type EmployeesTableToolbarProps = ToolbarContext & {
  departmentOptions: { label: string; value: string }[]
  statusOptions: { label: string; value: string }[]
}

/** Search + density controls, plus the department/status faceted filters. */
export function EmployeesTableToolbar({
  table,
  density,
  setDensity,
  departmentOptions,
  statusOptions
}: EmployeesTableToolbarProps) {
  return (
    <DataTableToolbar
      table={table}
      globalFilter={table.getState().globalFilter ?? ''}
      onGlobalFilterChange={value => table.setGlobalFilter(value)}
      searchPlaceholder="Search employees..."
      density={density}
      onDensityChange={setDensity}
      filters={
        <>
          <DataTableFacetedFilter
            column={table.getColumn('department')}
            title="Department"
            options={departmentOptions}
          />
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statusOptions}
          />
        </>
      }
    />
  )
}
