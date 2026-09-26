import type { Message } from '@pompeitech/mock-data'
import { Button, Card, CardContent, RichTextViewer, UserAvatar } from '@pompeitech/vesuvius-ui'
import { ArrowRightIcon, ReplyIcon } from 'lucide-react'
import { relativeTime } from '../utils'

type ReadingPaneProps = {
  message: Message | undefined
  onReply: (message: Message) => void
  onOpenRelatedIssue: (issueId: string) => void
}

export function ReadingPane({ message, onReply, onOpenRelatedIssue }: ReadingPaneProps) {
  if (!message) {
    return (
      <Card className="h-fit">
        <CardContent className="flex flex-col items-center justify-center gap-1 py-24 text-center">
          <p className="text-sm text-muted-foreground">Select a message to read it.</p>
        </CardContent>
      </Card>
    )
  }

  const relatedIssueId = message.relatedIssueId

  return (
    <Card className="h-fit">
      <CardContent className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">{message.subject || '(no subject)'}</h2>
          <div className="mt-2 flex items-start gap-3">
            <UserAvatar name={message.fromName} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{message.fromName}</p>
              <p className="truncate text-xs text-muted-foreground">
                to {message.toName || '—'} · {relativeTime(message.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {relatedIssueId && (
          <Button
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={() => onOpenRelatedIssue(relatedIssueId)}
          >
            View ticket <ArrowRightIcon />
          </Button>
        )}

        <RichTextViewer html={message.body} />

        <Button variant="outline" className="w-fit" onClick={() => onReply(message)}>
          <ReplyIcon /> Reply
        </Button>
      </CardContent>
    </Card>
  )
}
