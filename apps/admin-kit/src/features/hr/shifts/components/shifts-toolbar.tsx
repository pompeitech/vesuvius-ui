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
import { monthLabel } from '../../_shared/calendar-utils'

type ShiftsToolbarProps = {
  month: Date
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
  employees: Employee[]
  employeeFilter: string
  onEmployeeFilterChange: (value: string) => void
}

/** Month navigation on the left, an employee filter on the right. */
export function ShiftsToolbar({
  month,
  onPrevMonth,
  onNextMonth,
  onToday,
  employees,
  employeeFilter,
  onEmployeeFilterChange
}: ShiftsToolbarProps) {
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

      <Select value={employeeFilter} onValueChange={onEmployeeFilterChange}>
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
    </div>
  )
}
