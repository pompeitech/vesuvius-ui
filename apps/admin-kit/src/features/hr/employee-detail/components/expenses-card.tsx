import type { ExpenseReport } from '@pompeitech/mock-data'
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@pompeitech/vesuvius-ui'
import {
  EXPENSE_CATEGORY_LABEL,
  EXPENSE_STATUS_VARIANT,
  currency,
  dateFormatter
} from '../../_shared/format'

/** This employee's submitted expense reports, most recent first. */
export function ExpensesCard({ expenses }: { expenses: ExpenseReport[] }) {
  const sorted = [...expenses].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense reports</CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No expense reports submitted.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{EXPENSE_CATEGORY_LABEL[expense.category]}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {currency.format(expense.amount)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {dateFormatter.format(new Date(expense.date))}
                  </TableCell>
                  <TableCell>
                    <Badge variant={EXPENSE_STATUS_VARIANT[expense.status]} className="capitalize">
                      {expense.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
