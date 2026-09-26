import {
  addAiConversation,
  addAiMessage,
  getAiConversations,
  getAiMessages,
  matchAiResponse,
  type AiChatMessage,
  type AiConversation
} from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import { CURRENT_USER } from '../../../lib/current-user'
import { ChatThread } from './components/chat-thread'
import { GreetingPanel } from './components/greeting-panel'
import { HistorySidebar } from './components/history-sidebar'

export async function loader() {
  const [conversations, messages] = await Promise.all([
    getAiConversations({ pageSize: 200 }),
    getAiMessages({ pageSize: 2000 })
  ])
  return { conversations: conversations.data, messages: messages.data }
}

/**
 * A simulated assistant — no real model behind it, just keyword-matched
 * canned replies (`matchAiResponse`, `@pompeitech/mock-data`) on a
 * handful of topics this kit actually has data for. Declared honestly in
 * the UI rather than pretending to be a real chatbot, consistent with
 * this kit's no-backend convention everywhere else.
 */
export function Component() {
  const { conversations: initialConversations, messages: initialMessages } = useLoaderData() as {
    conversations: AiConversation[]
    messages: AiChatMessage[]
  }
  const [conversations, setConversations] = useState(initialConversations)
  const [messages, setMessages] = useState(initialMessages)
  const [activeId, setActiveId] = useState<string | undefined>()
  const [isTyping, setIsTyping] = useState(false)

  const activeMessages = useMemo(
    () => messages.filter(m => m.conversationId === activeId),
    [messages, activeId]
  )

  const handleSend = (prompt: string) => {
    let conversationId = activeId

    if (!conversationId) {
      const conversation: AiConversation = {
        id: crypto.randomUUID(),
        title: prompt.length > 60 ? `${prompt.slice(0, 60)}…` : prompt,
        createdAt: new Date().toISOString()
      }
      addAiConversation(conversation)
      setConversations(prev => [conversation, ...prev])
      conversationId = conversation.id
      setActiveId(conversationId)
    }

    const userMessage: AiChatMessage = {
      id: crypto.randomUUID(),
      conversationId,
      role: 'user',
      body: prompt,
      createdAt: new Date().toISOString()
    }
    addAiMessage(userMessage)
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // A short, deliberately non-instant delay — reinforces that a reply
    // is being "generated", even though it's just a keyword lookup.
    const delay = 600 + Math.random() * 300
    setTimeout(() => {
      const assistantMessage: AiChatMessage = {
        id: crypto.randomUUID(),
        conversationId: conversationId!,
        role: 'assistant',
        body: matchAiResponse(prompt),
        createdAt: new Date().toISOString()
      }
      addAiMessage(assistantMessage)
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, delay)
  }

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100vh-104px)]">
      <div className="lg:shrink-0">
        <Typography as="h1" variant="h3">
          AI Chatbot
        </Typography>
        <Typography variant="muted">
          A simulated assistant — canned answers on a few topics, not a real model.
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[260px_1fr]">
        <HistorySidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={setActiveId}
          onNewChat={() => setActiveId(undefined)}
        />
        {activeId ? (
          <ChatThread messages={activeMessages} isTyping={isTyping} onSend={handleSend} />
        ) : (
          <GreetingPanel
            userFirstName={CURRENT_USER.name.split(' ')[0] ?? CURRENT_USER.name}
            onSend={handleSend}
          />
        )}
      </div>
    </div>
  )
}
