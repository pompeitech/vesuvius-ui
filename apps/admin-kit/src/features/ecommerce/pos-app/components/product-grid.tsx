import type { Product } from '@pompeitech/mock-data'
import { ProductCard } from './product-card'

type ProductGridProps = {
  products: Product[]
  onAdd: (product: Product) => void
}

export function ProductGrid({ products, onAdd }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">No products match these filters.</p>
      </div>
    )
  }

  return (
    <div className="grid min-h-0 flex-1 auto-rows-min grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAdd={() => onAdd(product)} />
      ))}
    </div>
  )
}
