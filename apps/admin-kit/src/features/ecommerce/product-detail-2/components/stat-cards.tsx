import { Card, CardContent } from '@pompeitech/vesuvius-ui'

type StatCardsProps = {
  totalStock: number
  lowStockCount: number
  averageStock: number
  variantCount: number
}

function StatCard({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
        <p className="mt-1 text-3xl font-bold tabular-nums">{value.toLocaleString()}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  )
}

/** The three summary cards above the variant lineup: total, low, and average stock. */
export function StatCards({
  totalStock,
  lowStockCount,
  averageStock,
  variantCount
}: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        label="Total stock"
        value={totalStock}
        hint={`Across ${variantCount} active variants`}
      />
      <StatCard
        label="Low stock"
        value={lowStockCount}
        hint="Variants below the 20-unit threshold"
      />
      <StatCard label="Average stock" value={averageStock} hint="Average units held per variant" />
    </div>
  )
}
