import { ORDERS } from '../generators/dataset'
import { getEcommerceDashboardStats } from './dashboard'

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
const DAY_LABEL_INDEX = [6, 0, 1, 2, 3, 4, 5]
const COST_RATIO = 0.58

export type InvoicePriority = 'High' | 'Medium' | 'Low'
export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft'

export type Invoice = {
  id: string
  customerName: string
  customerAvatarUrl?: string
  date: string
  amount: number
  priority: InvoicePriority
  status: InvoiceStatus
}

export type ChannelSalesStats = {
  inStoreSales: number
  inStoreSalesChangePct: number
  inStoreSalesOrderCount: number
  websiteSales: number
  websiteSalesChangePct: number
  websiteSalesOrderCount: number
  wholesaleSales: number
  wholesaleSalesChangePct: number
  wholesaleSalesOrderCount: number
  returns: number
  returnsChangePct: number
  returnsOrderCount: number

  /** Real per-weekday revenue (paid orders, all-time) with an illustrative cost ratio for "expenses". */
  revenueByWeekday: { day: string; revenue: number; expenses: number }[]

  /** Trailing 8 weekly order counts — a small "step" trend line. */
  salesPipelineTrend: number[]
  salesPipelineTotal: number
  /** Trailing 8 weekly revenue totals — a small "step" trend line. */
  totalSalesTrend: number[]
  totalSalesValue: number

  /** Reuses `productCategories`' real catalog-share percentages — the "Sales by Category" radar. */
  salesByCategoryRadar: { category: string; value: number }[]

  /** Weekday × trailing-4-week order-count intensity, normalized 0-1. */
  trafficHeatmap: { rows: string[]; columns: string[]; cells: number[][] }

  orderStatusTotal: number
  orderStatusBreakdown: { status: string; label: string; count: number; pct: number }[]

  invoices: Invoice[]
}

function invoicePriority(amount: number): InvoicePriority {
  if (amount >= 800) return 'High'
  if (amount >= 300) return 'Medium'
  return 'Low'
}

const INVOICE_STATUS_BY_PAYMENT: Record<string, InvoiceStatus> = {
  paid: 'Paid',
  pending: 'Pending',
  failed: 'Overdue',
  refunded: 'Draft'
}

