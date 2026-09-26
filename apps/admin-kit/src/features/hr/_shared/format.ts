import type {
  AbsenceStatus,
  AbsenceType,
  DayPart,
  DocumentType,
  EmployeeStatus,
  ExpenseCategory,
  ExpenseStatus,
  SalaryType,
  ShiftStatus,
  TimeEntryStatus
} from '@pompeitech/mock-data'
import type { BadgeProps } from '@pompeitech/vesuvius-ui'
import {
  ClockIcon,
  HeartPulseIcon,
  HomeIcon,
  PalmtreeIcon,
  StarIcon,
  type LucideIcon
} from 'lucide-react'

// Shared across every HR page that formats money/dates or renders an
// absence/employee/expense status badge — kept in one place instead of
// redefined per page, same convention as ecommerce/_shared/format.ts.
export const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
export const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})
export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})
export const monthDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric'
})

export const ABSENCE_TYPE_LABEL: Record<AbsenceType, string> = {
  vacation: 'Vacation',
  permit: 'Permit',
  smart_working: 'Smart Working',
  sick_leave: 'Sick Leave',
  public_holiday: 'Public Holiday'
}

export const ABSENCE_TYPE_ICON: Record<AbsenceType, LucideIcon> = {
  vacation: PalmtreeIcon,
  permit: ClockIcon,
  smart_working: HomeIcon,
  sick_leave: HeartPulseIcon,
  public_holiday: StarIcon
}

/** Background/text/border classes for one absence type's calendar-grid cell (not a `Badge` — see the calendar's own cell component). */
export const ABSENCE_TYPE_CELL_CLASS: Record<AbsenceType, string> = {
  vacation: 'bg-success/20 text-success',
  permit: 'bg-warning/20 text-warning',
  smart_working: 'bg-info/20 text-info',
  sick_leave: 'bg-destructive/15 text-destructive',
  public_holiday: 'bg-highlight/20 text-highlight'
}

export const ABSENCE_TYPE_OPTIONS: { label: string; value: AbsenceType }[] = (
  Object.entries(ABSENCE_TYPE_LABEL) as [AbsenceType, string][]
).map(([value, label]) => ({ label, value }))

export const ABSENCE_STATUS_VARIANT: Record<AbsenceStatus, BadgeProps['variant']> = {
  pending: 'secondary',
  approved: 'success',
  rejected: 'destructive'
}

/** Suffix appended after a date wherever an absence's day part matters — empty for "full", the common case. */
export const DAY_PART_LABEL: Record<DayPart, string> = {
  full: '',
  morning: 'Morning',
  afternoon: 'Afternoon'
}

export const ABSENCE_STATUS_OPTIONS: { label: string; value: AbsenceStatus }[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' }
]

export const EMPLOYEE_STATUS_VARIANT: Record<EmployeeStatus, BadgeProps['variant']> = {
  active: 'success',
  on_leave: 'secondary',
  terminated: 'outline'
}

export const EMPLOYEE_STATUS_LABEL: Record<EmployeeStatus, string> = {
  active: 'Active',
  on_leave: 'On Leave',
  terminated: 'Terminated'
}

export const EMPLOYEE_STATUS_OPTIONS: { label: string; value: EmployeeStatus }[] = (
  Object.entries(EMPLOYEE_STATUS_LABEL) as [EmployeeStatus, string][]
).map(([value, label]) => ({ label, value }))

export const EXPENSE_STATUS_VARIANT: Record<ExpenseStatus, BadgeProps['variant']> = {
  pending: 'secondary',
  approved: 'info',
  reimbursed: 'success',
  rejected: 'destructive'
}

export const EXPENSE_STATUS_OPTIONS: { label: string; value: ExpenseStatus }[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Reimbursed', value: 'reimbursed' },
  { label: 'Rejected', value: 'rejected' }
]

export const EXPENSE_CATEGORY_LABEL: Record<ExpenseCategory, string> = {
  travel: 'Travel',
  meals: 'Meals',
  software: 'Software',
  office_supplies: 'Office Supplies',
  training: 'Training',
  other: 'Other'
}

export const DOCUMENT_TYPE_LABEL: Record<DocumentType, string> = {
  contract: 'Contract',
  payslip: 'Payslip',
  id_document: 'ID Document',
  certificate: 'Certificate',
  other: 'Other'
}

export const SALARY_TYPE_LABEL: Record<SalaryType, string> = {
  annual: 'Annual',
  monthly: 'Monthly'
}

export const SHIFT_STATUS_VARIANT: Record<ShiftStatus, BadgeProps['variant']> = {
  scheduled: 'secondary',
  completed: 'success',
  cancelled: 'outline'
}

export const TIME_ENTRY_STATUS_VARIANT: Record<TimeEntryStatus, BadgeProps['variant']> = {
  on_time: 'success',
  late: 'warning',
  missing: 'destructive'
}

export const TIME_ENTRY_STATUS_OPTIONS: { label: string; value: TimeEntryStatus }[] = [
  { label: 'On time', value: 'on_time' },
  { label: 'Late', value: 'late' },
  { label: 'Missing', value: 'missing' }
]
