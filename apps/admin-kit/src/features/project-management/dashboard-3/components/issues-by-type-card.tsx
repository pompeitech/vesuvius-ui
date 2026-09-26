import type { Issue, IssueType } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, SimplePieChart } from '@pompeitech/vesuvius-ui'
import { ISSUE_TYPE_LABEL } from '../../_shared/format'
import { TYPE_COLOR } from '../format'

const TYPE_ORDER: IssueType[] = ['bug', 'feature', 'task', 'chore', 'epic']

export function IssuesByTypeCard({ issues }: { issues: Issue[] }) {
  const data = TYPE_ORDER.map(type => ({
    type: ISSUE_TYPE_LABEL[type],
    count: issues.filter(i => i.type === type).length
  }))
  const colors = TYPE_ORDER.map(type => TYPE_COLOR[type])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <SimplePieChart
          data={data}
          category="count"
          index="type"
          colors={colors}
          innerRadius="60%"
          className="h-64"
        />
      </CardContent>
    </Card>
  )
}
