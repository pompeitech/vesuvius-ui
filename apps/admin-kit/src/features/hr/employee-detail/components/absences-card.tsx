import type { Absence } from '@pompeitech/mock-data'
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@pompeitech/vesuvius-ui'
import {
  ABSENCE_STATUS_VARIANT,
  ABSENCE_TYPE_ICON,
  ABSENCE_TYPE_LABEL,
  DAY_PART_LABEL,
  dateFormatter
} from '../../_shared/format'

/** This employee's full absence history, most recent first. */
export function AbsencesCard({ absences }: { absences: Absence[] }) {
  const sorted = [...absences].sort((a, b) => b.startDate.localeCompare(a.startDate))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Absence history</CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No absences on record.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map(absence => {
                const Icon = ABSENCE_TYPE_ICON[absence.type]
                const sameDay = absence.startDate === absence.endDate
                return (
                  <TableRow key={absence.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-muted-foreground" />
                        {ABSENCE_TYPE_LABEL[absence.type]}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {dateFormatter.format(new Date(absence.startDate))}
                      {!sameDay && <> – {dateFormatter.format(new Date(absence.endDate))}</>}
                      {absence.startTime && (
                        <span>
                          {' '}
                          · {absence.startTime}-{absence.endTime}
                        </span>
                      )}
                      {absence.dayPart !== 'full' && (
                        <span> ({DAY_PART_LABEL[absence.dayPart]})</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={ABSENCE_STATUS_VARIANT[absence.status]}
                        className="capitalize"
                      >
                        {absence.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
