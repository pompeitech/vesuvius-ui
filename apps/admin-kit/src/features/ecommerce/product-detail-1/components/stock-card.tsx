import type { Product } from '@pompeitech/mock-data'
import { Button, Card, CardContent, CardHeader, CardTitle, toast } from '@pompeitech/vesuvius-ui'
import { STOCK_LEVEL_TEXT_COLOR, stockLevel } from '../../_shared/stock-level'

/** Quantity on hand, its stock-level badge color, and the (unwired) adjust-stock action. */
export function StockCard({ product }: { product: Product }) {
  const level = stockLevel(product.stock)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="rounded-md border p-4 text-center">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Quantity at hand
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums">{product.stock.toLocaleString()}</p>
          <p className={`mt-1 text-sm font-medium ${STOCK_LEVEL_TEXT_COLOR[level]}`}>
            {level} stock
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => toast.info("Stock adjustments aren't wired up in this demo.")}
        >
          Adjust stock
        </Button>
      </CardContent>
    </Card>
  )
}
