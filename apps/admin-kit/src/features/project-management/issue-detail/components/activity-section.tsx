import { Tabs, TabsContent, TabsList, TabsTrigger } from '@pompeitech/vesuvius-ui'
import { CommentList } from './comment-list'

/** "Attività": only Commenti is real (in-memory, see CommentList) — Cronologia/Registro would need a full field-change audit log this kit doesn't track, so they're honest placeholders rather than a half-built feature. */
export function ActivitySection() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold">Activity</h3>
      <Tabs defaultValue="comments">
        <TabsList>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="activity-log">Activity log</TabsTrigger>
        </TabsList>
        <TabsContent value="comments" className="mt-4">
          <CommentList />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <p className="text-sm text-muted-foreground">
            Field-change history isn't tracked in this demo.
          </p>
        </TabsContent>
        <TabsContent value="activity-log" className="mt-4">
          <p className="text-sm text-muted-foreground">Activity log isn't tracked in this demo.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
