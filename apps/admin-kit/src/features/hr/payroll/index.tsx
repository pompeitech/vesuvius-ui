import { getPayrollPeriods, type PayrollPeriodSummary } from '@pompeitech/mock-data'
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography
} from '@pompeitech/vesuvius-ui'
import { ChevronRightIcon } from 'lucide-react'
import { useLoaderData, useNavigate } from 'react-router'
import { currency } from '../_shared/format'

export async function loader() {
  return getPayrollPeriods()
}

export function Component() {
  const periods = useLoaderData() as PayrollPeriodSummary[]
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Payroll
        </Typography>
        <Typography variant="muted">
          Every processed payroll run — open one for the per-employee breakdown.
        </Typography>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Employees</TableHead>
                <TableHead className="text-right">Total Net Pay</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {periods.map(period => (
                <TableRow
                  key={period.period}
                  className="cursor-pointer"
                  onClick={() => navigate(`/hr/payroll-detail/${period.period}`)}
                >
                  <TableCell className="font-medium">{period.label}</TableCell>
                  <TableCell className="text-right tabular-nums">{period.employeeCount}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {currency.format(period.totalNetPay)}
                  </TableCell>
                  <TableCell>
                    <ChevronRightIcon className="size-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
