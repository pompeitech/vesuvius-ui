import { CUSTOMERS, ISSUES, MEMBERS, ORDERS, PRODUCTS, PROJECTS } from '../generators/dataset'
import type { Order } from '../schemas/order'
import type { Project, ProjectHealth, ProjectPriority } from '../schemas/project'

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

function monthWindow(monthsAgo: number): { start: Date; end: Date } {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1)
  const end = new Date(now.getFullYear(), now.getMonth() - monthsAgo + 1, 1)
  return { start, end }
}

function inWindow(iso: string, start: Date, end: Date): boolean {
  const t = new Date(iso).getTime()
  return t >= start.getTime() && t < end.getTime()
}

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.max(1, Math.round(diffMs / 60_000))
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.round(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export type EcommerceDashboardStats = {
  monthlyRevenue: number
  monthlyRevenueChangePct: number
  ordersFulfilled: number
  ordersFulfilledChangePct: number
  newCustomers: number
  newCustomersChangePct: number
  refundsIssued: number
  refundsIssuedChangePct: number

  /** Sum of `revenueByMonth[*].thisYear`. */
  totalRevenueThisYear: number
  /** 12 real calendar months — current year vs. the same month a year earlier, not synthesized. */
  revenueByMonth: { month: string; thisYear: number; prevYear: number }[]

  revenueByChannel: {
    channel: string
    label: string
    value: number
    orderCount: number
    changePct: number
  }[]

  /** Orders not yet shipped/delivered/cancelled — the "Welcome back" header's "N orders to fulfill". */
  ordersToFulfill: number
  /** Refunded in the last 7 days — the header's "N returns pending". */
  returnsPending: number

  avgOrderValue: number
  avgOrderValueChangePct: number
  /** Weekly average order value, oldest → newest, for a sparkline. */
  avgOrderValueTrend: number[]

  /** Order count over the last 28 days. */
  avgSales: number
  avgSalesChangePct: number
  /** Weekly order counts, oldest → newest, for a sparkline. */
  avgSalesTrend: number[]

  /** Percentage share of active products per category (sums to ~100). */
  productCategories: { category: string; value: number }[]

  /** Non-final order statuses right now — the "Order Status" donut (Processing/Shipped/Delivered). */
  orderStatusBreakdown: { status: string; label: string; count: number; pct: number }[]
  orderStatusTotal: number

  /** This month's revenue apportioned across `productCategories`' shares — the "Sales by Category" widget. */
  salesByCategory: { category: string; value: number; pct: number }[]

  recentActivity: { id: string; action: string; actor: string; timeAgo: string }[]

  recentOrders: Order[]
  lowStockProducts: { id: string; name: string; stock: number }[]
}

const CHANNEL_LABELS: Record<string, string> = {
  online: 'Online',
  in_store: 'In-Store',
  wholesale: 'Wholesale',
  marketplace: 'Marketplace'
}

/** Aggregates the raw ORDERS/PRODUCTS/CUSTOMERS arrays into the widget set on the Ecommerce "Dashboard 1" page. */
export async function getEcommerceDashboardStats(delayMs = 300): Promise<EcommerceDashboardStats> {
  await delay(delayMs)

  const paidOrders = ORDERS.filter(o => o.paymentStatus === 'paid')
  const refundedOrders = ORDERS.filter(o => o.paymentStatus === 'refunded')

  const current = monthWindow(0)
  const previous = monthWindow(1)

  const monthlyRevenue = paidOrders
    .filter(o => inWindow(o.createdAt, current.start, current.end))
    .reduce((s, o) => s + o.total, 0)
  const prevMonthlyRevenue = paidOrders
    .filter(o => inWindow(o.createdAt, previous.start, previous.end))
    .reduce((s, o) => s + o.total, 0)

  const ordersFulfilled = ORDERS.filter(
    o => o.status === 'delivered' && inWindow(o.createdAt, current.start, current.end)
  ).length
  const prevOrdersFulfilled = ORDERS.filter(
    o => o.status === 'delivered' && inWindow(o.createdAt, previous.start, previous.end)
  ).length

  const newCustomers = CUSTOMERS.filter(c =>
    inWindow(c.joinedAt, current.start, current.end)
  ).length
  const prevNewCustomers = CUSTOMERS.filter(c =>
    inWindow(c.joinedAt, previous.start, previous.end)
  ).length

  const refundsIssued = refundedOrders
    .filter(o => inWindow(o.createdAt, current.start, current.end))
    .reduce((s, o) => s + o.total, 0)
  const prevRefundsIssued = refundedOrders
    .filter(o => inWindow(o.createdAt, previous.start, previous.end))
    .reduce((s, o) => s + o.total, 0)

  const now = new Date()
  const revenueByMonth = Array.from({ length: 12 }, (_, month) => {
    const thisYear = paidOrders
      .filter(o => {
        const d = new Date(o.createdAt)
        return d.getFullYear() === now.getFullYear() && d.getMonth() === month
      })
      .reduce((s, o) => s + o.total, 0)
    const prevYear = paidOrders
      .filter(o => {
        const d = new Date(o.createdAt)
        return d.getFullYear() === now.getFullYear() - 1 && d.getMonth() === month
      })
      .reduce((s, o) => s + o.total, 0)
    return {
      month: MONTH_LABELS[month] as string,
      thisYear: Math.round(thisYear),
      prevYear: Math.round(prevYear)
    }
  })

  const revenueByChannel = Object.entries(CHANNEL_LABELS).map(([channel, label]) => {
    const channelCurrent = ORDERS.filter(
      o => o.channel === channel && inWindow(o.createdAt, daysAgo(28), daysAgo(0))
    ).length
    const channelPrevious = ORDERS.filter(
      o => o.channel === channel && inWindow(o.createdAt, daysAgo(56), daysAgo(28))
    ).length
    return {
      channel,
      label,
      value: Math.round(
        paidOrders.filter(o => o.channel === channel).reduce((s, o) => s + o.total, 0)
      ),
      orderCount: ORDERS.filter(o => o.channel === channel).length,
      changePct: pctChange(channelCurrent, channelPrevious)
    }
  })

  const ordersToFulfill = ORDERS.filter(
    o => o.status === 'pending' || o.status === 'processing'
  ).length
  const returnsPending = ORDERS.filter(
    o => o.paymentStatus === 'refunded' && inWindow(o.createdAt, daysAgo(7), daysAgo(0))
  ).length

  // 8 trailing 7-day windows, oldest → newest, for the AOV/sales sparklines.
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const end = daysAgo((7 - i - 1) * 7)
    const start = daysAgo((8 - i) * 7)
    return ORDERS.filter(o => inWindow(o.createdAt, start, end))
  })
  const avgOrderValueTrend = weeks.map(week => {
    const paid = week.filter(o => o.paymentStatus === 'paid')
    return paid.length > 0 ? Math.round(paid.reduce((s, o) => s + o.total, 0) / paid.length) : 0
  })
  const avgSalesTrend = weeks.map(week => week.length)

  const last28 = ORDERS.filter(o => inWindow(o.createdAt, daysAgo(28), daysAgo(0)))
  const prev28 = ORDERS.filter(o => inWindow(o.createdAt, daysAgo(56), daysAgo(28)))
  const last28Paid = last28.filter(o => o.paymentStatus === 'paid')
  const prev28Paid = prev28.filter(o => o.paymentStatus === 'paid')
  const avgOrderValue =
    last28Paid.length > 0
      ? Math.round(last28Paid.reduce((s, o) => s + o.total, 0) / last28Paid.length)
      : 0
  const prevAvgOrderValue =
    prev28Paid.length > 0
      ? Math.round(prev28Paid.reduce((s, o) => s + o.total, 0) / prev28Paid.length)
      : 0

  const activeProducts = PRODUCTS.filter(p => p.status === 'active')
  const categoryCounts = new Map<string, number>()
  for (const p of activeProducts) {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1)
  }
  const productCategories = [...categoryCounts.entries()]
    .map(([category, count]) => ({
      category,
      value: Math.round((count / (activeProducts.length || 1)) * 100)
    }))
    .sort((a, b) => b.value - a.value)

  const recentOrders = [...ORDERS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)

  const lowStockProducts = [...PRODUCTS]
    .filter(p => p.status === 'active' && p.stock < 40)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5)
    .map(p => ({ id: p.id, name: p.name, stock: p.stock }))

  const ORDER_STATUS_LABELS: Record<string, string> = {
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered'
  }
  const inFlightOrders = ORDERS.filter(o => o.status in ORDER_STATUS_LABELS)
  const orderStatusBreakdown = Object.entries(ORDER_STATUS_LABELS).map(([status, label]) => {
    const count = inFlightOrders.filter(o => o.status === status).length
    return {
      status,
      label,
      count,
      pct: Math.round((count / (inFlightOrders.length || 1)) * 1000) / 10
    }
  })

  // Apportions this month's revenue across each category's share of the
  // active product catalog — a reasonable stand-in given orders don't
  // carry line items down to individual products in this mock dataset.
  const salesByCategory = productCategories.map(c => ({
    category: c.category,
    value: Math.round((monthlyRevenue * c.value) / 100),
    pct: c.value
  }))

  const recentActivity = recentOrders.slice(0, 5).map(order => ({
    id: order.id,
    action:
      order.status === 'delivered'
        ? 'Order Delivered'
        : order.paymentStatus === 'paid'
          ? 'Payment Received'
          : 'New Order Placed',
    actor: order.customerName,
    timeAgo: formatRelativeTime(order.createdAt)
  }))

  return {
    monthlyRevenue: Math.round(monthlyRevenue),
    monthlyRevenueChangePct: pctChange(monthlyRevenue, prevMonthlyRevenue),
    ordersFulfilled,
    ordersFulfilledChangePct: pctChange(ordersFulfilled, prevOrdersFulfilled),
    newCustomers,
    newCustomersChangePct: pctChange(newCustomers, prevNewCustomers),
    refundsIssued: Math.round(refundsIssued),
    refundsIssuedChangePct: pctChange(refundsIssued, prevRefundsIssued),

    totalRevenueThisYear: revenueByMonth.reduce((s, m) => s + m.thisYear, 0),
    revenueByMonth,
    revenueByChannel,
    ordersToFulfill,
    returnsPending,

    avgOrderValue,
    avgOrderValueChangePct: pctChange(avgOrderValue, prevAvgOrderValue),
    avgOrderValueTrend,

    avgSales: last28.length,
    avgSalesChangePct: pctChange(last28.length, prev28.length),
    avgSalesTrend,

    productCategories,
    orderStatusBreakdown,
    orderStatusTotal: inFlightOrders.length,
    salesByCategory,
    recentActivity,
    recentOrders,
    lowStockProducts
  }
}

