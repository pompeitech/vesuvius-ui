import type { Product } from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import type { ProductVariantRow } from '../../_shared/product-variants'
import { VariantRow } from './variant-row'

type VariantLineupProps = {
  product: Product
  variants: ProductVariantRow[]
  focusedId: string | undefined
  onFocus: (variant: ProductVariantRow) => void
}

/** The clickable variant list — selecting a row updates the preview panel's photo and summary. */
export function VariantLineup({ product, variants, focusedId, onFocus }: VariantLineupProps) {
  return (
    <div>
      <Typography variant="p" className="font-medium">
        Variant lineup
      </Typography>
      <Typography variant="muted">
        Click any row to update the media focus and selected context.
      </Typography>
      <div className="mt-3 flex flex-col gap-3">
        {variants.map(variant => (
          <VariantRow
            key={variant.id}
            product={product}
            variant={variant}
            focused={focusedId === variant.id}
            onFocus={() => onFocus(variant)}
          />
        ))}
      </div>
    </div>
  )
}
