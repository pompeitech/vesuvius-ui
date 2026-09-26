import type { Product } from '@pompeitech/mock-data'
import { Card } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { stockLevel } from '../../_shared/stock-level'

const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

function StatMiniCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="gap-1 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
    </Card>
  )
}

/** Total/active/low-stock counts plus total inventory value, computed from the full catalog. */
export function SummaryCards({ products }: { products: Product[] }) {
  const stats = useMemo(() => {
    const activeListings = products.filter(p => p.status === 'active').length
    const lowStockItems = products.filter(p => stockLevel(p.stock) === 'Low').length
    const inventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
    return { total: products.length, activeListings, lowStockItems, inventoryValue }
  }, [products])

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatMiniCard label="Total Products" value={stats.total} />
      <StatMiniCard label="Active Listings" value={stats.activeListings} />
      <StatMiniCard label="Low Stock Items" value={stats.lowStockItems} />
      <StatMiniCard label="Inventory Value" value={compactCurrency.format(stats.inventoryValue)} />
    </div>
  )
}
