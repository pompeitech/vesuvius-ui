import type { BadgeProps } from '@pompeitech/vesuvius-ui'
import type { InvoicePriority, InvoiceStatus } from '@pompeitech/mock-data'

export const ORDER_STATUS_COLOR: Record<string, string> = {
  processing: 'var(--chart-2)',
  shipped: 'var(--chart-4)',
  delivered: 'var(--success)'
}

export const PRIORITY_VARIANT: Record<InvoicePriority, BadgeProps['variant']> = {
  High: 'destructive',
  Medium: 'warning',
  Low: 'secondary'
}

export const STATUS_VARIANT: Record<InvoiceStatus, BadgeProps['variant']> = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'destructive',
  Draft: 'outline'
}

export const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
export const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})
export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})
