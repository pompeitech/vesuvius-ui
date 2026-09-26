import type { PayrollRunRow } from '@pompeitech/mock-data'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  UserAvatar
} from '@pompeitech/vesuvius-ui'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { currency, SALARY_TYPE_LABEL } from '../../_shared/format'

/** Per-employee payslip breakdown, mirroring a real payroll run's line items. */
export function EmployeeTable({ rows }: { rows: PayrollRunRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead className="text-right">Gross Salary</TableHead>
          <TableHead className="text-right">Days Worked</TableHead>
          <TableHead className="text-right">Reimbursements</TableHead>
          <TableHead className="text-right">Extra Items</TableHead>
          <TableHead className="text-right">Net Pay</TableHead>
          <TableHead className="text-right">Var.</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ employee, payslip, netPayVariation }) => (
          <TableRow key={payslip.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <UserAvatar name={employee.name} src={employee.avatarUrl} size="sm" />
                <div className="min-w-0">
                  <p className="truncate font-medium">{employee.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{employee.jobTitle}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <p className="tabular-nums">{currency.format(payslip.grossSalary)}</p>
              <p className="text-xs text-muted-foreground">
                {SALARY_TYPE_LABEL[payslip.salaryType]}
              </p>
            </TableCell>
            <TableCell className="text-right tabular-nums">{payslip.daysWorked}</TableCell>
            <TableCell className="text-right tabular-nums">
              {payslip.expenseReimbursement > 0
                ? currency.format(payslip.expenseReimbursement)
                : '-'}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {payslip.extraItems > 0 ? currency.format(payslip.extraItems) : '-'}
            </TableCell>
            <TableCell className="text-right">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-default font-medium tabular-nums underline decoration-dotted underline-offset-4">
                    {currency.format(payslip.netPay)}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p className="font-medium">Net pay</p>
                  <p>This period: {currency.format(payslip.netPay)}</p>
                  {payslip.previousNetPay !== undefined && (
                    <p>Previous: {currency.format(payslip.previousNetPay)}</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell className="text-right">
              {netPayVariation === undefined ? (
                <span className="text-muted-foreground">-</span>
              ) : (
                <span
                  className={`inline-flex items-center gap-1 tabular-nums ${netPayVariation >= 0 ? 'text-success' : 'text-destructive'}`}
                >
                  {netPayVariation >= 0 ? (
                    <TrendingUpIcon className="size-3.5" />
                  ) : (
                    <TrendingDownIcon className="size-3.5" />
                  )}
                  {Math.abs(netPayVariation)}%
                </span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
