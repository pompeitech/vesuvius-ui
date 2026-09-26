import type { PayrollRun } from '@pompeitech/mock-data'
import { Card, CardContent } from '@pompeitech/vesuvius-ui'
import { currency } from '../../_shared/format'

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
        <p className="mt-1 text-2xl font-bold tabular-nums">{currency.format(value)}</p>
      </CardContent>
    </Card>
  )
}

/** Total payslips, tax & contributions, and full company cost for the run. */
export function SummaryCards({ run }: { run: PayrollRun }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <SummaryCard label="Total payslips" value={run.totalNetPay} />
      <SummaryCard label="Tax & contributions" value={run.totalTaxAndContributions} />
      <SummaryCard label="Company cost" value={run.totalCompanyCost} />
    </div>
  )
}
