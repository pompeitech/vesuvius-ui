import { schemaHelper } from '@admin/form'

import type { Product } from '@pompeitech/mock-data'
import { z } from 'zod'

// Mirrors the fixed category set the mock catalog is generated from
// (packages/mock-data/src/generators/dataset.ts) so a product created here
// lines up with the ones already in the product lists.
export const PRODUCT_FORM_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Toys'
]
export const CURRENCIES = ['USD', 'EUR', 'GBP']
export const VARIANT_OPTIONS = ['Size', 'Color', 'Material', 'Volume', 'Bundle']

const variantSchema = z.object({
  option: z.string().min(1, 'Pick an option.'),
  value: z.string().min(1, 'Enter a value.'),
  price: z.coerce.number().min(0, 'Must be 0 or more.'),
  quantity: z.coerce.number().int('Whole numbers only.').min(0, 'Must be 0 or more.')
})

export const productFormSchema = z.object({
  thumbnail: schemaHelper.file(),
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  sku: z.string().min(1, 'SKU is required.'),
  barcode: z.string().optional(),
  description: z.string().optional(),
  gallery: z.array(z.custom<File | string>()).default([]),
  basePrice: z.coerce.number().min(0, 'Base price must be 0 or more.'),
  wholesalePrice: z.coerce.number().min(0, 'Wholesale price must be 0 or more.').optional(),
  cost: z.coerce.number().min(0, 'Unit cost must be 0 or more.').optional(),
  discountedPrice: z.coerce.number().min(0).optional(),
  currency: z.string().min(1),
  chargeTax: z.boolean(),
  inStock: z.boolean(),
  status: z.enum(['active', 'draft', 'archived']),
  vendor: z.string().optional(),
  category: z.string().min(1, 'Select a category.'),
  subCategory: z.string().optional(),
  tags: z.string().optional(),
  variants: z.array(variantSchema)
})

export type ProductFormInput = z.input<typeof productFormSchema>
export type ProductFormOutput = z.output<typeof productFormSchema>

export const PRODUCT_FORM_DEFAULT_VALUES: ProductFormInput = {
  thumbnail: null,
  name: '',
  sku: '',
  barcode: '',
  description: '',
  gallery: [],
  basePrice: '0',
  wholesalePrice: '0',
  cost: '0',
  discountedPrice: undefined,
  currency: 'USD',
  chargeTax: false,
  inStock: true,
  status: 'draft',
  vendor: '',
  category: '',
  subCategory: '',
  tags: '',
  variants: []
}

/** Maps a catalog `Product` onto the form's shape — used to prefill Edit Product. */
export function productToFormValues(product: Product): ProductFormInput {
  return {
    thumbnail: product.imageUrl,
    name: product.name,
    sku: product.sku,
    barcode: product.barcode,
    description: product.description,
    gallery: [],
    basePrice: String(product.price),
    wholesalePrice: String(product.wholesalePrice),
    cost: String(product.cost),
    discountedPrice: undefined,
    currency: 'USD',
    chargeTax: true,
    inStock: product.stock > 0,
    status: product.status,
    vendor: product.vendor,
    category: product.category,
    subCategory: '',
    tags: product.tags.join(', '),
    variants: []
  }
}
