import type { ProductWizardInput } from './schema'

/** Per-step sample data for the "Test data" quick-fill menu — realistic enough to exercise every field without typing. */
export const FAKE_DATA: Partial<ProductWizardInput>[] = [
  {
    returnable: true,
    hasVariants: false,
    name: 'Aurora Glow Vitamin C Serum',
    productType: 'Physical',
    category: 'Beauty',
    sku: 'SKU-GLOW-4471',
    barcode: '0194728501122',
    description: 'A lightweight vitamin C serum that brightens and evens skin tone with daily use.'
  },
  { currency: 'USD', basePrice: '58', unitCost: '21', discountedPrice: '45', chargeTax: true },
  { stock: '240', lowStockThreshold: '20', status: 'active' },
  { weight: '0.35', weightUnit: 'kg', length: '12', width: '6', height: '6', dimensionUnit: 'cm' }
]
