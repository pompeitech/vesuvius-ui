import { Badge, DataTableColumnHeader, type DataTableColumnDef } from '@pompeitech/vesuvius-ui'
import type { Department, JobOpening, JobOpeningStatus } from '@pompeitech/mock-data'
import { dateFormatter } from '../../_shared/format'

const STATUS_VARIANT: Record<JobOpeningStatus, 'success' | 'secondary' | 'outline'> = {
  open: 'success',
  on_hold: 'secondary',
  closed: 'outline'
}

const EMPLOYMENT_TYPE_LABEL: Record<JobOpening['employmentType'], string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contractor: 'Contractor'
}

/** The Job Openings column set: title, department, location, type, status, opened date, candidate count. */
export function buildJobOpeningColumns(
  departmentsById: Map<string, Department>,
  candidateCountByJob: Map<string, number>
): DataTableColumnDef<JobOpening>[] {
  return [
    {
      accessorKey: 'title',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Position" />,
      size: 220
    },
    {
      id: 'department',
      accessorFn: row => departmentsById.get(row.departmentId)?.name ?? '',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Department" />,
      cell: ({ getValue }) => <Badge variant="outline">{getValue<string>()}</Badge>,
      filterFn: 'arrHas',
      size: 150
    },
    {
      accessorKey: 'location',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Location" />,
      size: 130
    },
    {
      accessorKey: 'employmentType',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Type" />,
      cell: ({ getValue }) => EMPLOYMENT_TYPE_LABEL[getValue<JobOpening['employmentType']>()],
      size: 110
    },
    {
      accessorKey: 'status',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
      cell: ({ getValue }) => {
        const status = getValue<JobOpeningStatus>()
        return (
          <Badge variant={STATUS_VARIANT[status]} className="capitalize">
            {status.replace('_', ' ')}
          </Badge>
        )
      },
      filterFn: 'arrHas',
      size: 110
    },
    {
      accessorKey: 'openedAt',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Opened" />,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {dateFormatter.format(new Date(getValue<string>()))}
        </span>
      ),
      size: 120
    },
    {
      id: 'candidateCount',
      accessorFn: row => candidateCountByJob.get(row.id) ?? 0,
      header: ({ header }) => <DataTableColumnHeader header={header} title="Candidates" />,
      cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span>,
      size: 110
    }
  ]
}
