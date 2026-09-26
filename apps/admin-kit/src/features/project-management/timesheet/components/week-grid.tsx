import type { Project, TimesheetEntry } from '@pompeitech/mock-data'
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@pompeitech/vesuvius-ui'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { WEEK_DAY_LABELS, isoDate, weekDays } from '../utils'

const dayHeaderFormatter = new Intl.DateTimeFormat('en-US', { day: 'numeric' })

type WeekGridProps = {
  weekStart: Date
  rowProjectIds: string[]
  allProjects: Project[]
  entries: TimesheetEntry[]
  readonly: boolean
  onHoursChange: (projectId: string, date: string, hours: number) => void
  onAddProjectRow: (projectId: string) => void
  onRemoveProjectRow: (projectId: string) => void
}

/** The week's grid — one row per project, one column per day, an hours input in each cell. */
export function WeekGrid({
  weekStart,
  rowProjectIds,
  allProjects,
  entries,
  readonly,
  onHoursChange,
  onAddProjectRow,
  onRemoveProjectRow
}: WeekGridProps) {
  const [addingProjectId, setAddingProjectId] = useState('')
  const days = weekDays(weekStart)
  const projectsById = new Map(allProjects.map(p => [p.id, p]))
  const entriesByProjectAndDate = new Map(entries.map(e => [`${e.projectId}:${e.date}`, e]))
  const availableToAdd = allProjects.filter(p => !rowProjectIds.includes(p.id))

  const hoursFor = (projectId: string, date: string) =>
    entriesByProjectAndDate.get(`${projectId}:${date}`)?.hours ?? 0
  const dayTotal = (date: string) =>
    rowProjectIds.reduce((sum, projectId) => sum + hoursFor(projectId, date), 0)
  const rowTotal = (projectId: string) =>
    days.reduce((sum, day) => sum + hoursFor(projectId, isoDate(day)), 0)
  const grandTotal = days.reduce((sum, day) => sum + dayTotal(isoDate(day)), 0)

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-48">Project</TableHead>
              {days.map((day, i) => (
                <TableHead key={isoDate(day)} className="text-center">
                  <div>{WEEK_DAY_LABELS[i]}</div>
                  <div className="text-xs text-muted-foreground">
                    {dayHeaderFormatter.format(day)}
                  </div>
                </TableHead>
              ))}
              <TableHead className="text-right">Total</TableHead>
              {!readonly && <TableHead className="w-10" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowProjectIds.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={days.length + 2}
                  className="py-8 text-center text-muted-foreground"
                >
                  Add a project below to start logging hours.
                </TableCell>
              </TableRow>
            ) : (
              rowProjectIds.map(projectId => (
                <TableRow key={projectId}>
                  <TableCell className="font-medium">
                    {projectsById.get(projectId)?.name ?? 'Unknown project'}
                  </TableCell>
                  {days.map(day => {
                    const date = isoDate(day)
                    return (
                      <TableCell key={date} className="p-1.5 text-center">
                        <Input
                          type="number"
                          min={0}
                          max={24}
                          step={0.5}
                          disabled={readonly}
                          value={hoursFor(projectId, date) || ''}
                          onChange={event =>
                            onHoursChange(projectId, date, Number(event.target.value) || 0)
                          }
                          className="h-8 w-16 text-center tabular-nums"
                        />
                      </TableCell>
                    )
                  })}
                  <TableCell className="text-right font-medium tabular-nums">
                    {rowTotal(projectId)}h
                  </TableCell>
                  {!readonly && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => onRemoveProjectRow(projectId)}
                      >
                        <Trash2Icon className="size-3.5" />
                        <span className="sr-only">Remove project row</span>
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {!readonly ? (
          <div className="flex items-center gap-2">
            <Select value={addingProjectId} onValueChange={setAddingProjectId}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Add a project..." />
              </SelectTrigger>
              <SelectContent>
                {availableToAdd.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              disabled={!addingProjectId}
              onClick={() => {
                onAddProjectRow(addingProjectId)
                setAddingProjectId('')
              }}
            >
              <PlusIcon />
              Add
            </Button>
          </div>
        ) : (
          <span />
        )}
        <span className="text-sm font-medium">
          Week total: <span className="tabular-nums">{grandTotal}h</span>
        </span>
      </div>
    </div>
  )
}
