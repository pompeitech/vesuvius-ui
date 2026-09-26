import type { BadgeProps } from '@pompeitech/vesuvius-ui'
import type { TransactionStatus } from '@pompeitech/mock-data'

export const STATUS_VARIANT: Record<TransactionStatus, BadgeProps['variant']> = {
  Completed: 'success',
  Pending: 'warning',
  Refunded: 'info',
  Failed: 'destructive'
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
