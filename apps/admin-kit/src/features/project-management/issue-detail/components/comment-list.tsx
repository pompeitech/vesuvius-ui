import { UserAvatar, Button, Textarea } from '@pompeitech/vesuvius-ui'
import { useState } from 'react'
import { CURRENT_USER } from '../../../../lib/current-user'

type IssueComment = {
  id: string
  author: string
  body: string
  createdAt: string
}

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit'
})

/**
 * In-memory only — no mock-data schema/generator for comments, this kit's
 * page-local-simulated-state convention taken to its natural conclusion for
 * something this ephemeral. Comments are gone once the page unmounts; that's
 * fine here since they're a "leave a quick note" feature, not a record.
 */
export function CommentList() {
  const [comments, setComments] = useState<IssueComment[]>([])
  const [draft, setDraft] = useState('')

  const handleSubmit = () => {
    const body = draft.trim()
    if (!body) return
    setComments(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        author: CURRENT_USER.name,
        body,
        createdAt: new Date().toISOString()
      }
    ])
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <UserAvatar name={CURRENT_USER.name} size="sm" />
        <div className="flex flex-1 flex-col gap-2">
          <Textarea
            value={draft}
            onChange={event => setDraft(event.target.value)}
            placeholder="Add a comment..."
            rows={2}
          />
          <Button size="sm" className="w-fit" disabled={!draft.trim()} onClick={handleSubmit}>
            Comment
          </Button>
        </div>
      </div>

      {comments.length > 0 && (
        <div className="flex flex-col gap-4 border-t pt-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <UserAvatar name={comment.author} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {timeFormatter.format(new Date(comment.createdAt))}
                  </span>
                </div>
                <p className="mt-0.5 text-sm whitespace-pre-wrap">{comment.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
