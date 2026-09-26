import type { Product } from '@pompeitech/mock-data'
import { Card, Typography } from '@pompeitech/vesuvius-ui'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

/** A photo-forward card that expands to show the description on click. */
export function ProductGalleryCard({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="gap-0 overflow-hidden p-0">
      <img src={product.imageUrl} alt="" className="h-44 w-full object-cover" />
      <div className="flex flex-col gap-2 p-4">
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="flex items-center justify-between gap-2 text-left"
        >
          <div className="min-w-0">
            <Typography variant="small" className="truncate font-semibold">
              {product.name}
            </Typography>
            <p className="truncate text-xs text-muted-foreground">{product.category}</p>
          </div>
          <ChevronDownIcon
            className={`size-4 shrink-0 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
        {expanded && <p className="text-xs text-muted-foreground">{product.description}</p>}
        <div className="mt-1 flex items-center justify-between text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-semibold tabular-nums">{currency.format(product.price)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Stock</p>
            <p className="font-semibold tabular-nums">{product.stock.toLocaleString()} units</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
