import type { ShipmentStatus } from '@pompeitech/mock-data'
import {
  ClipboardCheckIcon,
  HouseIcon,
  PackageIcon,
  TruckIcon,
  type LucideIcon
} from 'lucide-react'

export type ShipmentTrackerStep = {
  key: string
  label: string
  icon: LucideIcon
  done: boolean
  current: boolean
  failed: boolean
}

const STEP_META: { key: string; label: string; icon: LucideIcon }[] = [
  { key: 'created', label: 'Created', icon: PackageIcon },
  { key: 'confirmed', label: 'Confirmed', icon: ClipboardCheckIcon },
  { key: 'transit', label: 'Transit', icon: TruckIcon },
  { key: 'delivered', label: 'Delivered', icon: HouseIcon }
]

/**
 * Index (0-3) into `STEP_META` each `ShipmentStatus` has reached. The 5
 * statuses this kit's `Shipment` schema already uses collapse onto the
 * reference's 4-step Created/Confirmed/Transit/Delivered tracker — no new
 * status was invented for this: `out_for_delivery` stays inside the
 * "Transit" step (it's still in motion, same as `in_transit`), and
 * `exception` stalls at "Confirmed" (the carrier had already picked the
 * package up — see `buildShipmentActivity` — before whatever went wrong).
 */
const STATUS_STEP_INDEX: Record<ShipmentStatus, number> = {
  label_created: 0,
  in_transit: 2,
  out_for_delivery: 2,
  delivered: 3,
  exception: 1
}

/** How far along the Created→Delivered line a shipment's `status` sits (0 = just created, 1 = delivered) — used to place the "current position" marker on the route map. */
export function shipmentProgressFraction(status: ShipmentStatus): number {
  return STATUS_STEP_INDEX[status] / (STEP_META.length - 1)
}

export function buildShipmentTrackerSteps(status: ShipmentStatus): ShipmentTrackerStep[] {
  const reached = STATUS_STEP_INDEX[status]
  const failed = status === 'exception'
  return STEP_META.map((meta, i) => ({
    ...meta,
    done: i < reached || (i === reached && !failed),
    current: i === reached,
    failed: failed && i === reached
  }))
}
