import { addMessage, getMessages, updateMessage, type Message } from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { CURRENT_USER } from '../../../lib/current-user'
import { ComposeDialog, type ComposeDraft } from './components/compose-dialog'
import { FolderNav, type InboxView } from './components/folder-nav'
import { MessageList } from './components/message-list'
import { ReadingPane } from './components/reading-pane'

export async function loader() {
  const messages = await getMessages({ pageSize: 200 })
  return { messages: messages.data }
}

function buildSnippet(bodyHtml: string): string {
  return bodyHtml
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140)
}

type ComposeState = { initial?: Partial<ComposeDraft> }

/**
 * A Gmail-style mailbox — genuinely independent `Message`s
 * (`packages/mock-data`), not ticket notifications wearing an email
 * costume. A "system" sender (seeded alongside genuine person-to-person
 * messages) keeps the old ticket-activity signal alive as one message
 * type among several, via `relatedIssueId` → a "View ticket" link in the
 * reading pane.
 */
export function Component() {
  const { messages: initialMessages } = useLoaderData() as { messages: Message[] }
  const [messages, setMessages] = useState(initialMessages)
  const [view, setView] = useState<InboxView>('inbox')
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [composeState, setComposeState] = useState<ComposeState | null>(null)
  const navigate = useNavigate()

  const visibleMessages = useMemo(() => {
    const filtered =
      view === 'inbox'
        ? messages.filter(m => m.folder === 'inbox')
        : view === 'sent'
          ? messages.filter(m => m.folder === 'sent')
          : view === 'drafts'
            ? messages.filter(m => m.folder === 'drafts')
            : messages.filter(m => m.starred)
    return [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }, [messages, view])

  const counts: Record<InboxView, number> = {
    inbox: messages.filter(m => m.folder === 'inbox' && !m.read).length,
    starred: messages.filter(m => m.starred).length,
    sent: messages.filter(m => m.folder === 'sent').length,
    drafts: messages.filter(m => m.folder === 'drafts').length
  }

  const selectedMessage = messages.find(m => m.id === selectedId)

  const handleSelect = (message: Message) => {
    setSelectedId(message.id)
    if (!message.read) {
      updateMessage(message.id, { read: true })
      setMessages(prev => prev.map(m => (m.id === message.id ? { ...m, read: true } : m)))
    }
  }

  const handleToggleStar = (message: Message) => {
    const starred = !message.starred
    updateMessage(message.id, { starred })
    setMessages(prev => prev.map(m => (m.id === message.id ? { ...m, starred } : m)))
  }

  const handleSelectView = (nextView: InboxView) => {
    setView(nextView)
    setSelectedId(undefined)
  }

  const handleReply = (message: Message) => {
    setComposeState({
      initial: {
        toName: message.fromName,
        toEmail: message.fromEmail,
        subject: message.subject.startsWith('Re: ') ? message.subject : `Re: ${message.subject}`
      }
    })
  }

  const persistNewMessage = (draft: ComposeDraft, folder: 'sent' | 'drafts') => {
    const message: Message = {
      id: crypto.randomUUID(),
      folder,
      fromName: CURRENT_USER.name,
      fromEmail: CURRENT_USER.email,
      toName: draft.toName,
      toEmail: draft.toEmail,
      subject: draft.subject,
      body: draft.body,
      snippet: buildSnippet(draft.body),
      read: true,
      starred: false,
      createdAt: new Date().toISOString()
    }
    // Not real delivery — "Send" just files it under Sent, the same
    // no-backend simulated-write convention as everything else here.
    addMessage(message)
    setMessages(prev => [message, ...prev])
  }

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100vh-104px)]">
      <div className="lg:shrink-0">
        <Typography as="h1" variant="h3">
          Inbox
        </Typography>
        <Typography variant="muted">
          Messages across every project — compose, reply, and star what matters.
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[200px_1fr_1fr]">
        <div className="lg:h-full lg:min-h-0 lg:overflow-y-auto">
          <FolderNav
            active={view}
            onSelect={handleSelectView}
            counts={counts}
            onCompose={() => setComposeState({})}
          />
        </div>
        <div className="lg:h-full lg:min-h-0 lg:overflow-y-auto">
          <MessageList
            messages={visibleMessages}
            selectedId={selectedId}
            isSentView={view === 'sent' || view === 'drafts'}
            onSelect={handleSelect}
            onToggleStar={handleToggleStar}
          />
        </div>
        <div className="lg:h-full lg:min-h-0 lg:overflow-y-auto">
          <ReadingPane
            message={selectedMessage}
            onReply={handleReply}
            onOpenRelatedIssue={issueId => navigate(`/project-management/issue-detail/${issueId}`)}
          />
        </div>
      </div>

      {composeState && (
        <ComposeDialog
          key={composeState.initial?.toEmail ?? 'new'}
          open
          initial={composeState.initial}
          onOpenChange={open => !open && setComposeState(null)}
          onSend={draft => persistNewMessage(draft, 'sent')}
          onSaveDraft={draft => persistNewMessage(draft, 'drafts')}
        />
      )}
    </div>
  )
}
