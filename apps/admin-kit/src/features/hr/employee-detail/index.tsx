import {
  ABSENCES,
  DEPARTMENTS,
  EMPLOYEE_DOCUMENTS,
  EMPLOYEES,
  EXPENSE_REPORTS,
  PAYSLIPS,
  SHIFTS,
  TIME_ENTRIES,
  type Employee
} from '@pompeitech/mock-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@pompeitech/vesuvius-ui'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { AbsencesCard } from './components/absences-card'
import { ContactCard } from './components/contact-card'
import { DetailHeader } from './components/detail-header'
import { DocumentsCard } from './components/documents-card'
import { EmploymentCard } from './components/employment-card'
import { ExpensesCard } from './components/expenses-card'
import { LeaveBalanceCard } from './components/leave-balance-card'
import { PayslipsCard } from './components/payslips-card'
import { ShiftsCard } from './components/shifts-card'
import { SkillsCard } from './components/skills-card'
import { TimeEntriesCard } from './components/time-entries-card'

export async function loader({ params }: LoaderFunctionArgs) {
  const employee = EMPLOYEES.find(e => e.id === params.id)
  if (!employee) {
    throw new Response('Employee not found', { status: 404 })
  }
  return employee
}

export function Component() {
  const employee = useLoaderData() as Employee
  const department = DEPARTMENTS.find(d => d.id === employee.departmentId)
  const manager = EMPLOYEES.find(e => e.id === employee.managerId)
  const directReports = EMPLOYEES.filter(e => e.managerId === employee.id)

  const absences = ABSENCES.filter(a => a.employeeId === employee.id)
  const shifts = SHIFTS.filter(s => s.employeeId === employee.id)
  const timeEntries = TIME_ENTRIES.filter(t => t.employeeId === employee.id)
  const payslips = PAYSLIPS.filter(p => p.employeeId === employee.id)
  const documents = EMPLOYEE_DOCUMENTS.filter(d => d.employeeId === employee.id)
  const expenses = EXPENSE_REPORTS.filter(e => e.employeeId === employee.id)

  return (
    <div className="flex flex-col gap-6">
      <DetailHeader employee={employee} departmentName={department?.name ?? 'Unassigned'} />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="absences">Absences ({absences.length})</TabsTrigger>
          <TabsTrigger value="time">Time & Shifts</TabsTrigger>
          <TabsTrigger value="payroll">Payroll ({payslips.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
          <TabsTrigger value="expenses">Expenses ({expenses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <ContactCard employee={employee} />
            <EmploymentCard
              employee={employee}
              departmentName={department?.name ?? 'Unassigned'}
              manager={manager}
              directReportCount={directReports.length}
            />
          </div>
          <div className="flex flex-col gap-6">
            <LeaveBalanceCard employee={employee} />
            <SkillsCard skills={employee.skills} />
          </div>
        </TabsContent>

        <TabsContent value="absences" className="mt-4">
          <AbsencesCard absences={absences} />
        </TabsContent>

        <TabsContent value="time" className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ShiftsCard shifts={shifts} />
          <TimeEntriesCard entries={timeEntries} />
        </TabsContent>

        <TabsContent value="payroll" className="mt-4">
          <PayslipsCard payslips={payslips} />
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <DocumentsCard documents={documents} />
        </TabsContent>

        <TabsContent value="expenses" className="mt-4">
          <ExpensesCard expenses={expenses} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
