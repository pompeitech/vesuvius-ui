import type { ClockLocation, Office } from '@pompeitech/mock-data'
import { Alert, AlertDescription, AlertTitle, Badge, Button } from '@pompeitech/vesuvius-ui'
import {
  AlertTriangleIcon,
  Loader2Icon,
  LocateFixedIcon,
  MapPinIcon,
  MapPinOffIcon
} from 'lucide-react'
import { useEffect } from 'react'
import { manualClockLocation, resolveClockLocation } from '../utils'
import { useGeolocation } from '../use-geolocation'

type LocationPanelProps = {
  assignedOffice: string
  geofenceMeters: number
  offices: Office[]
  onResolved: (location: ClockLocation) => void
  resolved: ClockLocation | undefined
}

/** A small OpenStreetMap embed centered on the resolved point — no API key needed, just an iframe. */
function LocationPreviewMap({ lat, lng }: { lat: number; lng: number }) {
  const delta = 0.004
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`
  return (
    <iframe
      title="Check-in location preview"
      src={src}
      className="h-40 w-full rounded-md border"
      loading="lazy"
    />
  )
}

/**
 * Captures where a clock-in/out is happening from — auto-requests the
 * browser's geolocation on mount, geofences the result against the
 * employee's assigned office, and shows a live map preview. Every real
 * outcome gets its own state (still locating, permission denied, timed
 * out, unsupported browser, some other failure) with a way forward: retry,
 * or fall back to a manual "mark me as on-site" note when location truly
 * isn't available.
 */
export function LocationPanel({
  assignedOffice,
  geofenceMeters,
  offices,
  onResolved,
  resolved
}: LocationPanelProps) {
  const { state, locate } = useGeolocation()

  useEffect(() => {
    if (!resolved) locate()
    // Only auto-run once, when this panel first mounts without a resolved location yet.
  }, [])

  useEffect(() => {
    if (state.status === 'success') {
      onResolved(resolveClockLocation(state.position, assignedOffice, geofenceMeters, offices))
    }
  }, [state])

  if (resolved) {
    const hasCoordinates = resolved.lat !== 0 || resolved.lng !== 0
    return (
      <div className="flex flex-col gap-3">
        {hasCoordinates ? (
          <LocationPreviewMap lat={resolved.lat} lng={resolved.lng} />
        ) : (
          <div className="text-muted-foreground flex h-24 items-center justify-center rounded-md border border-dashed text-sm">
            <MapPinOffIcon className="mr-2 size-4" />
            No map for a manually-entered location.
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPinIcon className="text-muted-foreground size-4" />
            <span className="font-medium">{resolved.label}</span>
            <Badge variant={resolved.onSite ? 'success' : 'secondary'}>
              {resolved.onSite ? 'On-site' : 'Off-site'}
            </Badge>
          </div>
          {hasCoordinates && (
            <Button type="button" variant="ghost" size="sm" onClick={locate}>
              <LocateFixedIcon />
              Refresh
            </Button>
          )}
        </div>
        {resolved.accuracyMeters !== undefined && (
          <p className="text-muted-foreground text-xs">
            Accurate to within {resolved.accuracyMeters}m.
          </p>
        )}
      </div>
    )
  }

  if (state.status === 'idle' || state.status === 'locating') {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 rounded-md border border-dashed py-8 text-sm">
        <Loader2Icon className="size-5 animate-spin" />
        Getting your location…
      </div>
    )
  }

  if (state.status === 'denied') {
    return (
      <Alert variant="warning" appearance="soft">
        <AlertTriangleIcon />
        <AlertTitle>Location access denied</AlertTitle>
        <AlertDescription className="flex flex-col gap-3">
          <span>
            Allow location access in your browser's site settings to check in with your position, or
            mark yourself as on-site manually.
          </span>
          <div className="flex gap-2">
            <Button type="button" size="sm" variant="outline" onClick={locate}>
              Try again
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => onResolved(manualClockLocation(assignedOffice))}
            >
              Mark as on-site manually
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  if (state.status === 'unsupported') {
    return (
      <Alert variant="warning" appearance="soft">
        <AlertTriangleIcon />
        <AlertTitle>Geolocation isn't available</AlertTitle>
        <AlertDescription className="flex flex-col gap-3">
          <span>
            This browser doesn't support location. You can still mark yourself as on-site manually.
          </span>
          <Button
            type="button"
            size="sm"
            onClick={() => onResolved(manualClockLocation(assignedOffice))}
          >
            Mark as on-site manually
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  // "timeout" or generic "error"
  return (
    <Alert variant="destructive" appearance="soft">
      <AlertTriangleIcon />
      <AlertTitle>
        {state.status === 'timeout' ? 'Location request timed out' : "Couldn't get your location"}
      </AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        {state.status === 'error' && <span>{state.message}</span>}
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="outline" onClick={locate}>
            Try again
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => onResolved(manualClockLocation(assignedOffice))}
          >
            Mark as on-site manually
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
