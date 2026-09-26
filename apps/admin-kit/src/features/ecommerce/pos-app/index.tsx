import {
  addOrder,
  getOffices,
  getOrders,
  getProducts,
  type Office,
  type Order,
  type PaymentMethod,
  type Product
} from '@pompeitech/mock-data'
import { Input, Typography, toast } from '@pompeitech/vesuvius-ui'
import { SearchIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import { currency } from '../_shared/format'
import { type CartEntry, CartPanel } from './components/cart-panel'
import { CategoryBar } from './components/category-bar'
import { ChannelPanel } from './components/channel-panel'
import { ProductGrid } from './components/product-grid'

export async function loader() {
  const [products, offices, orders] = await Promise.all([
    getProducts({ pageSize: 500 }),
    getOffices({ pageSize: 50 }),
    getOrders({ pageSize: 2000 })
  ])
  return {
    products: products.data,
    offices: offices.data,
    orders: orders.data
  }
}

type CartLine = { productId: string; quantity: number }

const TAX_RATE = 0.1
const POS_ORDER_PREFIX = 'POS-'

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function Component() {
  const {
    products,
    offices,
    orders: initialOrders
  } = useLoaderData() as {
    products: Product[]
    offices: Office[]
    orders: Order[]
  }
  const [orders, setOrders] = useState(initialOrders)
  const [activeOfficeId, setActiveOfficeId] = useState(() => offices[0]?.id ?? '')
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartLine[]>([])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')

  const activeOffice = offices.find(o => o.id === activeOfficeId)

  const categories = useMemo(() => [...new Set(products.map(p => p.category))].sort(), [products])

  const sellable = useMemo(
    () => products.filter(p => p.status === 'active' && p.stock > 0),
    [products]
  )

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return sellable
      .filter(p => category === 'all' || p.category === category)
      .filter(p => !query || p.name.toLowerCase().includes(query))
  }, [sellable, category, search])

  const productsById = useMemo(() => new Map(products.map(p => [p.id, p])), [products])

  const cartEntries = useMemo<CartEntry[]>(
    () =>
      cart.flatMap(line => {
        const product = productsById.get(line.productId)
        return product ? [{ product, quantity: line.quantity }] : []
      }),
    [cart, productsById]
  )

  const subtotal = cartEntries.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  )
  const tax = Number((subtotal * TAX_RATE).toFixed(2))
  const total = Number((subtotal + tax).toFixed(2))

  const salesToday = useMemo(
    () =>
      orders
        .filter(o => o.channel === 'in_store' && o.createdAt.slice(0, 10) === todayIso())
        .reduce((sum, o) => sum + o.total, 0),
    [orders]
  )

  const handleAdd = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(line => line.productId === product.id)
      if (existing) {
        return prev.map(line =>
          line.productId === product.id ? { ...line, quantity: line.quantity + 1 } : line
        )
      }
      return [...prev, { productId: product.id, quantity: 1 }]
    })
  }

  const handleIncrement = (productId: string) => {
    setCart(prev =>
      prev.map(line =>
        line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line
      )
    )
  }

  const handleDecrement = (productId: string) => {
    setCart(prev =>
      prev.flatMap(line => {
        if (line.productId !== productId) return [line]
        return line.quantity > 1 ? [{ ...line, quantity: line.quantity - 1 }] : []
      })
    )
  }

  const handleRemove = (productId: string) => {
    setCart(prev => prev.filter(line => line.productId !== productId))
  }

  const handleCheckout = () => {
    if (cartEntries.length === 0 || !activeOffice) return

    const posOrderCount = orders.filter(o => o.orderNumber.startsWith(POS_ORDER_PREFIX)).length
    const now = new Date().toISOString()
    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: `${POS_ORDER_PREFIX}${String(posOrderCount + 1).padStart(4, '0')}`,
      customerId: 'walk-in',
      customerName: 'Walk-in Customer',
      itemCount: cartEntries.reduce((sum, e) => sum + e.quantity, 0),
      items: cartEntries.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        sku: product.sku,
        imageUrl: product.imageUrl,
        quantity,
        unitPrice: product.price,
        lineTotal: Number((product.price * quantity).toFixed(2))
      })),
      subtotal: Number(subtotal.toFixed(2)),
      shippingCost: 0,
      tax,
      discount: 0,
      total,
      status: 'delivered',
      paymentStatus: 'paid',
      channel: 'in_store',
      paymentMethod,
      shippingAddress: {
        name: 'Walk-in Customer',
        line1: 'In-store purchase',
        city: activeOffice.city,
        state: '',
        postalCode: '',
        country: activeOffice.country
      },
      billingAddress: {
        name: 'Walk-in Customer',
        line1: 'In-store purchase',
        city: activeOffice.city,
        state: '',
        postalCode: '',
        country: activeOffice.country
      },
      createdAt: now
    }

    addOrder(order)
    setOrders(prev => [order, ...prev])
    setCart([])
    toast.success(`Sale complete — ${order.orderNumber} for ${currency.format(total)}.`)
  }

  return (
    <div className="flex flex-col gap-4 lg:h-[calc(100vh-104px)]">
      <div className="flex flex-wrap items-start justify-between gap-4 lg:shrink-0">
        <div>
          <Typography as="h1" variant="h3">
            POS App
          </Typography>
          <Typography variant="muted">
            Ring up a sale — pick a location, tap products, check out.
          </Typography>
        </div>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            className="w-64 pl-8"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:h-[75vh] lg:min-h-0 lg:flex-1 lg:grid-cols-[220px_1fr_320px]">
        <ChannelPanel
          offices={offices}
          activeOfficeId={activeOfficeId}
          onSelectOffice={setActiveOfficeId}
          salesToday={salesToday}
        />

        <div className="flex min-h-0 flex-col gap-3 overflow-hidden">
          <CategoryBar categories={categories} active={category} onSelect={setCategory} />
          <ProductGrid products={visibleProducts} onAdd={handleAdd} />
        </div>

        <CartPanel
          entries={cartEntries}
          subtotal={subtotal}
          tax={tax}
          total={total}
          paymentMethod={paymentMethod}
          onSelectPaymentMethod={setPaymentMethod}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onRemove={handleRemove}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  )
}
