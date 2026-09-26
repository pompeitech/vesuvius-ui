import type { ChatMessage, Member, Team } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, UserAvatar } from '@pompeitech/vesuvius-ui'
import { MailIcon, MessageSquareIcon, UsersIcon } from 'lucide-react'
import { isOnline, messagesFor } from '../utils'

type ContactPanelProps = {
  member: Member
  team: Team | undefined
  conversationId: string
  messages: ChatMessage[]
}

export function ContactPanel({ member, team, conversationId, messages }: ContactPanelProps) {
  const online = isOnline(member.id)
  const exchanged = messagesFor(conversationId, messages).length

  return (
    <Card className="h-fit">
      <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
        <UserAvatar name={member.name} src={member.avatarUrl} className="size-20" />
        <div>
          <p className="text-base font-semibold">{member.name}</p>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
        <Badge variant={online ? 'success' : 'secondary'}>{online ? 'Online' : 'Offline'}</Badge>

        <div className="mt-2 flex w-full flex-col gap-3 border-t pt-4 text-left">
          <div className="flex items-center gap-3 text-sm">
            <MailIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate">{member.email}</span>
          </div>
          {team && (
            <div className="flex items-center gap-3 text-sm">
              <UsersIcon className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate">{team.name}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm">
            <MessageSquareIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate">{exchanged} messages exchanged</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
