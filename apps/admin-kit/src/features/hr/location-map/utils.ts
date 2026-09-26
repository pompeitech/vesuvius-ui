import { OFFICE_COORDINATES } from '@pompeitech/mock-data'
import type { EmployeeLiveState } from '../team-status/simulate'

export type MapCoordinates = { lat: number; lng: number }

const KNOWN_CITIES = Object.keys(OFFICE_COORDINATES)

/**
 * A tiny deterministic string hash → a stable "random" number in [0, 1).
 * Same pattern as `team-status/simulate.ts` — kept as a local per-feature
 * copy rather than a shared util, consistent with how that file already
 * does it.
 */
function seededRandom(seed: string): number {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0) / 4294967295
}

/** Deterministic offset within `radiusMeters` of a point — a stable "random" scatter, not a real address. */
function jitterCoordinates(
  lat: number,
  lng: number,
  seed: string,
  radiusMeters: number
): MapCoordinates {
  const angle = seededRandom(`${seed}:angle`) * 2 * Math.PI
  const distance = seededRandom(`${seed}:dist`) * radiusMeters
  // ~111,320m per degree of latitude; longitude degrees shrink with cos(latitude).
  const dLat = (distance * Math.cos(angle)) / 111_320
  const dLng = (distance * Math.sin(angle)) / (111_320 * Math.cos((lat * Math.PI) / 180))
  return { lat: lat + dLat, lng: lng + dLng }
}

/** Picks one of the known office cities deterministically for a given employee — used only for fully-"Remote" hires who have no assigned city at all. */
function fallbackCityFor(employeeId: string): string | undefined {
  if (KNOWN_CITIES.length === 0) return undefined
  const index = Math.floor(seededRandom(`${employeeId}:home-city`) * KNOWN_CITIES.length)
  return KNOWN_CITIES[index]
}

/**
 * Where to draw an employee's pin right now, derived from their simulated
 * live state — no real per-employee address exists in this mock dataset,
 * so every position here is a deterministic simulation, not a fact:
 * - checked in on-site: tightly scattered (~150m) around their office's
 *   real coordinates (`OFFICE_COORDINATES`, the same table the Time Clock's
 *   own geofencing uses).
 * - checked in remotely: loosely scattered (~4km) around whichever city
 *   applies — their own assigned city if they have one, otherwise (a fully
 *   "Remote" hire with no assigned city) one picked deterministically per
 *   employee so the same person always lands in the same metro area.
 * - not arrived / checked out / on leave / day off: `undefined` — there's
 *   no meaningful "where" for someone who isn't currently working.
 */
export function resolveEmployeeCoordinates(state: EmployeeLiveState): MapCoordinates | undefined {
  const { employee, status } = state

  if (status === 'checked_in_onsite') {
    const office = OFFICE_COORDINATES[employee.location]
    if (!office) return undefined
    return jitterCoordinates(office.lat, office.lng, employee.id, 150)
  }

  if (status === 'checked_in_remote') {
    const city = OFFICE_COORDINATES[employee.location]
      ? employee.location
      : fallbackCityFor(employee.id)
    const base = city ? OFFICE_COORDINATES[city] : undefined
    if (!base) return undefined
    return jitterCoordinates(base.lat, base.lng, employee.id, 4_000)
  }

  return undefined
}
