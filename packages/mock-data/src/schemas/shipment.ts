import { z } from 'zod'

export const shipmentStatusSchema = z.enum([
  'label_created',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'exception'
])
export type ShipmentStatus = z.infer<typeof shipmentStatusSchema>

export const shipmentServiceTierSchema = z.enum([
  'standard',
  'express',
  'priority_air',
  'economy',
  'signature'
])
export type ShipmentServiceTier = z.infer<typeof shipmentServiceTierSchema>

export const shipmentPackageTypeSchema = z.enum(['box', 'envelope', 'pallet', 'tube', 'crate'])
export type ShipmentPackageType = z.infer<typeof shipmentPackageTypeSchema>

/** One entry in a shipment's `activity` timeline — a status update, not a separate entity (same idea as `Order.items` living inline). */
export const shipmentActivityEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string().optional(),
  timestamp: z.string()
})
export type ShipmentActivityEvent = z.infer<typeof shipmentActivityEventSchema>

export const shipmentSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  orderNumber: z.string(),
  carrier: z.string(),
  trackingNumber: z.string(),
  status: shipmentStatusSchema,
  estimatedDelivery: z.string(),

  serviceTier: shipmentServiceTierSchema,
  /** "Warehouse/office this shipment left from" → the destination's city, both real `Office`/`Order.shippingAddress` values, not invented. */
  originCity: z.string(),
  originCountry: z.string(),
  originLat: z.number(),
  originLng: z.number(),
  destinationCity: z.string(),
  destinationCountry: z.string(),
  destinationLat: z.number(),
  destinationLng: z.number(),
  /** Where the package physically is right now — one of `routeHubs`, or the destination once delivered. */
  currentHub: z.string(),
  /** The named hubs the parcel passes through, origin → destination, for the route line under "Route". */
  routeHubs: z.array(z.string()),
  lastScanAt: z.string(),
  /** Running behind its `estimatedDelivery` — drives the "Delay" badge. */
  delayed: z.boolean(),

  packageName: z.string(),
  packageType: shipmentPackageTypeSchema,
  itemWeightKg: z.number(),
  totalWeightKg: z.number(),
  lengthCm: z.number(),
  widthCm: z.number(),
  heightCm: z.number(),
  notes: z.string().optional(),

  activity: z.array(shipmentActivityEventSchema)
})

export type Shipment = z.infer<typeof shipmentSchema>
