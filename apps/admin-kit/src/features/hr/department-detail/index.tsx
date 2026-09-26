import { DEPARTMENTS, EMPLOYEES, type Department, type Employee } from '@pompeitech/mock-data'
import { DataTable } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router'
import { buildEmployeeColumns } from '../employees/components/columns'
import { DetailHeader } from './components/detail-header'

export async function loader({ params }: LoaderFunctionArgs) {
  const department = DEPARTMENTS.find(d => d.id === params.id)
  if (!department) {
    throw new Response('Department not found', { status: 404 })
  }
  return department
}

export function Component() {
  const department = useLoaderData() as Department
  const navigate = useNavigate()
  const members = EMPLOYEES.filter(e => e.departmentId === department.id)
  const head = members.find(e => e.id === department.headEmployeeId)

  // Every row here already belongs to this department, so `departmentsById`
  // only needs to resolve this one — and the column itself is hidden anyway.
  const departmentsById = useMemo(() => new Map([[department.id, department]]), [department])
  const columns = useMemo(
    () =>
      buildEmployeeColumns({
        departmentsById,
        showDepartment: false,
        onView: (employee: Employee) => navigate(`/hr/employee-detail/${employee.id}`)
      }),
    [departmentsById, navigate]
  )

  return (
    <div className="flex flex-col gap-6">
      <DetailHeader department={department} head={head} memberCount={members.length} />
      <DataTable
        columns={columns}
        data={members}
        getRowId={row => row.id}
        searchPlaceholder="Search members..."
      />
    </div>
  )
}
