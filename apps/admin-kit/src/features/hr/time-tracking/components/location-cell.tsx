import type { ClockLocation } from '@pompeitech/mock-data'
import { Badge, Tooltip, TooltipContent, TooltipTrigger } from '@pompeitech/vesuvius-ui'
import { MapPinIcon } from 'lucide-react'

/** The resolved check-in location for one time entry — label, on-site/off-site badge, and coordinates on hover. */
export function LocationCell({ location }: { location: ClockLocation | undefined }) {
  if (!location) return <span className="text-muted-foreground">-</span>
  const hasCoordinates = location.lat !== 0 || location.lng !== 0

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex w-fit cursor-default items-center gap-1.5">
          <MapPinIcon className="size-3.5 text-muted-foreground" />
          <span className="truncate">{location.label}</span>
          <Badge variant={location.onSite ? 'success' : 'secondary'} className="shrink-0">
            {location.onSite ? 'On-site' : 'Off-site'}
          </Badge>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">
        {hasCoordinates ? (
          <>
            <p>
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
            {location.accuracyMeters !== undefined && (
              <p className="opacity-80">±{location.accuracyMeters}m accuracy</p>
            )}
          </>
        ) : (
          <p className="opacity-80">Entered manually — no coordinates.</p>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
