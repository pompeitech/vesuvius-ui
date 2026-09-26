import type { Product } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  Card,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography
} from '@pompeitech/vesuvius-ui'
import { CopyIcon, EyeIcon, MoreHorizontalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { PRODUCT_STATUS_VARIANT } from '../../_shared/product-status'
import { STOCK_LEVEL_BAR_COLOR, stockLevel } from '../../_shared/stock-level'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

type ProductCardProps = {
  product: Product
  onEdit: (product: Product) => void
  onView: (product: Product) => void
  onDuplicate: (product: Product) => void
  onDelete: (product: Product) => void
}

/** One inventory-first card: identity, tags, retail/wholesale price, and a stock bar. */
export function ProductCard({ product, onEdit, onView, onDuplicate, onDelete }: ProductCardProps) {
  const level = stockLevel(product.stock)
  const visibleTags = product.tags.slice(0, 2)
  const extraTags = product.tags.length - visibleTags.length

  return (
    <Card className="gap-3 p-4">
      <div className="flex items-start gap-3">
        <img
          src={product.imageUrl}
          alt=""
          className="size-12 shrink-0 rounded-md border object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Typography variant="small" className="truncate font-semibold">
              {product.name}
            </Typography>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="-mt-1 size-7 shrink-0">
                  <MoreHorizontalIcon className="size-4" />
                  <span className="sr-only">Open actions for {product.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(product)}>
                  <PencilIcon />
                  Edit product
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onView(product)}>
                  <EyeIcon />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDuplicate(product)}>
                  <CopyIcon />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onDelete(product)}>
                  <TrashIcon />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="truncate">{product.sku}</span>
            <Badge variant={PRODUCT_STATUS_VARIANT[product.status]} className="capitalize">
              {product.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {visibleTags.map(tag => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
        {extraTags > 0 && (
          <Badge variant="outline" className="text-xs">
            +{extraTags}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 border-t pt-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase">Retail</p>
          <p className="text-sm font-semibold tabular-nums">{currency.format(product.price)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase">Wholesale</p>
          <p className="text-sm font-semibold tabular-nums">
            {currency.format(product.wholesalePrice)}
          </p>
        </div>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn('h-full rounded-full', STOCK_LEVEL_BAR_COLOR[level])}
          style={{ width: `${Math.min(100, (product.stock / 500) * 100)}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {product.stock.toLocaleString()} stock ·{' '}
          <span className={cn('font-medium', STOCK_LEVEL_BAR_COLOR[level].replace('bg-', 'text-'))}>
            {level}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Variants ({product.variantCount})</span>
          <Button variant="outline" size="sm" className="h-7" onClick={() => onEdit(product)}>
            Edit
          </Button>
        </div>
      </div>
    </Card>
  )
}
