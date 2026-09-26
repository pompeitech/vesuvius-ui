import { getAbsences, getEmployees, type Absence, type Employee } from '@pompeitech/mock-data'
import { Button, DataTable, toast, Typography } from '@pompeitech/vesuvius-ui'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import { CURRENT_USER } from '../../../lib/current-user'
import { buildRequestColumns } from './components/columns'
import { RequestDialog } from './components/request-dialog'
import type { RequestFormOutput } from './components/request-form-schema'
import { ReviewDialog, type ReviewTarget } from './components/review-dialog'
import { RequestsTableToolbar } from './components/table-toolbar'

export async function loader() {
  const [absences, employees] = await Promise.all([
    getAbsences({ pageSize: 1000 }),
    getEmployees({ pageSize: 200 })
  ])
  return { absences: absences.data, employees: employees.data }
}

const STATUS_PRIORITY: Record<Absence['status'], number> = { pending: 0, approved: 1, rejected: 2 }

export function Component() {
  const { absences: initialAbsences, employees } = useLoaderData() as {
    absences: Absence[]
    employees: Employee[]
  }
  // Pending requests first (they're what needs review), most recently requested first within each group.
  const [absences, setAbsences] = useState(() =>
    [...initialAbsences].sort(
      (a, b) =>
        STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status] ||
        b.requestedAt.localeCompare(a.requestedAt)
    )
  )
  const [requestDialogOpen, setRequestDialogOpen] = useState(false)
  const [reviewTarget, setReviewTarget] = useState<ReviewTarget>()

  const employeesById = useMemo(() => new Map(employees.map(e => [e.id, e])), [employees])

  const columns = useMemo(
    () =>
      buildRequestColumns({
        employeesById,
        onApprove: row => setReviewTarget({ request: row, decision: 'approved' }),
        onReject: row => setReviewTarget({ request: row, decision: 'rejected' })
      }),
    [employeesById]
  )

  const handleNewRequest = (values: RequestFormOutput) => {
    // The schema's `.superRefine` already requires both dates before
    // submit succeeds — this is just narrowing the `Date | null` type that
    // `schemaHelper.date()` always carries, not a real runtime case.
    if (!values.startDate || !values.endDate) return
    const startDate = values.startDate.toISOString().slice(0, 10)
    const endDate = values.endDate.toISOString().slice(0, 10)
    const newRequest: Absence = {
      id: crypto.randomUUID(),
      employeeId: values.employeeId,
      type: values.type,
      startDate,
      endDate,
      dayPart: values.dayPart,
      // A manually-submitted permit doesn't collect a specific clock range —
      // dayPart already conveys morning/afternoon for display purposes.
      startTime: undefined,
      endTime: undefined,
      status: 'pending',
      note: values.note || undefined,
      requestedAt: new Date().toISOString()
    }
    setAbsences(prev => [newRequest, ...prev])
    toast.success(
      `Request submitted for ${employeesById.get(values.employeeId)?.name ?? 'employee'}.`
    )
  }

  const handleReviewConfirm = (reviewNote: string | undefined) => {
    if (!reviewTarget) return
    const { request, decision } = reviewTarget
    setAbsences(prev =>
      prev.map(a =>
        a.id === request.id
          ? {
              ...a,
              status: decision,
              reviewNote,
              reviewedBy: CURRENT_USER.name,
              reviewedAt: new Date().toISOString()
            }
          : a
      )
    )
    const employeeName = employeesById.get(request.employeeId)?.name ?? 'request'
    if (decision === 'approved') {
      toast.success(`Approved ${employeeName}'s request.`)
    } else {
      toast.warning(`Rejected ${employeeName}'s request.`)
    }
    setReviewTarget(undefined)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Time Off Requests
          </Typography>
          <Typography variant="muted">
            Vacation, permits, smart working, and sick leave awaiting review.
          </Typography>
        </div>
        <Button onClick={() => setRequestDialogOpen(true)}>
          <PlusIcon />
          Request Time Off
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={absences}
        getRowId={row => row.id}
        searchPlaceholder="Search requests..."
        toolbar={ctx => <RequestsTableToolbar {...ctx} />}
      />

      <RequestDialog
        employees={employees}
        open={requestDialogOpen}
        onOpenChange={setRequestDialogOpen}
        onSubmit={handleNewRequest}
      />

      <ReviewDialog
        target={reviewTarget}
        employeesById={employeesById}
        onOpenChange={open => !open && setReviewTarget(undefined)}
        onConfirm={handleReviewConfirm}
      />
    </div>
  )
}
