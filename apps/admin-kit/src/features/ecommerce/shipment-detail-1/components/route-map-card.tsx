import type { Shipment } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import { shipmentProgressFraction } from '../../_shared/shipment-tracker-steps'

// Same keyless OSM tile source established for the HR Location Map — CartoDB's
// free tiles now require an API key, plain OSM raster tiles don't.
const TILE_LAYER = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}

// A plain HTML dot `divIcon` — Leaflet's default `L.Icon` references PNGs
// Vite doesn't resolve, same fix as the Location Map.
function markerIcon(color: string, size: number): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};border:2px solid var(--background);box-shadow:0 1px 4px rgba(0,0,0,0.4);"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  })
}

function FitToRoute({ points }: { points: [number, number][] }) {
  const map = useMap()

  useEffect(() => {
    map.fitBounds(L.latLngBounds(points), { padding: [32, 32], maxZoom: 8 })
  }, [points, map])

  return null
}

/** Origin/destination markers + a straight route line, with a "current position" dot interpolated from the shipment's tracker progress. */
export function RouteMapCard({ shipment }: { shipment: Shipment }) {
  const origin: [number, number] = [shipment.originLat, shipment.originLng]
  const destination: [number, number] = [shipment.destinationLat, shipment.destinationLng]

  const current = useMemo<[number, number]>(() => {
    const t = shipmentProgressFraction(shipment.status)
    return [
      origin[0] + (destination[0] - origin[0]) * t,
      origin[1] + (destination[1] - origin[1]) * t
    ]
    // `origin`/`destination` are freshly-built arrays every render — depend on
    // the primitive lat/lng fields they're built from instead, or this would
    // recompute (and re-render every child) on every render regardless.
  }, [
    shipment.status,
    shipment.originLat,
    shipment.originLng,
    shipment.destinationLat,
    shipment.destinationLng
  ])

  return (
    <Card className="flex flex-1 flex-col overflow-hidden">
      <CardHeader>
        <CardTitle>Route map</CardTitle>
      </CardHeader>
      <CardContent className="min-h-72 flex-1 overflow-hidden p-0">
        <MapContainer center={origin} zoom={4} className="h-full w-full" scrollWheelZoom={false}>
          <TileLayer url={TILE_LAYER.url} attribution={TILE_LAYER.attribution} />
          <FitToRoute points={[origin, destination]} />
          <Polyline
            positions={[origin, destination]}
            pathOptions={{ color: 'var(--muted-foreground)', dashArray: '4 6' }}
          />
          <Marker position={origin} icon={markerIcon('var(--muted-foreground)', 12)}>
            <Popup>{shipment.originCity} — origin</Popup>
          </Marker>
          <Marker position={destination} icon={markerIcon('var(--primary)', 12)}>
            <Popup>{shipment.destinationCity} — destination</Popup>
          </Marker>
          <Marker position={current} icon={markerIcon('var(--info)', 16)}>
            <Popup>{shipment.currentHub} — current position</Popup>
          </Marker>
        </MapContainer>
      </CardContent>
    </Card>
  )
}
