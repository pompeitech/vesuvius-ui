import type { Issue, IssuePriority } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, SimplePieChart } from '@pompeitech/vesuvius-ui'
import { ISSUE_PRIORITY_LABEL } from '../../_shared/format'
import { PRIORITY_COLOR } from '../format'

const PRIORITY_ORDER: IssuePriority[] = ['urgent', 'high', 'medium', 'low']

export function IssuesByPriorityCard({ issues }: { issues: Issue[] }) {
  const data = PRIORITY_ORDER.map(priority => ({
    priority: ISSUE_PRIORITY_LABEL[priority],
    count: issues.filter(i => i.priority === priority).length
  }))
  const colors = PRIORITY_ORDER.map(priority => PRIORITY_COLOR[priority])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues by Priority</CardTitle>
      </CardHeader>
      <CardContent>
        <SimplePieChart
          data={data}
          category="count"
          index="priority"
          colors={colors}
          innerRadius="60%"
          className="h-64"
        />
      </CardContent>
    </Card>
  )
}
