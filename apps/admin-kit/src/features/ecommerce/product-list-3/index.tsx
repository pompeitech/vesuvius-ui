import { Button, Typography } from '@pompeitech/vesuvius-ui'
import { getProducts, type Product } from '@pompeitech/mock-data'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { stockLevel } from '../_shared/stock-level'
import { FiltersBar } from './components/filters-bar'
import { ProductGalleryCard } from './components/product-gallery-card'
import { SummaryCards } from './components/summary-cards'
import { sortProducts, type SortOption, type StockFilter } from './types'

export async function loader() {
  const result = await getProducts({ pageSize: 200 })
  return result.data
}

export function Component() {
  const products = useLoaderData() as Product[]
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')
  const [stock, setStock] = useState<StockFilter>('all')

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase()
    const rows = products.filter(product => {
      if (stock !== 'all' && stockLevel(product.stock) !== stock) return false
      if (needle && !product.name.toLowerCase().includes(needle)) return false
      return true
    })
    return sortProducts(rows, sort)
  }, [products, search, sort, stock])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            My Products
          </Typography>
          <Typography variant="muted">Manage and collaborate on your product listings.</Typography>
        </div>
        <Button onClick={() => navigate('/ecommerce/add-product')}>
          <PlusIcon />
          New Products
        </Button>
      </div>

      <SummaryCards products={products} />
      <FiltersBar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        stock={stock}
        onStockChange={setStock}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map(product => (
          <ProductGalleryCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
