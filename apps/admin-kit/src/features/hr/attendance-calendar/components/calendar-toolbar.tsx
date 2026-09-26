import type { Employee } from '@pompeitech/mock-data'
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@pompeitech/vesuvius-ui'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { ABSENCE_STATUS_OPTIONS, ABSENCE_TYPE_OPTIONS } from '../../_shared/format'
import type { EmployeeFilter, StatusFilter, TypeFilter } from '../types'
import { monthLabel } from '../utils'

type CalendarToolbarProps = {
  month: Date
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
  employees: Employee[]
  employeeFilter: EmployeeFilter
  onEmployeeFilterChange: (value: EmployeeFilter) => void
  typeFilter: TypeFilter
  onTypeFilterChange: (value: TypeFilter) => void
  statusFilter: StatusFilter
  onStatusFilterChange: (value: StatusFilter) => void
}

/** Month navigation on the left, employee/type/status filters on the right. */
export function CalendarToolbar({
  month,
  onPrevMonth,
  onNextMonth,
  onToday,
  employees,
  employeeFilter,
  onEmployeeFilterChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange
}: CalendarToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onPrevMonth}>
          <ChevronLeftIcon />
          <span className="sr-only">Previous month</span>
        </Button>
        <span className="w-40 text-center font-medium">{monthLabel(month)}</span>
        <Button variant="outline" size="icon" onClick={onNextMonth}>
          <ChevronRightIcon />
          <span className="sr-only">Next month</span>
        </Button>
        <Button variant="outline" size="sm" onClick={onToday}>
          Today
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={employeeFilter}
          onValueChange={value => onEmployeeFilterChange(value as EmployeeFilter)}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All employees</SelectItem>
            {employees.map(employee => (
              <SelectItem key={employee.id} value={employee.id}>
                {employee.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={value => onTypeFilterChange(value as TypeFilter)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {ABSENCE_TYPE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={value => onStatusFilterChange(value as StatusFilter)}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {ABSENCE_STATUS_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