export type ActiveProjectRow = {
  id: string
  name: string
  status: Project['status']
  health: ProjectHealth
  priority: ProjectPriority
  ownerName: string
  ownerAvatarUrl?: string
  dueDate: string
}

export type CriticalPathItem = {
  project: Project
  /** e.g. "Error budget review · Blocked" — a short milestone + health status line. */
  milestone: string
}

export type ProjectHealthSummary = {
  total: number
  byHealth: { health: ProjectHealth; label: string; count: number }[]
  needsAttention: {
    project: Project
    openIssueCount: number
  } | null
  /** Every non-completed project, soonest due date first — the "Active Projects" table. */
  activeProjects: ActiveProjectRow[]
  /** The 4 soonest-due at-risk/blocked/dependency projects, in due-date order — the "Critical Path" list. */
  criticalPath: CriticalPathItem[]
}

const HEALTH_LABELS: Record<ProjectHealth, string> = {
  on_track: 'On Track',
  at_risk: 'At Risk',
  blocked: 'Blocked',
  dependency: 'Dependency'
}

function memberName(id: string): string {
  return MEMBERS.find(m => m.id === id)?.name ?? 'Unassigned'
}

function memberAvatar(id: string): string | undefined {
  return MEMBERS.find(m => m.id === id)?.avatarUrl
}

