import {
  getEmployeeDocuments,
  getEmployees,
  type Employee,
  type EmployeeDocument
} from '@pompeitech/mock-data'
import { DataTable, Typography } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { useLoaderData } from 'react-router'
import { buildDocumentColumns } from './components/columns'

export async function loader() {
  const [documents, employees] = await Promise.all([
    getEmployeeDocuments({ pageSize: 500 }),
    getEmployees({ pageSize: 200 })
  ])
  return { documents: documents.data, employees: employees.data }
}

export function Component() {
  const { documents, employees } = useLoaderData() as {
    documents: EmployeeDocument[]
    employees: Employee[]
  }
  const employeesById = useMemo(() => new Map(employees.map(e => [e.id, e])), [employees])
  const columns = useMemo(() => buildDocumentColumns(employeesById), [employeesById])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Documents
        </Typography>
        <Typography variant="muted">
          Contracts, payslips, and every other file on record for the team.
        </Typography>
      </div>

      <DataTable
        columns={columns}
        data={documents}
        getRowId={row => row.id}
        defaultSorting={[{ id: 'uploadedAt', desc: true }]}
        searchPlaceholder="Search documents..."
      />
    </div>
  )
}
