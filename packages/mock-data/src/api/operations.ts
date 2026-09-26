import { ORDERS, PRODUCTS, SHIPMENTS } from '../generators/dataset'
import type { ShipmentStatus } from '../schemas/shipment'
import { getFinanceDashboardStats } from './finance'

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function pctChange(current: number, previous: number): number {
  if (previous === 0) return current === 0 ? 0 : 100
  return Math.round(((current - previous) / previous) * 1000) / 10
}

function daysAgo(days: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d
}

function inWindow(iso: string, start: Date, end: Date): boolean {
  const t = new Date(iso).getTime()
  return t >= start.getTime() && t < end.getTime()
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
/** Sunday=0..Saturday=6 (JS `Date#getDay`) → index into DAY_LABELS (Mon-first). */
const DAY_LABEL_INDEX = [6, 0, 1, 2, 3, 4, 5]

export type CategoryPerformancePoint = {
  day: string
  electronics: number
  clothing: number
  homeGarden: number
  sports: number
}

export type OrderFulfillmentRow = {
  orderNumber: string
  shippedDate: string
  status: ShipmentStatus
  deliveryPct: number
}

export type OperationalDashboardStats = {
  totalRevenue: number
  totalRevenueChangePct: number

  avgFulfillmentDays: number
  avgFulfillmentDaysChangePct: number

  totalOrders: number
  totalOrdersChangePct: number

  conversionRate: number
  conversionRateChangePct: number

  returnRate: number
  returnRateChangePct: number

  pageViews: string
  pageViewsChangePct: number

  categoryPerformance: CategoryPerformancePoint[]
  categoryPerformanceTotal: number

  orderFulfillment: OrderFulfillmentRow[]
}

export async function getOperationalDashboardStats(
  delayMs = 300
): Promise<OperationalDashboardStats> {
  await delay(delayMs)

  const finance = await getFinanceDashboardStats(0)

  const last28 = ORDERS.filter(o => inWindow(o.createdAt, daysAgo(28), daysAgo(0)))
  const prev28 = ORDERS.filter(o => inWindow(o.createdAt, daysAgo(56), daysAgo(28)))
  const refunded28 = last28.filter(o => o.paymentStatus === 'refunded').length
  const refundedPrev28 = prev28.filter(o => o.paymentStatus === 'refunded').length
  const returnRate = last28.length > 0 ? (refunded28 / last28.length) * 100 : 0
  const prevReturnRate = prev28.length > 0 ? (refundedPrev28 / prev28.length) * 100 : 0

  const countByDay = new Array(7).fill(0) as number[]
  for (const order of ORDERS) {
    const jsDay = new Date(order.createdAt).getDay()
    const dayIndex = DAY_LABEL_INDEX[jsDay] as number
    countByDay[dayIndex] = (countByDay[dayIndex] ?? 0) + 1
  }

  const activeProducts = PRODUCTS.filter(p => p.status === 'active')
  const categoryShare = (category: string) =>
    activeProducts.filter(p => p.category === category).length / (activeProducts.length || 1)

  const categoryPerformance: CategoryPerformancePoint[] = DAY_LABELS.map((day, i) => ({
    day,
    electronics: Math.round((countByDay[i] ?? 0) * categoryShare('Electronics')),
    clothing: Math.round((countByDay[i] ?? 0) * categoryShare('Clothing')),
    homeGarden: Math.round((countByDay[i] ?? 0) * categoryShare('Home & Garden')),
    sports: Math.round((countByDay[i] ?? 0) * categoryShare('Sports'))
  }))
  const categoryPerformanceTotal = countByDay.reduce((s, c) => s + c, 0)

  const orderFulfillment: OrderFulfillmentRow[] = [...SHIPMENTS]
    .sort(
      (a, b) => new Date(b.estimatedDelivery).getTime() - new Date(a.estimatedDelivery).getTime()
    )
    .slice(0, 8)
    .map(shipment => {
      const order = ORDERS.find(o => o.id === shipment.orderId)
      let deliveryPct = 50
      if (shipment.status === 'delivered') {
        deliveryPct = 100
      } else if (order) {
        const start = new Date(order.createdAt).getTime()
        const end = new Date(shipment.estimatedDelivery).getTime()
        const elapsed = Date.now() - start
        const total = end - start
        deliveryPct =
          total > 0 ? Math.min(95, Math.max(5, Math.round((elapsed / total) * 100))) : 50
      }
      return {
        orderNumber: shipment.orderNumber,
        shippedDate: order?.createdAt ?? shipment.estimatedDelivery,
        status: shipment.status,
        deliveryPct
      }
    })

  return {
    totalRevenue: finance.grossRevenue,
    totalRevenueChangePct: finance.grossRevenueChangePct,

    avgFulfillmentDays: 2.4,
    avgFulfillmentDaysChangePct: -5,

    totalOrders: ORDERS.length,
    totalOrdersChangePct: pctChange(last28.length, prev28.length),

    conversionRate: 4.2,
    conversionRateChangePct: 1.2,

    returnRate: Math.round(returnRate * 10) / 10,
    returnRateChangePct: pctChange(returnRate, prevReturnRate),

    pageViews: '184K',
    pageViewsChangePct: 22,

    categoryPerformance,
    categoryPerformanceTotal,
    orderFulfillment
  }
}
