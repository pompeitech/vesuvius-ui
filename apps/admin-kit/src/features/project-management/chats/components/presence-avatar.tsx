import { UserAvatar, cn, type UserAvatarProps } from '@pompeitech/vesuvius-ui'

type PresenceAvatarProps = UserAvatarProps & { online: boolean }

/** A `UserAvatar` with a small online/offline dot overlay — a local wrapper rather than a change to the shared `UserAvatar`, since presence is specific to Chats. */
export function PresenceAvatar({ online, className, ...props }: PresenceAvatarProps) {
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <UserAvatar {...props} />
      <span
        className={cn(
          'absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-background',
          online ? 'bg-success' : 'bg-muted-foreground'
        )}
      />
    </span>
  )
}
