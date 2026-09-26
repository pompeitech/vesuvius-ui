import type { AbsenceStatus, AbsenceType } from '@pompeitech/mock-data'

export type EmployeeFilter = 'all' | string
export type TypeFilter = 'all' | AbsenceType
export type StatusFilter = 'all' | AbsenceStatus