/** Aggregates ORDERS (+ the Ecommerce dashboard's own category/order-status work) into the Ecommerce "Dashboard 7" widget set. */
export async function getChannelSalesStats(delayMs = 300): Promise<ChannelSalesStats> {
  await delay(delayMs)

  const ecommerce = await getEcommerceDashboardStats(0)

  const channelStats = (channel: string) => {
    const current = ORDERS.filter(
      o =>
        o.channel === channel &&
        o.paymentStatus === 'paid' &&
        inWindow(o.createdAt, daysAgo(28), daysAgo(0))
    )
    const previous = ORDERS.filter(
      o =>
        o.channel === channel &&
        o.paymentStatus === 'paid' &&
        inWindow(o.createdAt, daysAgo(56), daysAgo(28))
    )
    const currentTotal = current.reduce((s, o) => s + o.total, 0)
    const previousTotal = previous.reduce((s, o) => s + o.total, 0)
    return {
      total: Math.round(currentTotal),
      changePct: pctChange(currentTotal, previousTotal),
      orderCount: current.length
    }
  }

  const inStore = channelStats('in_store')
  const website = channelStats('online')
  const wholesale = channelStats('wholesale')

  const returnsCurrent = ORDERS.filter(
    o => o.paymentStatus === 'refunded' && inWindow(o.createdAt, daysAgo(28), daysAgo(0))
  )
  const returnsPrevious = ORDERS.filter(
    o => o.paymentStatus === 'refunded' && inWindow(o.createdAt, daysAgo(56), daysAgo(28))
  )
  const returnsTotal = returnsCurrent.reduce((s, o) => s + o.total, 0)
  const returnsPrevTotal = returnsPrevious.reduce((s, o) => s + o.total, 0)

  const paidOrders = ORDERS.filter(o => o.paymentStatus === 'paid')
  const revenueByDayIndex = new Array(7).fill(0) as number[]
  for (const order of paidOrders) {
    const jsDay = new Date(order.createdAt).getDay()
    const dayIndex = DAY_LABEL_INDEX[jsDay] as number
    revenueByDayIndex[dayIndex] = (revenueByDayIndex[dayIndex] ?? 0) + order.total
  }
  const revenueByWeekday = DAY_LABELS.map((day, i) => {
    const revenue = Math.round((revenueByDayIndex[i] ?? 0) / 100)
    return { day, revenue, expenses: Math.round(revenue * COST_RATIO) }
  })

  const weeks = Array.from({ length: 8 }, (_, i) => {
    const end = daysAgo((7 - i - 1) * 7)
    const start = daysAgo((8 - i) * 7)
    return ORDERS.filter(o => inWindow(o.createdAt, start, end))
  })
  const salesPipelineTrend = weeks.map(week => week.length)
  const totalSalesTrend = weeks.map(week =>
    Math.round(week.filter(o => o.paymentStatus === 'paid').reduce((s, o) => s + o.total, 0))
  )

  const salesByCategoryRadar = ecommerce.productCategories.slice(0, 5).map(c => ({
    category: c.category,
    value: c.value
  }))

  // 4 trailing weeks × weekday, order-count intensity normalized 0-1.
  const heatmapWeeks = 4
  const heatmapCells = DAY_LABELS.map((_, dayIdx) =>
    Array.from({ length: heatmapWeeks }, (_, weekIdx) => {
      const end = daysAgo(weekIdx * 7)
      const start = daysAgo((weekIdx + 1) * 7)
      const count = ORDERS.filter(o => {
        if (!inWindow(o.createdAt, start, end)) return false
        const jsDay = new Date(o.createdAt).getDay()
        return DAY_LABEL_INDEX[jsDay] === dayIdx
      }).length
      return count
    })
  )
  const maxCount = Math.max(1, ...heatmapCells.flat())
  const normalizedCells = heatmapCells.map(row => row.map(v => v / maxCount))

  const invoices: Invoice[] = [...ORDERS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 18)
    .map((order, i) => ({
      id: `INV-${String(i + 1).padStart(5, '0')}`,
      customerName: order.customerName,
      customerAvatarUrl: order.customerAvatarUrl,
      date: order.createdAt,
      amount: order.total,
      priority: invoicePriority(order.total),
      status: INVOICE_STATUS_BY_PAYMENT[order.paymentStatus] ?? 'Pending'
    }))

  return {
    inStoreSales: inStore.total,
    inStoreSalesChangePct: inStore.changePct,
    inStoreSalesOrderCount: inStore.orderCount,
    websiteSales: website.total,
    websiteSalesChangePct: website.changePct,
    websiteSalesOrderCount: website.orderCount,
    wholesaleSales: wholesale.total,
    wholesaleSalesChangePct: wholesale.changePct,
    wholesaleSalesOrderCount: wholesale.orderCount,
    returns: Math.round(returnsTotal),
    returnsChangePct: pctChange(returnsTotal, returnsPrevTotal),
    returnsOrderCount: returnsCurrent.length,

    revenueByWeekday,

    salesPipelineTrend,
    salesPipelineTotal: salesPipelineTrend.reduce((s, v) => s + v, 0),
    totalSalesTrend,
    totalSalesValue: totalSalesTrend.reduce((s, v) => s + v, 0),

    salesByCategoryRadar,

    trafficHeatmap: {
      rows: DAY_LABELS,
      // weekIdx 0 (leftmost column) is the most recent 7-day window.
      columns: ['This Week', 'Last Week', '2 Weeks Ago', '3 Weeks Ago'],
      cells: normalizedCells
    },

    orderStatusTotal: ecommerce.orderStatusTotal,
    orderStatusBreakdown: ecommerce.orderStatusBreakdown,

    invoices
  }
}
