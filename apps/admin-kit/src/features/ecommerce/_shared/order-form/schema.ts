import {
  CUSTOMERS,
  PRODUCTS,
  orderChannelSchema,
  orderStatusSchema,
  paymentMethodSchema,
  paymentStatusSchema
} from '@pompeitech/mock-data'
import type { Order } from '@pompeitech/mock-data'
import { z } from 'zod'

/** `{ label, value }` pairs for the item picker — built once from the fixed catalog, not re-derived per render. */
export const PRODUCT_OPTIONS = PRODUCTS.map(product => ({
  label: `${product.name} (${product.sku})`,
  value: product.id
}))

/** `{ label, value }` pairs for the customer picker — built once from the fixed customer list. */
export const CUSTOMER_OPTIONS = CUSTOMERS.map(customer => ({
  label: `${customer.name} (${customer.email})`,
  value: customer.id
}))

const addressFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  line1: z.string().min(1, 'Address is required.'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required.'),
  state: z.string().min(1, 'State is required.'),
  postalCode: z.string().min(1, 'Postal code is required.'),
  country: z.string().min(1, 'Country is required.'),
  phone: z.string().optional()
})

const orderLineItemFormSchema = z.object({
  productId: z.string().min(1, 'Pick a product.'),
  quantity: z.coerce.number().int('Whole numbers only.').min(1, 'At least 1.')
})

export const orderFormSchema = z.object({
  customerId: z.string().min(1, 'Select a customer.'),
  status: orderStatusSchema,
  paymentStatus: paymentStatusSchema,
  channel: orderChannelSchema,
  paymentMethod: paymentMethodSchema,
  items: z.array(orderLineItemFormSchema).min(1, 'Add at least one item.'),
  shippingCost: z.coerce.number().min(0, 'Must be 0 or more.'),
  discount: z.coerce.number().min(0, 'Must be 0 or more.'),
  shippingAddress: addressFormSchema,
  billingAddress: addressFormSchema,
  notes: z.string().optional()
})

export type OrderFormInput = z.input<typeof orderFormSchema>
export type OrderFormOutput = z.output<typeof orderFormSchema>

const EMPTY_ADDRESS = {
  name: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  phone: ''
}

export const ORDER_FORM_DEFAULT_VALUES: OrderFormInput = {
  customerId: '',
  status: 'pending',
  paymentStatus: 'pending',
  channel: 'online',
  paymentMethod: 'credit_card',
  items: [{ productId: '', quantity: '1' }],
  shippingCost: '0',
  discount: '0',
  shippingAddress: { ...EMPTY_ADDRESS },
  billingAddress: { ...EMPTY_ADDRESS },
  notes: ''
}

/** Maps an existing `Order` onto the form's shape — used to prefill Edit Order. */
export function orderToFormValues(order: Order): OrderFormInput {
  return {
    customerId: order.customerId,
    status: order.status,
    paymentStatus: order.paymentStatus,
    channel: order.channel,
    paymentMethod: order.paymentMethod,
    items: order.items.map(item => ({
      productId: item.productId,
      quantity: String(item.quantity)
    })),
    shippingCost: String(order.shippingCost),
    discount: String(order.discount),
    shippingAddress: {
      ...order.shippingAddress,
      line2: order.shippingAddress.line2 ?? '',
      phone: order.shippingAddress.phone ?? ''
    },
    billingAddress: {
      ...order.billingAddress,
      line2: order.billingAddress.line2 ?? '',
      phone: order.billingAddress.phone ?? ''
    },
    notes: order.notes ?? ''
  }
}

/** Resolves `items`/pricing from the submitted form back into the priced, denormalized shape `Order` stores. */
export function buildOrderLineItems(items: OrderFormOutput['items']) {
  return items.map(item => {
    const product = PRODUCTS.find(p => p.id === item.productId)
    const unitPrice = product?.price ?? 0
    return {
      productId: item.productId,
      name: product?.name ?? 'Unknown product',
      sku: product?.sku ?? '',
      imageUrl: product?.imageUrl,
      quantity: item.quantity,
      unitPrice,
      lineTotal: Number((unitPrice * item.quantity).toFixed(2))
    }
  })
}
