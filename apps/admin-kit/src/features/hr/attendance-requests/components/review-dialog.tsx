import type { Absence, Employee } from '@pompeitech/mock-data'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Textarea
} from '@pompeitech/vesuvius-ui'
import { useState } from 'react'
import { ABSENCE_TYPE_LABEL, DAY_PART_LABEL, dateFormatter } from '../../_shared/format'

export type ReviewTarget = { request: Absence; decision: 'approved' | 'rejected' }

type ReviewDialogProps = {
  target: ReviewTarget | undefined
  employeesById: Map<string, Employee>
  onOpenChange: (open: boolean) => void
  onConfirm: (reviewNote: string | undefined) => void
}

/**
 * One dialog behind both the Approve and Reject row actions — same shape,
 * different copy/validation: a rejection requires a reason (what actually
 * happens to the request depends on it), an approval's note is just
 * context for the employee. The body is a separate component, remounted
 * via `key` for every new target, so its note/error state starts fresh
 * without an effect reaching back to reset it.
 */
export function ReviewDialog({
  target,
  employeesById,
  onOpenChange,
  onConfirm
}: ReviewDialogProps) {
  return (
    <Dialog open={!!target} onOpenChange={open => !open && onOpenChange(false)}>
      <DialogContent className="sm:max-w-md">
        {target && (
          <ReviewDialogBody
            key={`${target.request.id}-${target.decision}`}
            target={target}
            employee={employeesById.get(target.request.employeeId)}
            onCancel={() => onOpenChange(false)}
            onConfirm={onConfirm}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function ReviewDialogBody({
  target,
  employee,
  onCancel,
  onConfirm
}: {
  target: ReviewTarget
  employee: Employee | undefined
  onCancel: () => void
  onConfirm: (reviewNote: string | undefined) => void
}) {
  const [note, setNote] = useState('')
  const [error, setError] = useState<string>()

  const isReject = target.decision === 'rejected'

  const handleConfirm = () => {
    if (isReject && note.trim().length < 10) {
      setError('Explain why this request is being rejected (at least 10 characters).')
      return
    }
    onConfirm(note.trim() || undefined)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isReject ? 'Reject request' : 'Approve request'}</DialogTitle>
        <DialogDescription>
          {employee?.name ?? 'This employee'}'s{' '}
          {ABSENCE_TYPE_LABEL[target.request.type].toLowerCase()} request for{' '}
          {dateFormatter.format(new Date(target.request.startDate))}
          {target.request.endDate !== target.request.startDate &&
            ` – ${dateFormatter.format(new Date(target.request.endDate))}`}
          {target.request.dayPart !== 'full' && ` (${DAY_PART_LABEL[target.request.dayPart]})`}.
        </DialogDescription>
      </DialogHeader>

      {target.request.note && (
        <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Employee's note: </span>
          {target.request.note}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="review-note">{isReject ? 'Reason for rejection' : 'Note (optional)'}</Label>
        <Textarea
          id="review-note"
          value={note}
          onChange={event => {
            setNote(event.target.value)
            setError(undefined)
          }}
          rows={3}
          placeholder={
            isReject
              ? 'e.g. Team coverage is too thin on these dates.'
              : 'Anything the employee should know (optional).'
          }
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="button"
          variant={isReject ? 'destructive' : 'default'}
          onClick={handleConfirm}
        >
          {isReject ? 'Reject request' : 'Approve request'}
        </Button>
      </DialogFooter>
    </>
  )
}
