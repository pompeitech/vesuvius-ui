import type { EcommerceDashboardStats } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'

/** Products at or near zero stock — empty state when everything's healthy. */
export function LowStockCard({ stats }: { stats: EcommerceDashboardStats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Low Stock</CardTitle>
      </CardHeader>
      <CardContent>
        {stats.lowStockProducts.length === 0 ? (
          <p className="text-sm text-muted-foreground">Everything is well stocked.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {stats.lowStockProducts.map(product => (
              <li key={product.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate text-foreground">{product.name}</span>
                <Badge variant={product.stock === 0 ? 'destructive' : 'warning'}>
                  {product.stock} left
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
