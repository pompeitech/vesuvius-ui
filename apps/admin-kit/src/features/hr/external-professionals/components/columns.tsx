import {
  Badge,
  DataTableColumnHeader,
  UserAvatar,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import type { ExternalProfessional, ExternalProfessionalStatus } from '@pompeitech/mock-data'
import { currency, dateFormatter } from '../../_shared/format'

const ENGAGEMENT_TYPE_LABEL: Record<ExternalProfessional['engagementType'], string> = {
  freelance: 'Freelance',
  agency: 'Agency',
  consultancy: 'Consultancy'
}

const STATUS_VARIANT: Record<ExternalProfessionalStatus, 'success' | 'outline'> = {
  active: 'success',
  inactive: 'outline'
}

/** The External Professionals column set: identity, company/role, engagement, rate, contract dates, status. */
export const externalProfessionalColumns: DataTableColumnDef<ExternalProfessional>[] = [
  {
    accessorKey: 'name',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <UserAvatar name={row.original.name} src={row.original.avatarUrl} size="sm" />
        <div className="min-w-0">
          <p className="truncate font-medium">{row.original.name}</p>
          <p className="truncate text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      </div>
    ),
    size: 220
  },
  {
    accessorKey: 'company',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Company" />,
    size: 160
  },
  {
    accessorKey: 'role',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Role" />,
    size: 170
  },
  {
    accessorKey: 'engagementType',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Engagement" />,
    cell: ({ getValue }) =>
      ENGAGEMENT_TYPE_LABEL[getValue<ExternalProfessional['engagementType']>()],
    filterFn: 'arrHas',
    size: 120
  },
  {
    accessorKey: 'hourlyRate',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Rate" />,
    cell: ({ getValue }) => {
      const rate = getValue<number | undefined>()
      return <span className="tabular-nums">{rate ? `${currency.format(rate)}/hr` : '-'}</span>
    },
    size: 110
  },
  {
    accessorKey: 'contractStart',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Since" />,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">
        {dateFormatter.format(new Date(getValue<string>()))}
      </span>
    ),
    size: 120
  },
  {
    accessorKey: 'status',
    header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
    cell: ({ getValue }) => {
      const status = getValue<ExternalProfessionalStatus>()
      return (
        <Badge variant={STATUS_VARIANT[status]} className="capitalize">
          {status}
        </Badge>
      )
    },
    filterFn: 'arrHas',
    size: 100
  }
]
