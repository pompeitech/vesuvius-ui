import { OFFICES, ORDERS, type Shipment, type ShipmentActivityEvent } from '@pompeitech/mock-data'
import { schemaHelper } from '@admin/form'
import { z } from 'zod'

// `@pompeitech/mock-data` pins zod v3 while this app (and `@pompeitech/vesuvius-ui`)
// are on zod v4 — embedding one of its schema objects (e.g. `shipmentStatusSchema`)
// directly into this v4 `z.object()` type-checks but silently infers `unknown`
// for that field. Local `z.enum([...])` literals mirroring the same values
// side-step the cross-version inference gap; the string unions themselves
// still come from the real `ShipmentStatus`/etc. types via the `satisfies`
// checks below, so a schema change in mock-data still surfaces as a type error here.
const shipmentStatusValues = [
  'label_created',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'exception'
] as const
const shipmentServiceTierValues = [
  'standard',
  'express',
  'priority_air',
  'economy',
  'signature'
] as const
const shipmentPackageTypeValues = ['box', 'envelope', 'pallet', 'tube', 'crate'] as const
shipmentStatusValues satisfies readonly Shipment['status'][]
shipmentServiceTierValues satisfies readonly Shipment['serviceTier'][]
shipmentPackageTypeValues satisfies readonly Shipment['packageType'][]

/** `{ label, value }` pairs for the "Linked order" picker — built once from the fixed order list. */
export const ORDER_OPTIONS = ORDERS.map(order => ({
  label: `${order.orderNumber} — ${order.customerName}`,
  value: order.id
}))

// Mirrors the generator's own private `CARRIERS` list (packages/mock-data/src/generators/dataset.ts)
// — kept in sync manually since that array isn't exported (it's an internal
// generation detail, not part of the public `Shipment` schema).
export const CARRIER_OPTIONS = ['UPS', 'FedEx', 'DHL', 'USPS', 'ParcelFlow'].map(carrier => ({
  label: carrier,
  value: carrier
}))

// Same duplication note as `CARRIER_OPTIONS` above — mirrors the generator's private `HUB_NAMES`.
const HUB_NAMES = [
  'Mercer Hub',
  'Salt Lake City Hub',
  'Chicago Sort Facility',
  'Newark Gateway',
  'Dallas Cross-Dock',
  'Denver Regional Hub',
  'Atlanta Sort Center',
  'Phoenix Gateway'
]

function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)] as T
}

function randomHubs(): string[] {
  const shuffled = [...HUB_NAMES].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 2 + Math.round(Math.random()))
}

/** A plausible-but-fake pin near the linked order's own shipping coordinates aren't tracked — same "not a real geocode" caveat as the generator's `pseudoCoordinates`. */
function pseudoCoordinates(): { lat: number; lng: number } {
  return { lat: Math.random() * 120 - 55, lng: Math.random() * 340 - 170 }
}

export const shipmentFormSchema = z.object({
  orderId: z.string().min(1, 'Select the order this shipment belongs to.'),
  carrier: z.string().min(1, 'Select a carrier.'),
  trackingNumber: z.string().min(1, 'Tracking number is required.'),
  serviceTier: z.enum(shipmentServiceTierValues),
  status: z.enum(shipmentStatusValues),
  estimatedDelivery: schemaHelper.date(),
  packageName: z.string().min(1, 'Package name is required.'),
  packageType: z.enum(shipmentPackageTypeValues),
  itemWeightKg: z.coerce.number().min(0, 'Must be 0 or more.'),
  totalWeightKg: z.coerce.number().min(0, 'Must be 0 or more.'),
  lengthCm: z.coerce.number().min(0, 'Must be 0 or more.'),
  widthCm: z.coerce.number().min(0, 'Must be 0 or more.'),
  heightCm: z.coerce.number().min(0, 'Must be 0 or more.'),
  // Decorative — mirrors the reference form's "save package" checkbox, but
  // nothing in the `Shipment` schema tracks a reusable package library, so
  // (same principle as the detail page's toast-only actions) it doesn't
  // persist anywhere.
  savePackage: z.boolean().optional(),
  notes: z.string().optional()
})

export type ShipmentFormInput = z.input<typeof shipmentFormSchema>
export type ShipmentFormOutput = z.output<typeof shipmentFormSchema>

