import type { Product } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  toast
} from '@pompeitech/vesuvius-ui'
import { CopyIcon, EyeIcon, MoreHorizontalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { useNavigate } from 'react-router'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

/** One dense merchandiser row: thumbnail, identity, retail/wholesale price, and row actions. */
export function ProductRow({ product }: { product: Product }) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-4 p-3">
      <img
        src={product.imageUrl}
        alt=""
        className="size-12 shrink-0 rounded-md border object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{product.name}</span>
          {product.variantCount > 0 && (
            <Badge variant="outline" className="shrink-0">
              {product.variantCount} variants
            </Badge>
          )}
        </div>
        <p className="truncate text-sm text-muted-foreground">
          {product.category} ·{' '}
          {product.channels
            .map(c => (c === 'retail' ? 'Retail catalog' : 'Wholesale catalog'))
            .join(' · ')}{' '}
          · {product.stock.toLocaleString()} in stock
        </p>
      </div>
      <div className="w-28 shrink-0 text-right">
        <p className="text-xs text-muted-foreground uppercase">Retail price</p>
        <p className="font-semibold tabular-nums">{currency.format(product.price)}</p>
      </div>
      <div className="w-28 shrink-0 text-right">
        <p className="text-xs text-muted-foreground uppercase">Wholesale price</p>
        <p className="font-semibold tabular-nums">{currency.format(product.wholesalePrice)}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 shrink-0">
            <MoreHorizontalIcon />
            <span className="sr-only">Open actions for {product.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate(`/ecommerce/edit-product/${product.id}`)}>
            <PencilIcon />
            Edit product
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/ecommerce/product-detail-1/${product.id}`)}>
            <EyeIcon />
            View details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.success(`Duplicated "${product.name}".`)}>
            <CopyIcon />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => toast.success(`Deleted "${product.name}".`)}
          >
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
