import type { Product } from '@pompeitech/mock-data'
import { z } from 'zod'

export const PRODUCT_TYPES = ['Physical', 'Digital', 'Service', 'Subscription']

export const productWizardSchema = z.object({
  // Step 1 — Product Basics
  returnable: z.boolean(),
  hasVariants: z.boolean(),
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  productType: z.string().min(1, 'Select a product type.'),
  category: z.string().min(1, 'Select a category.'),
  sku: z.string().min(1, 'SKU is required.'),
  barcode: z.string().optional(),
  description: z.string().optional(),
  // Step 2 — Pricing Model
  currency: z.string().min(1),
  basePrice: z.coerce.number().min(0, 'Base price must be 0 or more.'),
  unitCost: z.coerce.number().min(0, 'Unit cost must be 0 or more.'),
  discountedPrice: z.coerce.number().min(0).optional(),
  chargeTax: z.boolean(),
  // Step 3 — Inventory Rules
  stock: z.coerce.number().int().min(0, 'Stock must be 0 or more.'),
  lowStockThreshold: z.coerce.number().int().min(0, 'Must be 0 or more.'),
  status: z.enum(['active', 'draft', 'archived']),
  // Step 4 — Dimensions & Units
  weight: z.coerce.number().min(0, 'Must be 0 or more.'),
  weightUnit: z.enum(['kg', 'lb']),
  length: z.coerce.number().min(0, 'Must be 0 or more.'),
  width: z.coerce.number().min(0, 'Must be 0 or more.'),
  height: z.coerce.number().min(0, 'Must be 0 or more.'),
  dimensionUnit: z.enum(['cm', 'in'])
})

export type ProductWizardInput = z.input<typeof productWizardSchema>
export type ProductWizardOutput = z.output<typeof productWizardSchema>

/** Which fields belong to which step — same order as `STEP_META` and the step components. */
export const STEP_FIELDS: (keyof ProductWizardInput)[][] = [
  ['returnable', 'hasVariants', 'name', 'productType', 'category', 'sku', 'barcode', 'description'],
  ['currency', 'basePrice', 'unitCost', 'discountedPrice', 'chargeTax'],
  ['stock', 'lowStockThreshold', 'status'],
  ['weight', 'weightUnit', 'length', 'width', 'height', 'dimensionUnit']
]

export const STEP_META: { title: string; description: string }[] = [
  { title: 'Product Basics', description: 'Identity & media' },
  { title: 'Pricing Model', description: 'Price & tax' },
  { title: 'Inventory Rules', description: 'Stock & status' },
  { title: 'Dimensions & Units', description: 'Weight & size' }
]

export const PRODUCT_WIZARD_DEFAULT_VALUES: ProductWizardInput = {
  returnable: true,
  hasVariants: false,
  name: '',
  productType: '',
  category: '',
  sku: '',
  barcode: '',
  description: '',
  currency: 'USD',
  basePrice: '0',
  unitCost: '0',
  discountedPrice: undefined,
  chargeTax: false,
  stock: '0',
  lowStockThreshold: '10',
  status: 'draft',
  weight: '0',
  weightUnit: 'kg',
  length: '0',
  width: '0',
  height: '0',
  dimensionUnit: 'cm'
}

/** Maps a catalog `Product` onto the wizard's shape — used to prefill Edit Product 2. */
export function productToWizardValues(product: Product): ProductWizardInput {
  return {
    returnable: true,
    hasVariants: product.variantCount > 0,
    name: product.name,
    productType: 'Physical',
    category: product.category,
    sku: product.sku,
    barcode: product.barcode,
    description: product.description,
    currency: 'USD',
    basePrice: String(product.price),
    unitCost: String(product.cost),
    discountedPrice: undefined,
    chargeTax: true,
    stock: String(product.stock),
    lowStockThreshold: '10',
    status: product.status,
    weight: String(product.weight),
    weightUnit: 'kg',
    length: '0',
    width: '0',
    height: '0',
    dimensionUnit: 'cm'
  }
}