const MILESTONE_BY_HEALTH: Record<ProjectHealth, string[]> = {
  on_track: ['Sprint review', 'Design handoff', 'Beta rollout'],
  at_risk: ['Staging verification', 'Load test', 'Stakeholder sign-off'],
  blocked: ['Error budget review', 'Vendor dependency', 'Security audit'],
  dependency: ['Upstream API contract', 'Shared library upgrade', 'Platform migration']
}

/** Aggregates PROJECTS/ISSUES/MEMBERS into every widget on the Project Management "Dashboard 4" page. */
export async function getProjectHealthSummary(delayMs = 300): Promise<ProjectHealthSummary> {
  await delay(delayMs)

  const byHealth = (Object.keys(HEALTH_LABELS) as ProjectHealth[]).map(health => ({
    health,
    label: HEALTH_LABELS[health],
    count: PROJECTS.filter(p => p.health === health).length
  }))

  const byDueDate = [...PROJECTS].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )

  const blocked = byDueDate.filter(p => p.health === 'blocked' || p.health === 'at_risk')
  const project = blocked[0]
  const needsAttention = project
    ? {
        project,
        openIssueCount: ISSUES.filter(i => i.projectId === project.id && i.status !== 'done').length
      }
    : null

  const activeProjects: ActiveProjectRow[] = byDueDate
    .filter(p => p.status !== 'completed')
    .map(p => ({
      id: p.id,
      name: p.name,
      status: p.status,
      health: p.health,
      priority: p.priority,
      ownerName: memberName(p.ownerId),
      ownerAvatarUrl: memberAvatar(p.ownerId),
      dueDate: p.dueDate
    }))

  const criticalPath: CriticalPathItem[] = byDueDate
    .filter(p => p.health !== 'on_track')
    .slice(0, 4)
    .map((p, i) => ({
      project: p,
      milestone: `${MILESTONE_BY_HEALTH[p.health][i % MILESTONE_BY_HEALTH[p.health].length]} · ${HEALTH_LABELS[p.health]}`
    }))

  return {
    total: PROJECTS.length,
    byHealth,
    needsAttention,
    activeProjects,
    criticalPath
  }
}
