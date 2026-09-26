import { EMPLOYEES, PAYSLIPS } from '../generators/dataset'
import type { Employee } from '../schemas/employee'
import type { Payslip } from '../schemas/payslip'

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function pctChange(current: number, previous: number): number {
  if (previous === 0) return current === 0 ? 0 : 100
  return Math.round(((current - previous) / previous) * 1000) / 10
}

const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

/** "2026-03" -> "March 2026". */
export function payrollPeriodLabel(period: string): string {
  const [year, month] = period.split('-').map(Number)
  return `${MONTH_LABELS[(month ?? 1) - 1]} ${year}`
}

/** Employer contributions on top of gross pay — same flat assumption used for every payroll widget here. */
const EMPLOYER_CONTRIBUTION_RATIO = 0.29

export type PayrollPeriodSummary = {
  period: string
  label: string
  employeeCount: number
  totalNetPay: number
}

/** One row per payroll run (a period), most recent first — the Payroll list page. */
export async function getPayrollPeriods(): Promise<PayrollPeriodSummary[]> {
  await delay(300)
  const periods = new Map<string, Payslip[]>()
  for (const payslip of PAYSLIPS) {
    periods.set(payslip.period, [...(periods.get(payslip.period) ?? []), payslip])
  }
  return [...periods.entries()]
    .map(([period, payslips]) => ({
      period,
      label: payrollPeriodLabel(period),
      employeeCount: payslips.length,
      totalNetPay: Number(payslips.reduce((sum, p) => sum + p.netPay, 0).toFixed(2))
    }))
    .sort((a, b) => b.period.localeCompare(a.period))
}

export type PayrollRunRow = {
  employee: Employee
  payslip: Payslip
  /** % change vs. `payslip.previousNetPay`, undefined for an employee's first payslip. */
  netPayVariation: number | undefined
}

export type PayrollRun = {
  period: string
  label: string
  totalNetPay: number
  /** Mock "F24" total — the combined tax + social-contribution payment Italian payroll runs settle each month. */
  totalTaxAndContributions: number
  /** Gross pay + employer-side contributions — the run's full cost to the company. */
  totalCompanyCost: number
  rows: PayrollRunRow[]
}

/** The full breakdown for one payroll run — the Payroll Detail page. Undefined if the period doesn't exist. */
export function getPayrollRun(period: string): PayrollRun | undefined {
  const payslips = PAYSLIPS.filter(p => p.period === period)
  if (payslips.length === 0) return undefined

  const rows: PayrollRunRow[] = payslips
    .map(payslip => {
      const employee = EMPLOYEES.find(e => e.id === payslip.employeeId)
      if (!employee) return undefined
      return {
        employee,
        payslip,
        netPayVariation:
          payslip.previousNetPay !== undefined
            ? pctChange(payslip.netPay, payslip.previousNetPay)
            : undefined
      }
    })
    .filter((row): row is PayrollRunRow => row !== undefined)

  const monthlyGross = (payslip: Payslip) =>
    payslip.salaryType === 'annual' ? payslip.grossSalary / 12 : payslip.grossSalary
  const totalGross = rows.reduce((sum, row) => sum + monthlyGross(row.payslip), 0)
  const totalNetPay = rows.reduce((sum, row) => sum + row.payslip.netPay, 0)

  return {
    period,
    label: payrollPeriodLabel(period),
    totalNetPay: Number(totalNetPay.toFixed(2)),
    totalTaxAndContributions: Number((totalGross - totalNetPay).toFixed(2)),
    totalCompanyCost: Number((totalGross * (1 + EMPLOYER_CONTRIBUTION_RATIO)).toFixed(2)),
    rows
  }
}
