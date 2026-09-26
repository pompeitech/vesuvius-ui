import type { Product } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  toast
} from '@pompeitech/vesuvius-ui'
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import type { ProductVariantRow } from '../../_shared/product-variants'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

type VariantRowProps = {
  product: Product
  variant: ProductVariantRow
  focused: boolean
  onFocus: () => void
}

/** One row in the variant lineup — click to focus it, or open its own edit/remove menu. */
export function VariantRow({ product, variant, focused, onFocus }: VariantRowProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onFocus}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onFocus()
        }
      }}
      className={cn(
        'flex items-center gap-4 rounded-md border p-3 text-left transition-colors',
        focused ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
      )}
    >
      <img
        src={product.imageUrl}
        alt={variant.name}
        className="size-12 shrink-0 rounded-md border object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">
            {variant.name} / {variant.option}
          </span>
          {variant.isPrimary && <Badge>Primary</Badge>}
        </div>
        <p className="truncate text-sm text-muted-foreground">
          {variant.sku} · Stock: {variant.stock}{' '}
          {variant.lowStock && <span className="font-medium text-destructive">low</span>}
        </p>
      </div>
      <div className="w-24 shrink-0 text-right">
        <p className="text-xs text-muted-foreground uppercase">Retail</p>
        <p className="font-semibold tabular-nums">{currency.format(variant.retailPrice)}</p>
      </div>
      <div className="w-24 shrink-0 text-right">
        <p className="text-xs text-muted-foreground uppercase">Wholesale</p>
        <p className="font-semibold tabular-nums">{currency.format(variant.wholesalePrice)}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            onClick={event => event.stopPropagation()}
          >
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">Variant actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => toast.info("Editing individual variants isn't wired up in this demo.")}
          >
            <PencilIcon />
            Edit variant
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => toast.success(`Removed "${variant.name} / ${variant.option}".`)}
          >
            <TrashIcon />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
