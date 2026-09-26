import { z } from 'zod'

export const productStatusSchema = z.enum(['active', 'draft', 'archived'])
export type ProductStatus = z.infer<typeof productStatusSchema>

/** Which catalog(s) a product is listed in — drives Product List 4's "Product type" filter. */
export const productChannelSchema = z.enum(['retail', 'wholesale'])
export type ProductChannel = z.infer<typeof productChannelSchema>

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  barcode: z.string(),
  category: z.string(),
  vendor: z.string(),
  description: z.string(),
  /** Direct storefront price. */
  price: z.number(),
  /** Partner/bulk price — always <= `price`. */
  wholesalePrice: z.number(),
  /** Unit cost, for margin/profit widgets. */
  cost: z.number(),
  stock: z.number().int(),
  status: productStatusSchema,
  imageUrl: z.string(),
  rating: z.number().min(0).max(5),
  /** Merchandising/material descriptor chips, e.g. "Retail", "Dropship", "Subscription". */
  tags: z.array(z.string()),
  /** Number of size/color/bundle variants under this SKU family. */
  variantCount: z.number().int(),
  /** Catalog(s) this product is listed in — at least one. */
  channels: z.array(productChannelSchema).min(1),
  /** Shipping weight in kg. */
  weight: z.number(),
  createdAt: z.string()
})

export type Product = z.infer<typeof productSchema>
