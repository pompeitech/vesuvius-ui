import type { ClockLocation, Office } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@pompeitech/vesuvius-ui'
import { useMemo, useState } from 'react'
import type { AttendancePolicy } from '../../_shared/attendance-policy'
import { evaluateCheckIn, evaluateCheckOut } from '../utils'
import { LocationPanel } from './location-panel'

export type ClockAction = 'in' | 'out'

type ClockActionDialogProps = {
  action: ClockAction | undefined
  assignedOffice: string
  policy: AttendancePolicy
  offices: Office[]
  onOpenChange: (open: boolean) => void
  onConfirm: (location: ClockLocation) => void
}

/** Clock In and Clock Out share this exact flow — resolve a location, see how it compares to the policy, then confirm. */
export function ClockActionDialog({
  action,
  assignedOffice,
  policy,
  offices,
  onOpenChange,
  onConfirm
}: ClockActionDialogProps) {
  return (
    <Dialog open={!!action} onOpenChange={open => !open && onOpenChange(false)}>
      <DialogContent className="sm:max-w-md">
        {action && (
          <ClockActionDialogBody
            key={action}
            action={action}
            assignedOffice={assignedOffice}
            policy={policy}
            offices={offices}
            onCancel={() => onOpenChange(false)}
            onConfirm={onConfirm}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function ClockActionDialogBody({
  action,
  assignedOffice,
  policy,
  offices,
  onCancel,
  onConfirm
}: {
  action: ClockAction
  assignedOffice: string
  policy: AttendancePolicy
  offices: Office[]
  onCancel: () => void
  onConfirm: (location: ClockLocation) => void
}) {
  const [resolved, setResolved] = useState<ClockLocation>()
  const isClockIn = action === 'in'

  const timing = useMemo(
    () => (isClockIn ? evaluateCheckIn(new Date(), policy) : evaluateCheckOut(new Date(), policy)),
    [isClockIn, policy]
  )

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isClockIn ? 'Clock in' : 'Clock out'}</DialogTitle>
        <DialogDescription>
          Confirm your location to {isClockIn ? 'start' : 'end'} tracking your time today.
        </DialogDescription>
      </DialogHeader>

      <LocationPanel
        assignedOffice={assignedOffice}
        geofenceMeters={policy.geofenceMeters}
        offices={offices}
        resolved={resolved}
        onResolved={setResolved}
      />

      <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm">
        <Badge variant={timing.late || !timing.withinWindow ? 'warning' : 'success'}>
          {timing.late || !timing.withinWindow ? 'Heads up' : 'On track'}
        </Badge>
        <span className="text-muted-foreground">{timing.message}</span>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" disabled={!resolved} onClick={() => resolved && onConfirm(resolved)}>
          {isClockIn ? 'Confirm clock in' : 'Confirm clock out'}
        </Button>
      </DialogFooter>
    </>
  )
}
