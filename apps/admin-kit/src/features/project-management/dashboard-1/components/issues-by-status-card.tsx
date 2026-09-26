import type { Issue } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, SimpleBarChart } from '@pompeitech/vesuvius-ui'
import { ISSUE_STATUS_LABEL, ISSUE_STATUS_ORDER } from '../../_shared/format'

// `SimpleBarChart`'s `colors` are per-series, not per-bar — with a single
// "Issues" series there's nothing to map `STATUS_COLOR` onto here (unlike
// the pie chart, a `<Bar>` has one uniform `fill` for the whole series).
// A single accent color for every bar is the more conventional look for a
// "count by category" chart anyway.
export function IssuesByStatusCard({ issues }: { issues: Issue[] }) {
  const data = ISSUE_STATUS_ORDER.map(status => ({
    status: ISSUE_STATUS_LABEL[status],
    Issues: issues.filter(i => i.status === status).length
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <SimpleBarChart
          data={data}
          categories={['Issues']}
          index="status"
          showLegend={false}
          className="h-64"
        />
      </CardContent>
    </Card>
  )
}
