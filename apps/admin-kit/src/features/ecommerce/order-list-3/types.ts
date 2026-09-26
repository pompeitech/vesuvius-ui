import type { OrderStatus } from '@pompeitech/mock-data'

export type StatusFilter = 'all' | OrderStatus
export type SortOption = 'date-desc' | 'date-asc' | 'total-desc' | 'total-asc'

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Date: Newest first', value: 'date-desc' },
  { label: 'Date: Oldest first', value: 'date-asc' },
  { label: 'Total: High to low', value: 'total-desc' },
  { label: 'Total: Low to high', value: 'total-asc' }
]
