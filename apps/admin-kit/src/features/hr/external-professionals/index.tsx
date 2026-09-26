import { getExternalProfessionals, type ExternalProfessional } from '@pompeitech/mock-data'
import { DataTable, Typography } from '@pompeitech/vesuvius-ui'
import { useLoaderData } from 'react-router'
import { externalProfessionalColumns } from './components/columns'

export async function loader() {
  const result = await getExternalProfessionals({ pageSize: 100 })
  return result.data
}

export function Component() {
  const professionals = useLoaderData() as ExternalProfessional[]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          External Professionals
        </Typography>
        <Typography variant="muted">
          Freelancers, agencies, and consultancies engaged outside of payroll.
        </Typography>
      </div>

      <DataTable
        columns={externalProfessionalColumns}
        data={professionals}
        getRowId={row => row.id}
        searchPlaceholder="Search external professionals..."
      />
    </div>
  )
}
