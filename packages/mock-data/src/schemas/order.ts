import { z } from 'zod'

export const orderStatusSchema = z.enum([
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
])
export type OrderStatus = z.infer<typeof orderStatusSchema>

export const paymentStatusSchema = z.enum(['paid', 'pending', 'refunded', 'failed'])
export type PaymentStatus = z.infer<typeof paymentStatusSchema>

/** Matches the "Revenue by Channel" dashboard widget's segments. */
export const orderChannelSchema = z.enum(['online', 'in_store', 'wholesale', 'marketplace'])
export type OrderChannel = z.infer<typeof orderChannelSchema>

export const paymentMethodSchema = z.enum([
  'credit_card',
  'paypal',
  'debit_card',
  'bank_transfer',
  'cash'
])
export type PaymentMethod = z.infer<typeof paymentMethodSchema>

/** Shared shape for both `shippingAddress` and `billingAddress` on an order. */
export const addressSchema = z.object({
  name: z.string(),
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  phone: z.string().optional()
})
export type Address = z.infer<typeof addressSchema>

/** One line of an order — a quantity of a single `PRODUCTS` entry at the price it sold for. */
export const orderLineItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  sku: z.string(),
  imageUrl: z.string().optional(),
  quantity: z.number().int().min(1),
  unitPrice: z.number(),
  lineTotal: z.number()
})
export type OrderLineItem = z.infer<typeof orderLineItemSchema>

export const orderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  customerAvatarUrl: z.string().optional(),
  itemCount: z.number().int(),
  items: z.array(orderLineItemSchema).min(1),
  /** Sum of every line's `lineTotal`, before shipping/tax/discount. */
  subtotal: z.number(),
  shippingCost: z.number(),
  tax: z.number(),
  /** Positive amount taken off — `total = subtotal + shippingCost + tax - discount`. */
  discount: z.number(),
  total: z.number(),
  status: orderStatusSchema,
  paymentStatus: paymentStatusSchema,
  channel: orderChannelSchema,
  paymentMethod: paymentMethodSchema,
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  notes: z.string().optional(),
  createdAt: z.string()
})

export type Order = z.infer<typeof orderSchema>
