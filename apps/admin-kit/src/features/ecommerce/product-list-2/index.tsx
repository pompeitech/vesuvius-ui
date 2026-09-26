import { Button, toast, Typography } from '@pompeitech/vesuvius-ui'
import { getProducts, type Product } from '@pompeitech/mock-data'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { stockLevel } from '../_shared/stock-level'
import { FiltersBar } from './components/filters-bar'
import { ProductCard } from './components/product-card'
import type { StatusFilter, StockFilter } from './types'

// Same fixed 60-row catalog as Product List 1, presented as inventory-first
// cards instead of a data grid.
export async function loader() {
  const result = await getProducts({ pageSize: 200 })
  return result.data
}

export function Component() {
  const initialProducts = useLoaderData() as Product[]
  const navigate = useNavigate()
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [stock, setStock] = useState<StockFilter>('all')

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase()
    return products.filter(product => {
      if (status !== 'all' && product.status !== status) return false
      if (stock !== 'all' && stockLevel(product.stock) !== stock) return false
      if (needle && !`${product.name} ${product.sku}`.toLowerCase().includes(needle)) return false
      return true
    })
  }, [products, search, status, stock])

  const onEdit = (product: Product) => navigate(`/ecommerce/edit-product/${product.id}`)
  const onView = (product: Product) => navigate(`/ecommerce/product-detail-1/${product.id}`)
  const onDuplicate = (product: Product) => {
    setProducts(prev => [
      { ...product, id: crypto.randomUUID(), name: `${product.name} (copy)` },
      ...prev
    ])
    toast.success(`Duplicated "${product.name}".`)
  }
  const onDelete = (product: Product) => {
    setProducts(prev => prev.filter(p => p.id !== product.id))
    toast.success(`Deleted "${product.name}".`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Product List 2
          </Typography>
          <Typography variant="muted">
            Inventory-first product cards with pricing, stock, and channel tags.
          </Typography>
        </div>
        <Button onClick={() => navigate('/ecommerce/add-product')}>
          <PlusIcon />
          New Products
        </Button>
      </div>

      <FiltersBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        stock={stock}
        onStockChange={setStock}
      />

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No products match these filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onView={onView}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
