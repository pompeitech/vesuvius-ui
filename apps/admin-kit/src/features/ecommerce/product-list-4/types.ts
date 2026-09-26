export type StatusFilter = 'all' | 'active' | 'draft' | 'archived'
export type StockFilter = 'all' | 'Low' | 'Medium' | 'High'
export type SortOption = 'name-asc' | 'price-desc' | 'price-asc' | 'stock-desc'

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Alphabetical: A-Z', value: 'name-asc' },
  { label: 'Price: High to low', value: 'price-desc' },
  { label: 'Price: Low to high', value: 'price-asc' },
  { label: 'Stock: High to low', value: 'stock-desc' }
]
