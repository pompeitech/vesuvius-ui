import { Badge, Typography } from '@pompeitech/vesuvius-ui'
import { getProducts, type Product, type ProductChannel } from '@pompeitech/mock-data'
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import { stockLevel } from '../_shared/stock-level'
import { FiltersSidebar } from './components/filters-sidebar'
import { ProductRow } from './components/product-row'
import type { SortOption, StatusFilter, StockFilter } from './types'

export async function loader() {
  const result = await getProducts({ pageSize: 200 })
  return result.data
}

export function Component() {
  const products = useLoaderData() as Product[]

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [channel, setChannel] = useState<ProductChannel | 'all'>('all')
  const [sort, setSort] = useState<SortOption>('name-asc')
  const [stock, setStock] = useState<StockFilter>('all')
  const [category, setCategory] = useState<string>('all')

  const categories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))).sort(),
    [products]
  )

  const statusCounts = useMemo(
    () => ({
      all: products.length,
      active: products.filter(p => p.status === 'active').length,
      draft: products.filter(p => p.status === 'draft').length,
      archived: products.filter(p => p.status === 'archived').length
    }),
    [products]
  )

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase()
    const rows = products.filter(product => {
      if (status !== 'all' && product.status !== status) return false
      if (channel !== 'all' && !product.channels.includes(channel)) return false
      if (stock !== 'all' && stockLevel(product.stock) !== stock) return false
      if (category !== 'all' && product.category !== category) return false
      if (needle && !product.name.toLowerCase().includes(needle)) return false
      return true
    })
    const sorted = [...rows]
    switch (sort) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price)
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price)
      case 'stock-desc':
        return sorted.sort((a, b) => b.stock - a.stock)
    }
  }, [products, search, status, channel, stock, category, sort])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Product List 4
        </Typography>
        <Typography variant="muted">
          Sidebar-driven catalog filtering with dense merchandiser rows.
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <FiltersSidebar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          statusCounts={statusCounts}
          channel={channel}
          onChannelChange={setChannel}
          sort={sort}
          onSortChange={setSort}
          stock={stock}
          onStockChange={setStock}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
        />

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{filtered.length} products</Badge>
          </div>
          <Typography variant="muted" className="mb-2">
            Reusing the inventory catalog with a filter sidebar and compact row layout.
          </Typography>

          <div className="divide-y rounded-md border">
            {filtered.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">
                No products match these filters.
              </p>
            ) : (
              filtered.map(product => <ProductRow key={product.id} product={product} />)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
