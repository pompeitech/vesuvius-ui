import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import type { EmployeeLiveState } from '../../team-status/simulate'
import type { MapCoordinates } from '../utils'

export type MappedEmployee = {
  state: EmployeeLiveState
  coordinates: MapCoordinates
}

type EmployeeMapProps = {
  employees: MappedEmployee[]
  selectedId: string | undefined
  onSelect: (employeeId: string) => void
}

// The standard OpenStreetMap "Carto" style — free, keyless raster tiles.
// (CartoDB's own free-tier basemaps now watermark "API key required"
// without one, so this is the one keyless option that actually renders.)
const TILE_LAYER = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}

const STATUS_COLOR: Record<EmployeeLiveState['status'], string> = {
  checked_in_onsite: 'var(--success)',
  checked_in_remote: 'var(--info)',
  not_arrived: 'var(--muted-foreground)',
  checked_out: 'var(--muted-foreground)',
  on_leave: 'var(--muted-foreground)',
  day_off: 'var(--muted-foreground)'
}

// A plain HTML dot instead of Leaflet's default `L.Icon` — the default
// icon references PNGs that Vite doesn't resolve out of the box and ends
// up broken/invisible. A `divIcon` sidesteps that entirely.
function markerIcon(color: string, selected: boolean): L.DivIcon {
  const size = selected ? 20 : 14
  return L.divIcon({
    className: '',
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:2px solid var(--background);box-shadow:0 1px 4px rgba(0,0,0,0.4);"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  })
}

/** Re-fits the map to the visible markers whenever the list changes. */
function FitBounds({ employees }: { employees: MappedEmployee[] }) {
  const map = useMap()

  useEffect(() => {
    if (employees.length === 0) return
    const bounds = L.latLngBounds(employees.map(e => [e.coordinates.lat, e.coordinates.lng]))
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
  }, [employees, map])

  return null
}

/** Flies to whichever pin was just selected from the sidebar list — separate from `FitBounds` so picking one person doesn't re-fit the whole board. */
function FlyToSelected({
  employees,
  selectedId
}: {
  employees: MappedEmployee[]
  selectedId: string | undefined
}) {
  const map = useMap()

  useEffect(() => {
    if (!selectedId) return
    const match = employees.find(e => e.state.employee.id === selectedId)
    if (!match) return
    map.flyTo([match.coordinates.lat, match.coordinates.lng], Math.max(map.getZoom(), 13), {
      duration: 0.6
    })
    // Only when the selection itself changes — re-flying on every re-render (e.g. the 30s live refresh) would be jarring.
  }, [selectedId])

  return null
}

export function EmployeeMap({ employees, selectedId, onSelect }: EmployeeMapProps) {
  // A sane default center (the average of every known point, or Milan as a
  // last resort) — only actually used before `FitBounds` takes over, or
  // when the filtered list is empty.
  const fallbackCenter = useMemo<[number, number]>(() => {
    if (employees.length === 0) return [45.4642, 9.19]
    const lat = employees.reduce((sum, e) => sum + e.coordinates.lat, 0) / employees.length
    const lng = employees.reduce((sum, e) => sum + e.coordinates.lng, 0) / employees.length
    return [lat, lng]
  }, [employees])

  return (
    <MapContainer center={fallbackCenter} zoom={5} className="h-full w-full" scrollWheelZoom>
      <TileLayer url={TILE_LAYER.url} attribution={TILE_LAYER.attribution} />
      <FitBounds employees={employees} />
      <FlyToSelected employees={employees} selectedId={selectedId} />
      {employees.map(({ state, coordinates }) => (
        <Marker
          key={state.employee.id}
          position={[coordinates.lat, coordinates.lng]}
          icon={markerIcon(STATUS_COLOR[state.status], state.employee.id === selectedId)}
          eventHandlers={{ click: () => onSelect(state.employee.id) }}
        >
          <Popup>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">{state.employee.name}</span>
              <span className="text-muted-foreground text-xs">
                {state.status === 'checked_in_onsite'
                  ? `On-site · ${state.locationLabel}`
                  : `Remote · ${state.locationLabel ?? 'unknown'}`}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
