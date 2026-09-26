import { Card, CardContent } from '@pompeitech/vesuvius-ui'
import { currency } from '../../_shared/format'

type StatCardsProps = {
  itemCount: number
  subtotal: number
  total: number
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
        <p className="mt-1 text-3xl font-bold tabular-nums">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  )
}

/** The three summary cards above the item lineup: item count, subtotal, and grand total. */
export function StatCards({ itemCount, subtotal, total }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Items" value={String(itemCount)} hint="Units across every line" />
      <StatCard
        label="Subtotal"
        value={currency.format(subtotal)}
        hint="Before shipping, tax, and discount"
      />
      <StatCard
        label="Total"
        value={currency.format(total)}
        hint="Amount charged to the customer"
      />
    </div>
  )
}
