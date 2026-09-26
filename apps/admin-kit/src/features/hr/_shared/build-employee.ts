import type { Employee } from '@pompeitech/mock-data'
import { NO_MANAGER_VALUE, type EmployeeFormOutput } from './employee-form-schema'

/**
 * Turns the quick "Add Employee" form into a full `Employee` record. The
 * form only collects what actually matters for placing someone on the org
 * chart (name, role, department, manager, location) — the rest of the
 * schema's required personal fields (address, birth date, emergency
 * contact, ...) get harmless placeholders, same spirit as this kit's other
 * "simulate the write, don't demand every field up front" forms.
 */
export function buildNewEmployee(values: EmployeeFormOutput, employeeCode: string): Employee {
  // The schema requires `hireDate` before submit succeeds — this just
  // narrows the `Date | null` type `schemaHelper.date()` always carries.
  const hireDate = values.hireDate ?? new Date()

  return {
    id: crypto.randomUUID(),
    name: values.name,
    email: values.email,
    phone: '',
    jobTitle: values.jobTitle,
    departmentId: values.departmentId,
    employmentType: values.employmentType,
    status: 'active',
    location: values.location,
    address: '',
    hireDate: hireDate.toISOString(),
    birthDate: new Date(1990, 0, 1).toISOString(),
    managerId: values.managerId === NO_MANAGER_VALUE ? undefined : values.managerId,
    employeeCode,
    skills: [],
    emergencyContactName: '',
    emergencyContactPhone: '',
    vacationDaysTotal: 26,
    vacationDaysUsed: 0,
    rolHoursTotal: 88,
    rolHoursUsed: 0
  }
}

/** `EMP-0001`-style codes, continuing on from however many employees already exist. */
export function nextEmployeeCode(existingCount: number): string {
  return `EMP-${String(existingCount + 1).padStart(4, '0')}`
}
