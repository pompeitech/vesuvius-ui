import type { Issue, Project } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, Timeline } from '@pompeitech/vesuvius-ui'
import { useNavigate } from 'react-router'

const DAY_MS = 86_400_000
const dayHeaderFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
})

type UpcomingTimelineCardProps = { issues: Issue[]; projectsById: Map<string, Project> }

/** Every open issue due in the next two weeks, grouped by day — a short timeline rather than a flat sorted list. */
export function UpcomingTimelineCard({ issues, projectsById }: UpcomingTimelineCardProps) {
  const navigate = useNavigate()
  const now = new Date().getTime()
  const twoWeeksOut = now + 14 * DAY_MS

  const upcoming = issues.filter(
    i =>
      i.status !== 'done' &&
      i.dueDate &&
      new Date(i.dueDate).getTime() >= now &&
      new Date(i.dueDate).getTime() <= twoWeeksOut
  )

  const byDay = new Map<string, Issue[]>()
  for (const issue of upcoming) {
    const key = new Date(issue.dueDate!).toDateString()
    const existing = byDay.get(key)
    if (existing) existing.push(issue)
    else byDay.set(key, [issue])
  }
  const days = [...byDay.entries()].sort(
    ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Next 2 Weeks</CardTitle>
      </CardHeader>
      <CardContent className="flex max-h-80 flex-col gap-3 overflow-y-auto">
        {days.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nothing due in the next 14 days.
          </p>
        ) : (
          <Timeline
            aria-label="Upcoming issues"
            items={days.flatMap(([day, dayIssues]) =>
              dayIssues.map(issue => ({
                id: issue.id,
                title: issue.title,
                date: dayHeaderFormatter.format(new Date(day)),
                description: projectsById.get(issue.projectId)?.name ?? 'No project',
                status: 'active' as const,
                onClick: () => navigate(`/project-management/issue-detail/${issue.id}`)
              }))
            )}
          />
        )}
      </CardContent>
    </Card>
  )
}