export const SHIPMENT_FORM_DEFAULT_VALUES: ShipmentFormInput = {
  orderId: '',
  carrier: '',
  trackingNumber: '',
  serviceTier: 'standard',
  status: 'label_created',
  estimatedDelivery: new Date(new Date().getTime() + 5 * 86_400_000),
  packageName: '',
  packageType: 'box',
  itemWeightKg: '1',
  totalWeightKg: '1.2',
  lengthCm: '30',
  widthCm: '20',
  heightCm: '15',
  savePackage: false,
  notes: ''
}

/** Maps an existing `Shipment` onto the form's shape — used to prefill Edit Shipping Label. */
export function shipmentToFormValues(shipment: Shipment): ShipmentFormInput {
  return {
    orderId: shipment.orderId,
    carrier: shipment.carrier,
    trackingNumber: shipment.trackingNumber,
    serviceTier: shipment.serviceTier,
    status: shipment.status,
    estimatedDelivery: new Date(shipment.estimatedDelivery),
    packageName: shipment.packageName,
    packageType: shipment.packageType,
    itemWeightKg: String(shipment.itemWeightKg),
    totalWeightKg: String(shipment.totalWeightKg),
    lengthCm: String(shipment.lengthCm),
    widthCm: String(shipment.widthCm),
    heightCm: String(shipment.heightCm),
    savePackage: false,
    notes: shipment.notes ?? ''
  }
}

function currentHubFor(
  status: ShipmentFormOutput['status'],
  originCity: string,
  destinationCity: string,
  routeHubs: string[]
): string {
  if (status === 'label_created') return `${originCity} Origin Facility`
  if (status === 'delivered') return `${destinationCity} Delivery Facility`
  return randomFrom(routeHubs)
}

/** Resolves the submitted form + its linked order into the full `Shipment` shape `addShipment`/`updateShipment` expect. Route/hub/coordinate fields aren't editable in the form (same as the reference UI), so a new shipment gets freshly randomized ones and an edit keeps the existing ones. */
export function buildShipmentFromForm(values: ShipmentFormOutput, existing?: Shipment): Shipment {
  const order = ORDERS.find(o => o.id === values.orderId)
  const origin = existing
    ? {
        city: existing.originCity,
        country: existing.originCountry,
        lat: existing.originLat,
        lng: existing.originLng
      }
    : randomFrom(OFFICES)
  const destinationCity = order?.shippingAddress.city ?? existing?.destinationCity ?? 'Unknown'
  const destinationCountry =
    order?.shippingAddress.country ?? existing?.destinationCountry ?? 'Unknown'
  const destinationCoords = existing
    ? { lat: existing.destinationLat, lng: existing.destinationLng }
    : pseudoCoordinates()
  const routeHubs = existing?.routeHubs ?? randomHubs()
  const statusChanged = !existing || existing.status !== values.status

  const activity: ShipmentActivityEvent[] = existing ? [...existing.activity] : []
  if (!existing) {
    activity.push({
      title: 'Shipping label created',
      description: `Label created for order ${order?.orderNumber ?? values.orderId} via ${values.carrier}.`,
      location: origin.city,
      timestamp: new Date().toISOString()
    })
  } else if (statusChanged) {
    activity.push({
      title: 'Status updated',
      description: `Shipment status changed to "${values.status.replace(/_/g, ' ')}".`,
      timestamp: new Date().toISOString()
    })
  }

  return {
    id: existing?.id ?? crypto.randomUUID(),
    orderId: values.orderId,
    orderNumber: order?.orderNumber ?? existing?.orderNumber ?? '—',
    carrier: values.carrier,
    trackingNumber: values.trackingNumber,
    status: values.status,
    estimatedDelivery: (values.estimatedDelivery ?? new Date()).toISOString(),

    serviceTier: values.serviceTier,
    originCity: origin.city,
    originCountry: origin.country,
    originLat: origin.lat,
    originLng: origin.lng,
    destinationCity,
    destinationCountry,
    destinationLat: destinationCoords.lat,
    destinationLng: destinationCoords.lng,
    currentHub: currentHubFor(values.status, origin.city, destinationCity, routeHubs),
    routeHubs,
    lastScanAt: existing && !statusChanged ? existing.lastScanAt : new Date().toISOString(),
    delayed: values.status === 'exception' ? true : (existing?.delayed ?? false),

    packageName: values.packageName,
    packageType: values.packageType,
    itemWeightKg: values.itemWeightKg,
    totalWeightKg: values.totalWeightKg,
    lengthCm: values.lengthCm,
    widthCm: values.widthCm,
    heightCm: values.heightCm,
    notes: values.notes,

    activity
  }
}
