import { ORDERS } from '../generators/dataset'
import type { Order, PaymentMethod, PaymentStatus } from '../schemas/order'

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

function monthWindow(monthsAgo: number): { start: Date; end: Date } {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1)
  const end = new Date(now.getFullYear(), now.getMonth() - monthsAgo + 1, 1)
  return { start, end }
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

/** Same ratio used for the Dashboard 1 revenue/expenses chart — kept consistent across every widget that needs a cost assumption. */
const COST_RATIO = 0.58
/** Of total costs, the share that's COGS vs. operating expenses — for the stacked "Costs Breakdown" chart. */
const COGS_SHARE = 0.65

export type TransactionType = 'Sale' | 'Refund' | 'Subscription'
export type TransactionStatus = 'Completed' | 'Pending' | 'Refunded' | 'Failed'

export type Transaction = {
  id: string
  customerName: string
  customerAvatarUrl?: string
  amount: number
  type: TransactionType
  paymentMethod: string
  date: string
  status: TransactionStatus
}

export type FinanceDashboardStats = {
  revenueOverview: number
  revenueOverviewChangePct: number
  revenueByMonth: { month: string; revenue: number }[]

  costsBreakdown: number
  costsBreakdownChangePct: number
  costsByMonth: { month: string; cogs: number; operatingExpenses: number }[]

  grossRevenue: number
  grossRevenueChangePct: number
  netProfit: number
  netProfitChangePct: number
  refundRate: number
  refundRateChangePct: number
  avgTransaction: number
  avgTransactionChangePct: number

  transactions: Transaction[]
}

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  credit_card: 'Credit Card',
  paypal: 'PayPal',
  debit_card: 'Debit Card',
  bank_transfer: 'Bank Transfer',
  cash: 'Cash'
}

const TRANSACTION_STATUS: Record<PaymentStatus, TransactionStatus> = {
  paid: 'Completed',
  pending: 'Pending',
  refunded: 'Refunded',
  failed: 'Failed'
}

function transactionType(order: Order): TransactionType {
  if (order.paymentStatus === 'refunded') return 'Refund'
  // Deterministic (no Math.random at call time, see dataset.ts's module-level
  // seeding note) — every ~7th order reads as a recurring subscription charge.
  const numeric = Number(order.orderNumber.replace('#', ''))
  return numeric % 7 === 0 ? 'Subscription' : 'Sale'
}

function toTransaction(order: Order): Transaction {
  return {
    id: `TXN-${order.orderNumber.replace('#', '')}`,
    customerName: order.customerName,
    customerAvatarUrl: order.customerAvatarUrl,
    amount: order.total,
    type: transactionType(order),
    paymentMethod: PAYMENT_METHOD_LABELS[order.paymentMethod],
    date: order.createdAt,
    status: TRANSACTION_STATUS[order.paymentStatus]
  }
}

/** Aggregates ORDERS into the "finance" widget set — Revenue Overview / Costs Breakdown / Transactions (Ecommerce "Dashboard 4"). */
export async function getFinanceDashboardStats(delayMs = 300): Promise<FinanceDashboardStats> {
  await delay(delayMs)

  const paidOrders = ORDERS.filter(o => o.paymentStatus === 'paid')

  const trailingStart = daysAgo(365)
  const priorStart = daysAgo(730)

  const grossRevenue = paidOrders
    .filter(o => inWindow(o.createdAt, trailingStart, daysAgo(0)))
    .reduce((s, o) => s + o.total, 0)
  const prevGrossRevenue = paidOrders
    .filter(o => inWindow(o.createdAt, priorStart, trailingStart))
    .reduce((s, o) => s + o.total, 0)

  const trailingCount = ORDERS.filter(o => inWindow(o.createdAt, trailingStart, daysAgo(0))).length
  const prevCount = ORDERS.filter(o => inWindow(o.createdAt, priorStart, trailingStart)).length
  const trailingRefunds = ORDERS.filter(
    o => o.paymentStatus === 'refunded' && inWindow(o.createdAt, trailingStart, daysAgo(0))
  ).length
  const prevRefunds = ORDERS.filter(
    o => o.paymentStatus === 'refunded' && inWindow(o.createdAt, priorStart, trailingStart)
  ).length

  const trailingPaidCount = paidOrders.filter(o =>
    inWindow(o.createdAt, trailingStart, daysAgo(0))
  ).length
  const prevPaidCount = paidOrders.filter(o =>
    inWindow(o.createdAt, priorStart, trailingStart)
  ).length

  const netProfit = grossRevenue * (1 - COST_RATIO)
  const prevNetProfit = prevGrossRevenue * (1 - COST_RATIO)
  const refundRate = trailingCount > 0 ? (trailingRefunds / trailingCount) * 100 : 0
  const prevRefundRate = prevCount > 0 ? (prevRefunds / prevCount) * 100 : 0
  const avgTransaction = trailingPaidCount > 0 ? grossRevenue / trailingPaidCount : 0
  const prevAvgTransaction = prevPaidCount > 0 ? prevGrossRevenue / prevPaidCount : 0

  const now = new Date()
  const revenueByMonth = Array.from({ length: 12 }, (_, i) => {
    const monthsAgo = 11 - i
    const { start, end } = monthWindow(monthsAgo)
    const revenue = paidOrders
      .filter(o => inWindow(o.createdAt, start, end))
      .reduce((s, o) => s + o.total, 0)
    const monthIndex = (now.getMonth() - monthsAgo + 12) % 12
    return { month: MONTH_LABELS[monthIndex] as string, revenue: Math.round(revenue) }
  })

  const costsByMonth = revenueByMonth.map(m => {
    const totalCost = m.revenue * COST_RATIO
    return {
      month: m.month,
      cogs: Math.round(totalCost * COGS_SHARE),
      operatingExpenses: Math.round(totalCost * (1 - COGS_SHARE))
    }
  })
  const costsBreakdown = costsByMonth.reduce((s, m) => s + m.cogs + m.operatingExpenses, 0)
  const prevCostsBreakdown = prevGrossRevenue * COST_RATIO

  const transactions = [...ORDERS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 50)
    .map(toTransaction)

  return {
    revenueOverview: Math.round(grossRevenue),
    revenueOverviewChangePct: pctChange(grossRevenue, prevGrossRevenue),
    revenueByMonth,

    costsBreakdown: Math.round(costsBreakdown),
    costsBreakdownChangePct: pctChange(costsBreakdown, prevCostsBreakdown),
    costsByMonth,

    grossRevenue: Math.round(grossRevenue),
    grossRevenueChangePct: pctChange(grossRevenue, prevGrossRevenue),
    netProfit: Math.round(netProfit),
    netProfitChangePct: pctChange(netProfit, prevNetProfit),
    refundRate: Math.round(refundRate * 10) / 10,
    refundRateChangePct: pctChange(refundRate, prevRefundRate),
    avgTransaction: Math.round(avgTransaction * 100) / 100,
    avgTransactionChangePct: pctChange(avgTransaction, prevAvgTransaction),

    transactions
  }
}
