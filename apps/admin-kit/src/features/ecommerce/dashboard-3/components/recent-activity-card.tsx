import type { EcommerceDashboardStats } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { ActivityIcon } from 'lucide-react'

/** A short timeline of recent catalog/order activity. */
export function RecentActivityCard({ stats }: { stats: EcommerceDashboardStats }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2.5 space-y-0">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted/40">
          <ActivityIcon className="size-4 text-muted-foreground" aria-hidden="true" />
        </span>
        <CardTitle className="text-sm font-medium text-muted-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {stats.recentActivity.map(entry => (
            <li key={entry.id} className="flex flex-col gap-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium">{entry.action}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{entry.timeAgo}</span>
              </div>
              <span className="text-xs text-muted-foreground">{entry.actor}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
