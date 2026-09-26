import type { Product } from '@pompeitech/mock-data'
import { Card } from '@pompeitech/vesuvius-ui'
import { currency } from '../../_shared/format'

type ProductCardProps = {
  product: Product
  onAdd: () => void
}

/** A tappable catalog tile — click anywhere on the card to add one to the cart (no separate "Add" button, same one-tap interaction as a real POS screen). */
export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onAdd}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onAdd()
        }
      }}
      className="cursor-pointer gap-2 overflow-hidden p-0 transition-colors hover:border-primary"
    >
      <img src={product.imageUrl} alt="" className="aspect-square w-full object-cover" />
      <div className="flex flex-col gap-0.5 px-3 pb-3">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="truncate text-xs text-muted-foreground">{product.category}</p>
        <p className="font-semibold text-primary tabular-nums">{currency.format(product.price)}</p>
      </div>
    </Card>
  )
}
