import {
  DataTableFacetedFilter,
  DataTableToolbar,
  type DataTableProps
} from '@pompeitech/vesuvius-ui'
import type { Project } from '@pompeitech/mock-data'
import {
  PROJECT_HEALTH_OPTIONS,
  PROJECT_PRIORITY_OPTIONS,
  PROJECT_STATUS_OPTIONS
} from '../../_shared/format'

type ToolbarContext = Parameters<NonNullable<DataTableProps<Project>['toolbar']>>[0]

/** Search + density controls, plus the status/health/priority faceted filters. */
export function ProjectsTableToolbar({ table, density, setDensity }: ToolbarContext) {
  return (
    <DataTableToolbar
      table={table}
      globalFilter={table.getState().globalFilter ?? ''}
      onGlobalFilterChange={value => table.setGlobalFilter(value)}
      searchPlaceholder="Search projects..."
      density={density}
      onDensityChange={setDensity}
      filters={
        <>
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={PROJECT_STATUS_OPTIONS}
          />
          <DataTableFacetedFilter
            column={table.getColumn('health')}
            title="Health"
            options={PROJECT_HEALTH_OPTIONS}
          />
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title="Priority"
            options={PROJECT_PRIORITY_OPTIONS}
          />
        </>
      }
    />
  )
}
