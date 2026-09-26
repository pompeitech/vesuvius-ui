import {
  addChatMessage,
  addConversation,
  getChatMessages,
  getConversations,
  getMembers,
  getTeams,
  markConversationRead,
  type ChatMessage,
  type Conversation,
  type Member,
  type Team
} from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import { ChatThread } from './components/chat-thread'
import { ContactPanel } from './components/contact-panel'
import { ConversationList } from './components/conversation-list'
import { NewChatDialog } from './components/new-chat-dialog'
import { messagesFor } from './utils'

export async function loader() {
  const [conversations, messages, members, teams] = await Promise.all([
    getConversations({ pageSize: 200 }),
    getChatMessages({ pageSize: 5000 }),
    getMembers({ pageSize: 200 }),
    getTeams({ pageSize: 50 })
  ])
  return {
    conversations: conversations.data,
    messages: messages.data,
    members: members.data,
    teams: teams.data
  }
}

/**
 * 1:1 team messaging — three columns, like a proper chat app rather than
 * an email client wearing a chat costume: conversation list, active
 * thread with plain-text bubbles, contact detail panel. Independent
 * `Conversation`/`ChatMessage` entities (`@pompeitech/mock-data`), not a
 * reuse of `Message`/Inbox.
 */
export function Component() {
  const {
    conversations: initialConversations,
    messages: initialMessages,
    members,
    teams
  } = useLoaderData() as {
    conversations: Conversation[]
    messages: ChatMessage[]
    members: Member[]
    teams: Team[]
  }
  const [conversations, setConversations] = useState(initialConversations)
  const [messages, setMessages] = useState(initialMessages)
  const [selectedId, setSelectedId] = useState<string | undefined>(initialConversations[0]?.id)
  const [newChatOpen, setNewChatOpen] = useState(false)

  const membersById = useMemo(() => new Map(members.map(m => [m.id, m])), [members])
  const teamsById = useMemo(() => new Map(teams.map(t => [t.id, t])), [teams])

  const selectedConversation = conversations.find(c => c.id === selectedId)
  const selectedMember = selectedConversation
    ? membersById.get(selectedConversation.memberId)
    : undefined
  const selectedTeam = selectedMember ? teamsById.get(selectedMember.teamId) : undefined

  const candidateMembers = useMemo(() => {
    const contactedIds = new Set(conversations.map(c => c.memberId))
    return members.filter(m => !contactedIds.has(m.id))
  }, [conversations, members])

  const handleSelect = (conversationId: string) => {
    setSelectedId(conversationId)
    markConversationRead(conversationId)
    setMessages(prev =>
      prev.map(m =>
        m.conversationId === conversationId && m.senderId !== 'me' && !m.read
          ? { ...m, read: true }
          : m
      )
    )
  }

  const handleSend = (body: string) => {
    if (!selectedConversation) return
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      conversationId: selectedConversation.id,
      senderId: 'me',
      body,
      createdAt: new Date().toISOString(),
      read: true
    }
    addChatMessage(message)
    setMessages(prev => [...prev, message])
  }

  const handleStartChat = (memberId: string) => {
    const conversation: Conversation = {
      id: crypto.randomUUID(),
      memberId,
      createdAt: new Date().toISOString()
    }
    addConversation(conversation)
    setConversations(prev => [conversation, ...prev])
    setSelectedId(conversation.id)
    setNewChatOpen(false)
  }

  return (
    // `<main>`'s own height in the dashboard shell grows to fit its content
    // instead of being capped to the viewport (`SidebarProvider`'s wrapper
    // is `min-h-svh`, not `h-svh` — a floor, not a ceiling) — so `h-full`/
    // `flex-1` alone can't cap anything here; the page needs its own
    // explicit height. 104px = the header's real height (56px) + `<main>`'s
    // own vertical padding (24px top + 24px bottom), both measured live —
    // the one fixed part of "the rest of the page" this column can't see.
    <div className="flex flex-col gap-6 lg:h-[calc(100vh-104px)]">
      <div className="lg:shrink-0">
        <Typography as="h1" variant="h3">
          Chats
        </Typography>
        <Typography variant="muted">
          Direct messages with the team — quick, informal, real-time-styled.
        </Typography>
      </div>

      {/* `lg:min-h-0` is what actually caps this row at the remaining page
          height instead of growing past it — a flex item's default
          min-height is "auto" (its content size), which silently defeats
          `flex-1` for anything with internal `overflow-y-auto` panels. */}
      <div className="grid grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[280px_1fr_300px]">
        <ConversationList
          conversations={conversations}
          membersById={membersById}
          messages={messages}
          selectedId={selectedId}
          onSelect={handleSelect}
          onNewChat={() => setNewChatOpen(true)}
        />
        {selectedConversation && selectedMember ? (
          <ChatThread
            member={selectedMember}
            messages={messagesFor(selectedConversation.id, messages)}
            onSend={handleSend}
          />
        ) : (
          <div className="flex h-full min-h-0 items-center justify-center rounded-md border">
            <p className="text-sm text-muted-foreground">
              Select a conversation to start chatting.
            </p>
          </div>
        )}
        {selectedConversation && selectedMember && (
          <ContactPanel
            member={selectedMember}
            team={selectedTeam}
            conversationId={selectedConversation.id}
            messages={messages}
          />
        )}
      </div>

      <NewChatDialog
        open={newChatOpen}
        candidates={candidateMembers}
        onOpenChange={setNewChatOpen}
        onStart={handleStartChat}
      />
    </div>
  )
}
