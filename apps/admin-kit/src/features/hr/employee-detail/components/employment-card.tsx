import type { Employee } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { Link } from 'react-router'
import { dateFormatter } from '../../_shared/format'
import { InfoField } from '../../_shared/info-field'

const EMPLOYMENT_TYPE_LABEL: Record<Employee['employmentType'], string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contractor: 'Contractor'
}

type EmploymentCardProps = {
  employee: Employee
  departmentName: string
  /** Undefined only for the CEO — the one root of the org chart. */
  manager: Employee | undefined
  directReportCount: number
}

/** Role, department, contract basics, and where this person sits in the reporting line. */
export function EmploymentCard({
  employee,
  departmentName,
  manager,
  directReportCount
}: EmploymentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InfoField label="Job title">{employee.jobTitle}</InfoField>
        <InfoField label="Department">
          <Link
            to={`/hr/department-detail/${employee.departmentId}`}
            className="text-primary hover:underline"
          >
            {departmentName}
          </Link>
        </InfoField>
        <InfoField label="Employment type">
          {EMPLOYMENT_TYPE_LABEL[employee.employmentType]}
        </InfoField>
        <InfoField label="Hire date">{dateFormatter.format(new Date(employee.hireDate))}</InfoField>
        {employee.contractEndDate && (
          <InfoField label="Contract end">
            {dateFormatter.format(new Date(employee.contractEndDate))}
          </InfoField>
        )}
        <InfoField label="Employee code">{employee.employeeCode}</InfoField>
        <InfoField label="Reports to">
          {manager ? (
            <Link to={`/hr/employee-detail/${manager.id}`} className="text-primary hover:underline">
              {manager.name}
            </Link>
          ) : (
            'No one (CEO)'
          )}
        </InfoField>
        <InfoField label="Direct reports">
          {directReportCount} {directReportCount === 1 ? 'person' : 'people'}
        </InfoField>
      </CardContent>
    </Card>
  )
}
