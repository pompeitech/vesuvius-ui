import type { Issue } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, SimpleLineChart } from '@pompeitech/vesuvius-ui'
import { monthDayFormatter } from '../format'

const DAY_MS = 86_400_000

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * DAY_MS)
}

/** Issues closed per week, the last 8 weeks — the closest thing to a burndown/velocity chart this mock data supports (no real sprint boundaries to bucket by). */
export function VelocityTrendCard({ issues }: { issues: Issue[] }) {
  const done = issues.filter(i => i.status === 'done')

  const data = Array.from({ length: 8 }, (_, i) => {
    const weeksAgo = 7 - i
    const start = daysAgo((weeksAgo + 1) * 7)
    const end = daysAgo(weeksAgo * 7)
    const closed = done.filter(issue => {
      const t = new Date(issue.updatedAt ?? issue.createdAt).getTime()
      return t >= start.getTime() && t < end.getTime()
    }).length
    return { week: monthDayFormatter.format(start), Closed: closed }
  })

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Velocity — Issues Closed per Week</CardTitle>
      </CardHeader>
      <CardContent>
        <SimpleLineChart
          data={data}
          categories={['Closed']}
          index="week"
          showLegend={false}
          className="h-64"
        />
      </CardContent>
    </Card>
  )
}
