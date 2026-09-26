import type { BadgeProps } from '@pompeitech/vesuvius-ui'
import type {
  OrderChannel,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ShipmentServiceTier,
  ShipmentStatus
} from '@pompeitech/mock-data'

// Shared across every ecommerce dashboard/list that formats money, dates, or
// renders an order status badge — kept in one place instead of redefined
// (with the same values) on each page.
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
export const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit'
})

export const ORDER_STATUS_VARIANT: Record<OrderStatus, BadgeProps['variant']> = {
  pending: 'secondary',
  processing: 'info',
  shipped: 'highlight',
  delivered: 'success',
  cancelled: 'destructive'
}

export const ORDER_STATUS_OPTIONS: { label: string; value: OrderStatus }[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' }
]

export const PAYMENT_STATUS_VARIANT: Record<PaymentStatus, BadgeProps['variant']> = {
  paid: 'success',
  pending: 'secondary',
  refunded: 'info',
  failed: 'destructive'
}

export const ORDER_CHANNEL_LABEL: Record<OrderChannel, string> = {
  online: 'Online',
  in_store: 'In-Store',
  wholesale: 'Wholesale',
  marketplace: 'Marketplace'
}

export const ORDER_CHANNEL_OPTIONS: { label: string; value: OrderChannel }[] = (
  Object.entries(ORDER_CHANNEL_LABEL) as [OrderChannel, string][]
).map(([value, label]) => ({ label, value }))

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  credit_card: 'Credit Card',
  paypal: 'PayPal',
  debit_card: 'Debit Card',
  bank_transfer: 'Bank Transfer',
  cash: 'Cash'
}

/** Cycled through for per-channel/per-series chart legends. */
export const CHANNEL_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)'
]

export const SHIPMENT_STATUS_LABEL: Record<ShipmentStatus, string> = {
  label_created: 'Label Created',
  in_transit: 'In Transit',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  exception: 'Exception'
}

export const SHIPMENT_STATUS_VARIANT: Record<ShipmentStatus, BadgeProps['variant']> = {
  label_created: 'secondary',
  in_transit: 'info',
  out_for_delivery: 'highlight',
  delivered: 'success',
  exception: 'destructive'
}

export const SHIPMENT_STATUS_OPTIONS: { label: string; value: ShipmentStatus }[] = (
  Object.entries(SHIPMENT_STATUS_LABEL) as [ShipmentStatus, string][]
).map(([value, label]) => ({ label, value }))

export const SHIPMENT_SERVICE_TIER_LABEL: Record<ShipmentServiceTier, string> = {
  standard: 'Standard',
  express: 'Express',
  priority_air: 'Priority Air',
  economy: 'Economy',
  signature: 'Signature'
}

export const SHIPMENT_SERVICE_TIER_OPTIONS: { label: string; value: ShipmentServiceTier }[] = (
  Object.entries(SHIPMENT_SERVICE_TIER_LABEL) as [ShipmentServiceTier, string][]
).map(([value, label]) => ({ label, value }))

/** Fixed per-carrier dot color for the list's Carrier column — `CARRIERS` in the generator is a short, closed set, so a direct map (vs. cycling `CHANNEL_COLORS`) keeps each brand's dot stable across renders/pages. */
export const CARRIER_COLOR: Record<string, string> = {
  UPS: 'var(--chart-1)',
  FedEx: 'var(--chart-2)',
  DHL: 'var(--chart-3)',
  USPS: 'var(--chart-4)',
  ParcelFlow: 'var(--chart-5)'
}
