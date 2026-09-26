import {
  getDepartments,
  getEmployees,
  officeLocationLabel,
  type Department,
  type Employee
} from '@pompeitech/mock-data'
import { Button, DataTable, Typography, toast } from '@pompeitech/vesuvius-ui'
import { UserPlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { useOfficesStore } from '../../company/_shared/offices-store'
import { EMPLOYEE_STATUS_OPTIONS } from '../_shared/format'
import { buildNewEmployee, nextEmployeeCode } from '../_shared/build-employee'
import { EmployeeDialog } from '../_shared/employee-dialog'
import type { EmployeeFormOutput } from '../_shared/employee-form-schema'
import { buildEmployeeColumns } from './components/columns'
import { EmployeesTableToolbar } from './components/table-toolbar'

// The whole roster (24 people) — fetched once and handed to DataTable for
// client-side search/sort/filter/pagination, same pattern as every other
// fixed-catalog list in this kit.
export async function loader() {
  const [employees, departments] = await Promise.all([
    getEmployees({ pageSize: 200 }),
    getDepartments({ pageSize: 50 })
  ])
  return { employees: employees.data, departments: departments.data }
}

export function Component() {
  const { employees: initialEmployees, departments } = useLoaderData() as {
    employees: Employee[]
    departments: Department[]
  }
  const [employees, setEmployees] = useState(initialEmployees)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [offices] = useOfficesStore()
  const navigate = useNavigate()

  const departmentsById = useMemo(() => new Map(departments.map(d => [d.id, d])), [departments])
  const locations = useMemo(() => [...offices.map(officeLocationLabel), 'Remote'], [offices])

  const departmentOptions = useMemo(
    () =>
      departments
        .map(d => ({ label: d.name, value: d.name }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [departments]
  )

  const columns = useMemo(
    () =>
      buildEmployeeColumns({
        departmentsById,
        onView: employee => navigate(`/hr/employee-detail/${employee.id}`)
      }),
    [departmentsById, navigate]
  )

  const handleAddEmployee = (values: EmployeeFormOutput) => {
    const employee = buildNewEmployee(values, nextEmployeeCode(employees.length))
    setEmployees(prev => [employee, ...prev])
    toast.success(`${employee.name} added to the roster.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Employees
          </Typography>
          <Typography variant="muted">
            Every person on the team, their role, and their leave balance.
          </Typography>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <UserPlusIcon />
          Add Employee
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={employees}
        getRowId={row => row.id}
        searchPlaceholder="Search employees..."
        toolbar={ctx => (
          <EmployeesTableToolbar
            {...ctx}
            departmentOptions={departmentOptions}
            statusOptions={EMPLOYEE_STATUS_OPTIONS}
          />
        )}
      />

      <EmployeeDialog
        open={addDialogOpen}
        employees={employees}
        departments={departments}
        locations={locations}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleAddEmployee}
      />
    </div>
  )
}
