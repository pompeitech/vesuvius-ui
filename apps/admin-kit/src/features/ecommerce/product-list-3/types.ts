import type { Product } from '@pompeitech/mock-data'

export type SortOption = 'newest' | 'oldest' | 'price-desc' | 'price-asc' | 'name-asc'
export type StockFilter = 'all' | 'Low' | 'Medium' | 'High'

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Price: High to low', value: 'price-desc' },
  { label: 'Price: Low to high', value: 'price-asc' },
  { label: 'Alphabetical: A-Z', value: 'name-asc' }
]

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products]
  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    case 'oldest':
      return sorted.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
  }
}
