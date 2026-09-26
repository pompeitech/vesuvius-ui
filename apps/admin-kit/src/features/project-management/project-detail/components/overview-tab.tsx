import type { Issue, Project } from '@pompeitech/mock-data'
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  SimpleBarChart,
  SimplePieChart,
  StatCard
} from '@pompeitech/vesuvius-ui'
import { CalendarClockIcon, ListChecksIcon, PencilLineIcon, PlusCircleIcon } from 'lucide-react'
import {
  BADGE_VARIANT_TO_CSS_VAR,
  ISSUE_PRIORITY_LABEL,
  ISSUE_PRIORITY_OPTIONS,
  ISSUE_STATUS_LABEL,
  ISSUE_STATUS_ORDER,
  ISSUE_STATUS_VARIANT,
  ISSUE_TYPE_ICON,
  ISSUE_TYPE_LABEL,
  ISSUE_TYPE_OPTIONS,
  dateFormatter
} from '../../_shared/format'

const MS_PER_DAY = 86_400_000

type OverviewTabProps = {
  project: Project
  issues: Issue[]
  onOpenIssue: (issue: Issue) => void
}

/** The project's "Riepilogo" — stat strip, status donut, recent activity, priority breakdown, ticket-type mix. */
export function OverviewTab({ project, issues, onOpenIssue }: OverviewTabProps) {
  const now = new Date().getTime()
  const sevenDaysAgo = now - 7 * MS_PER_DAY
  const sevenDaysFromNow = now + 7 * MS_PER_DAY
  const wasUpdatedRecently = (issue: Issue) =>
    new Date(issue.updatedAt ?? issue.createdAt).getTime() >= sevenDaysAgo

  const completedThisWeek = issues.filter(i => i.status === 'done' && wasUpdatedRecently(i)).length
  const updatedThisWeek = issues.filter(wasUpdatedRecently).length
  const createdThisWeek = issues.filter(i => new Date(i.createdAt).getTime() >= sevenDaysAgo).length
  const dueSoon = issues.filter(i => {
    if (!i.dueDate || i.status === 'done') return false
    const due = new Date(i.dueDate).getTime()
    return due >= now && due <= sevenDaysFromNow
  }).length

  const statusData = ISSUE_STATUS_ORDER.map(status => ({
    status: ISSUE_STATUS_LABEL[status],
    count: issues.filter(i => i.status === status).length,
    variant: ISSUE_STATUS_VARIANT[status]
  })).filter(entry => entry.count > 0)
  const statusColors = statusData.map(
    entry =>
      (entry.variant ? BADGE_VARIANT_TO_CSS_VAR[entry.variant] : undefined) ?? 'var(--chart-1)'
  )

  const priorityData = ISSUE_PRIORITY_OPTIONS.map(option => ({
    priority: ISSUE_PRIORITY_LABEL[option.value],
    count: issues.filter(i => i.priority === option.value).length
  }))

  const typeBreakdown = ISSUE_TYPE_OPTIONS.map(option => ({
    ...option,
    count: issues.filter(i => i.type === option.value).length
  })).filter(entry => entry.count > 0)

  const recentIssues = [...issues]
    .sort((a, b) => (b.updatedAt ?? b.createdAt).localeCompare(a.updatedAt ?? a.createdAt))
    .slice(0, 5)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Completed (7d)" value={completedThisWeek} icon={ListChecksIcon} />
        <StatCard label="Updated (7d)" value={updatedThisWeek} icon={PencilLineIcon} />
        <StatCard label="Created (7d)" value={createdThisWeek} icon={PlusCircleIcon} />
        <StatCard label="Due soon" value={dueSoon} icon={CalendarClockIcon} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Status overview</CardTitle>
          </CardHeader>
          <CardContent>
            {statusData.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No issues yet.</p>
            ) : (
              <SimplePieChart
                data={statusData}
                category="count"
                index="status"
                colors={statusColors}
                innerRadius="60%"
                className="h-64"
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {recentIssues.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No issues yet.</p>
            ) : (
              recentIssues.map(issue => {
                const TypeIcon = ISSUE_TYPE_ICON[issue.type]
                return (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => onOpenIssue(issue)}
                    className="flex w-full items-center gap-3 py-2.5 text-left hover:bg-muted/50"
                  >
                    <TypeIcon className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{issue.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {issue.key} ·{' '}
                        {dateFormatter.format(new Date(issue.updatedAt ?? issue.createdAt))}
                      </p>
                    </div>
                    <Badge variant={ISSUE_STATUS_VARIANT[issue.status]}>
                      {ISSUE_STATUS_LABEL[issue.status]}
                    </Badge>
                  </button>
                )
              })
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart
              data={priorityData}
              index="priority"
              categories={['count']}
              showLegend={false}
              className="h-64"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ticket types</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {typeBreakdown.map(entry => {
              const share = issues.length > 0 ? Math.round((entry.count / issues.length) * 100) : 0
              return (
                <div key={entry.value} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{ISSUE_TYPE_LABEL[entry.value]}</span>
                    <span className="text-muted-foreground">{share}%</span>
                  </div>
                  <Progress value={share} className="h-1.5" />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About this project</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
