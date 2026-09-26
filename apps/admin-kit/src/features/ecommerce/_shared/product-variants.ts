import type { Product } from '@pompeitech/mock-data'

export type ProductVariantRow = {
  id: string
  name: string
  option: string
  sku: string
  stock: number
  retailPrice: number
  wholesalePrice: number
  isPrimary: boolean
  lowStock: boolean
}

const VARIANT_NAMES = [
  'Ocean',
  'Sand',
  'Stone',
  'Rose',
  'Clay',
  'Moss',
  'Ash',
  'Coral',
  'Ivory',
  'Slate'
]

/**
 * The catalog only stores a `variantCount` per product (no per-variant rows
 * — see packages/mock-data), so Product Detail's variant lineup derives a
 * plausible-looking breakdown from it: names cycle through a fixed pool,
 * stock is split across variants (front-loaded — the "primary" variant
 * carries the biggest share), pricing matches the parent product. Purely
 * presentational and recomputed on every render — nothing here is stored.
 */
export function generateProductVariants(product: Product): ProductVariantRow[] {
  const count = product.variantCount
  if (count <= 0) return []

  const weights = Array.from({ length: count }, (_, i) => count - i)
  const totalWeight = weights.reduce((sum, w) => sum + w, 0)

  return weights.map((weight, i) => {
    const name = VARIANT_NAMES[i % VARIANT_NAMES.length] as string
    const option = product.tags[i % product.tags.length] ?? 'Standard'
    const stock = Math.max(0, Math.round((product.stock * weight) / totalWeight))
    // Later variants trend cheaper than the primary one (smaller size/lighter
    // bundle), down to 60% of the parent price for the last variant — so the
    // "price band" on Product Detail 2 shows a real range instead of a flat
    // repeat of the same number.
    const priceMultiplier = count > 1 ? 1 - (i / (count - 1)) * 0.4 : 1
    return {
      id: `${product.id}-variant-${i}`,
      name,
      option,
      sku: `${product.sku}-${name.slice(0, 3).toUpperCase()}`,
      stock,
      retailPrice: Math.round(product.price * priceMultiplier * 100) / 100,
      wholesalePrice: Math.round(product.wholesalePrice * priceMultiplier * 100) / 100,
      isPrimary: i === 0,
      lowStock: stock <= 20
    }
  })
}
