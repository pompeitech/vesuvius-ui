import type { Employee } from '@pompeitech/mock-data'
import { Badge, Typography, UserAvatar } from '@pompeitech/vesuvius-ui'
import { EMPLOYEE_STATUS_LABEL, EMPLOYEE_STATUS_VARIANT } from '../../_shared/format'

type DetailHeaderProps = {
  employee: Employee
  departmentName: string
}

function tenureLabel(hireDate: string): string {
  const months = Math.max(
    0,
    Math.floor((Date.now() - new Date(hireDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44))
  )
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (years === 0) return `${remainingMonths} mo`
  if (remainingMonths === 0) return `${years} yr`
  return `${years} yr ${remainingMonths} mo`
}

/** Avatar, name, role, and status — the read-only header for an employee's profile. */
export function DetailHeader({ employee, departmentName }: DetailHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <UserAvatar name={employee.name} src={employee.avatarUrl} size="xl" />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Typography as="h1" variant="h3">
            {employee.name}
          </Typography>
          <Badge variant="outline" className="font-mono text-xs font-normal">
            {employee.employeeCode}
          </Badge>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{employee.jobTitle}</span>
          <span>·</span>
          <span>{departmentName}</span>
          <span>·</span>
          <span>{employee.location}</span>
          <span>·</span>
          <span>{tenureLabel(employee.hireDate)} tenure</span>
          <span>·</span>
          <Badge variant={EMPLOYEE_STATUS_VARIANT[employee.status]}>
            {EMPLOYEE_STATUS_LABEL[employee.status]}
          </Badge>
        </div>
      </div>
    </div>
  )
}
