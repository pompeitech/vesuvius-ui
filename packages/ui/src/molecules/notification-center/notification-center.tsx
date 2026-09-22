import { BellIcon, CheckIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../atoms/button/button'
import { Badge } from '../../atoms/badge/badge'
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover'

export type Notification = { id: string; title: string; description?: string; read?: boolean }
export type NotificationCenterProps = {
  notifications?: Notification[]
  onRead?: (id: string) => void
  onClear?: () => void
}

export function NotificationCenter({
  notifications = [],
  onRead,
  onClear
}: NotificationCenterProps) {
  const [open, setOpen] = useState(false)
  const unread = notifications.filter(notification => !notification.read).length
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
          className="relative"
        >
          <BellIcon className="size-4" />
          {unread > 0 && (
            <Badge className="absolute -right-1 -top-1 min-w-4 justify-center px-1 text-[10px]">
              {unread}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="font-semibold">Notifications</span>
          {onClear && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear all
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">No notifications</p>
          ) : (
            notifications.map(notification => (
              <button
                type="button"
                key={notification.id}
                onClick={() => onRead?.(notification.id)}
                className="flex w-full gap-3 border-b px-4 py-3 text-left hover:bg-muted/50"
              >
                <span
                  className={
                    notification.read
                      ? 'mt-1 size-2 shrink-0 rounded-full bg-muted'
                      : 'mt-1 size-2 shrink-0 rounded-full bg-primary'
                  }
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{notification.title}</span>
                  {notification.description && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {notification.description}
                    </span>
                  )}
                </span>
                {notification.read && <CheckIcon className="mt-1 size-3.5 text-muted-foreground" />}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
