import type { Employee } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, Progress } from '@pompeitech/vesuvius-ui'

function BalanceRow({
  label,
  used,
  total,
  unit
}: {
  label: string
  used: number
  total: number
  unit: string
}) {
  const left = total - used
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {left} {unit} left of {total}
        </span>
      </div>
      <Progress value={(used / total) * 100} className="mt-2" />
    </div>
  )
}

/** Vacation days and ROL hours used vs. the annual allowance. */
export function LeaveBalanceCard({ employee }: { employee: Employee }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave balance</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <BalanceRow
          label="Vacation"
          used={employee.vacationDaysUsed}
          total={employee.vacationDaysTotal}
          unit="days"
        />
        <BalanceRow
          label="ROL"
          used={employee.rolHoursUsed}
          total={employee.rolHoursTotal}
          unit="hours"
        />
      </CardContent>
    </Card>
  )
}
