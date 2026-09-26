import type { BadgeProps } from '@pompeitech/vesuvius-ui'
import type { ProductStatus } from '@pompeitech/mock-data'

export const PRODUCT_STATUS_VARIANT: Record<ProductStatus, BadgeProps['variant']> = {
  active: 'success',
  draft: 'secondary',
  archived: 'outline'
}

export const PRODUCT_STATUS_OPTIONS: { label: string; value: ProductStatus }[] = [
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archived', value: 'archived' }
]
