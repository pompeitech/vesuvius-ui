import type { Payslip } from '@pompeitech/mock-data'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@pompeitech/vesuvius-ui'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { currency, SALARY_TYPE_LABEL } from '../../_shared/format'

const periodFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })

function periodLabel(period: string): string {
  const [year, month] = period.split('-').map(Number)
  if (!year || !month) return period
  return periodFormatter.format(new Date(year, month - 1, 1))
}

function variation(payslip: Payslip): number | undefined {
  if (payslip.previousNetPay === undefined || payslip.previousNetPay === 0) return undefined
  return (
    Math.round(((payslip.netPay - payslip.previousNetPay) / payslip.previousNetPay) * 1000) / 10
  )
}

/** This employee's payslip history, most recent payroll run first. */
export function PayslipsCard({ payslips }: { payslips: Payslip[] }) {
  const sorted = [...payslips].sort((a, b) => b.period.localeCompare(a.period))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payslips</CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No payslips issued yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Gross salary</TableHead>
                <TableHead className="text-right">Days worked</TableHead>
                <TableHead className="text-right">Net pay</TableHead>
                <TableHead className="text-right">Var.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map(payslip => {
                const netPayVariation = variation(payslip)
                return (
                  <TableRow key={payslip.id}>
                    <TableCell className="font-medium">{periodLabel(payslip.period)}</TableCell>
                    <TableCell className="text-right">
                      <p className="tabular-nums">{currency.format(payslip.grossSalary)}</p>
                      <p className="text-xs text-muted-foreground">
                        {SALARY_TYPE_LABEL[payslip.salaryType]}
                      </p>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{payslip.daysWorked}</TableCell>
                    <TableCell className="text-right">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-default font-medium tabular-nums underline decoration-dotted underline-offset-4">
                            {currency.format(payslip.netPay)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p className="font-medium">Net pay breakdown</p>
                          {payslip.expenseReimbursement > 0 && (
                            <p>Reimbursements: {currency.format(payslip.expenseReimbursement)}</p>
                          )}
                          {payslip.extraItems > 0 && (
                            <p>Extra items: {currency.format(payslip.extraItems)}</p>
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
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
