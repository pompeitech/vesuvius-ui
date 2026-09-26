import type { ClockLocation, Office } from '@pompeitech/mock-data'
import { officeLocationLabel } from '@pompeitech/mock-data'
import { timeToMinutes, type AttendancePolicy } from '../_shared/attendance-policy'

/** Great-circle distance between two lat/lng points, in meters. */
export function haversineDistanceMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const EARTH_RADIUS_METERS = 6_371_000
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(h))
}

/**
 * Turns a raw browser `GeolocationPosition` into a `ClockLocation` by
 * geofencing it against the employee's assigned office — looked up from
 * the company's own managed `offices` list (Company → Offices settings),
 * so editing an office's coordinates there actually changes what counts
 * as "on-site" here instead of reading a separate hardcoded copy.
 * `geofenceMeters` comes from the configurable Attendance Policy.
 */
export function resolveClockLocation(
  position: GeolocationPosition,
  assignedOffice: string,
  geofenceMeters: number,
  offices: Office[]
): ClockLocation {
  const { latitude: lat, longitude: lng, accuracy } = position.coords
  const office = offices.find(candidate => officeLocationLabel(candidate) === assignedOffice)
  const onSite = !!office && haversineDistanceMeters({ lat, lng }, office) <= geofenceMeters

  return {
    lat,
    lng,
    accuracyMeters: Math.round(accuracy),
    onSite,
    label: onSite ? `${assignedOffice} Office` : 'Off-site'
  }
}

/** A manual "I can't share my location" fallback — no coordinates, so no map, but the record isn't just left blank. */
export function manualClockLocation(assignedOffice: string): ClockLocation {
  return { lat: 0, lng: 0, onSite: true, label: `${assignedOffice} Office (manual)` }
}

export type CheckTiming = {
  /** Past the standard time by more than the grace period. */
  late: boolean
  minutesPastStandard: number
  /** Outside the configured window entirely — worth flagging even when "late" doesn't apply (e.g. clocking in at 6am). */
  withinWindow: boolean
  message: string
}

/** How a clock-in compares to the configured check-in window/standard time/grace period. */
export function evaluateCheckIn(now: Date, policy: AttendancePolicy): CheckTiming {
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const windowStart = timeToMinutes(policy.checkInWindowStart)
  const windowEnd = timeToMinutes(policy.checkInWindowEnd)
  const standard = timeToMinutes(policy.standardStartTime)
  const withinWindow = nowMinutes >= windowStart && nowMinutes <= windowEnd
  const minutesPastStandard = nowMinutes - standard
  const late = minutesPastStandard > policy.graceMinutes

  const message = !withinWindow
    ? `Outside the usual check-in window (${policy.checkInWindowStart}–${policy.checkInWindowEnd}).`
    : late
      ? `${minutesPastStandard} min past the standard start time.`
      : 'On time.'

  return { late, minutesPastStandard, withinWindow, message }
}

/** How a clock-out compares to the configured check-out window/standard time. */
export function evaluateCheckOut(now: Date, policy: AttendancePolicy): CheckTiming {
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const windowStart = timeToMinutes(policy.checkOutWindowStart)
  const windowEnd = timeToMinutes(policy.checkOutWindowEnd)
  const standard = timeToMinutes(policy.standardEndTime)
  const withinWindow = nowMinutes >= windowStart && nowMinutes <= windowEnd
  const minutesPastStandard = nowMinutes - standard
  const late = false

  const message = !withinWindow
    ? nowMinutes < windowStart
      ? `Earlier than the usual check-out window (${policy.checkOutWindowStart}–${policy.checkOutWindowEnd}).`
      : `Later than the usual check-out window (${policy.checkOutWindowStart}–${policy.checkOutWindowEnd}).`
    : nowMinutes < standard
      ? `${Math.abs(minutesPastStandard)} min before the standard end time.`
      : 'Right on schedule.'

  return { late, minutesPastStandard, withinWindow, message }
}

export function formatElapsed(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return hours > 0 ? `${hours}h ${pad(minutes)}m ${pad(seconds)}s` : `${minutes}m ${pad(seconds)}s`
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}
