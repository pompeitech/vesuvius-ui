import type { Team } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle, SimplePieChart } from '@pompeitech/vesuvius-ui'

export function TeamBreakdownCard({ teams }: { teams: Team[] }) {
  const data = teams
    .map(team => ({ team: team.name, count: team.memberIds.length }))
    .filter(row => row.count > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <SimplePieChart
          data={data}
          category="count"
          index="team"
          innerRadius="60%"
          className="h-64"
        />
      </CardContent>
    </Card>
  )
}
