import {
  Button,
  DataTable,
  Tabs,
  TabsList,
  TabsTrigger,
  toast,
  Typography
} from '@pompeitech/vesuvius-ui'
import { getProducts, type Product, type ProductStatus } from '@pompeitech/mock-data'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { buildColumns } from './components/columns'
import { ProductTableToolbar } from './components/table-toolbar'

// Products is a small, fixed catalog (60 rows) — fetched once, in full, and
// handed to DataTable for client-side search/sort/filter/pagination, same
// pattern as the dashboards' "Recent Orders"/"Recent Transactions" tables.
export async function loader() {
  const result = await getProducts({ pageSize: 200 })
  return result.data
}

type StatusTab = 'all' | ProductStatus

export function Component() {
  const initialProducts = useLoaderData() as Product[]
  const navigate = useNavigate()
  const [products, setProducts] = useState(initialProducts)
  const [tab, setTab] = useState<StatusTab>('all')

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(products.map(p => p.category)))
        .sort()
        .map(category => ({ label: category, value: category })),
    [products]
  )

  const tabData = useMemo(
    () => (tab === 'all' ? products : products.filter(p => p.status === tab)),
    [products, tab]
  )

  const columns = useMemo(
    () =>
      buildColumns({
        onView: product => navigate(`/ecommerce/product-detail-1/${product.id}`),
        onEdit: product => navigate(`/ecommerce/edit-product/${product.id}`),
        onDuplicate: product => {
          setProducts(prev => [
            { ...product, id: crypto.randomUUID(), name: `${product.name} (copy)` },
            ...prev
          ])
          toast.success(`Duplicated "${product.name}".`)
        },
        onDelete: product => {
          setProducts(prev => prev.filter(p => p.id !== product.id))
          toast.success(`Deleted "${product.name}".`)
        }
      }),
    [navigate]
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Products
          </Typography>
          <Typography variant="muted">Browse, filter, and manage your product catalog.</Typography>
        </div>
        <Button onClick={() => navigate('/ecommerce/add-product')}>
          <PlusIcon />
          Add Products
        </Button>
      </div>

      <Tabs value={tab} onValueChange={value => setTab(value as StatusTab)}>
        <TabsList>
          <TabsTrigger value="all">All products</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>

      <DataTable
        columns={columns}
        data={tabData}
        getRowId={row => row.id}
        defaultColumnVisibility={{ stockLevel: false }}
        searchPlaceholder="Search products..."
        toolbar={({ table, density, setDensity }) => (
          <ProductTableToolbar
            table={table}
            density={density}
            setDensity={setDensity}
            categoryOptions={categoryOptions}
          />
        )}
      />
    </div>
  )
}
