import { cn } from '@pompeitech/vesuvius-ui'
import { BellIcon, ShieldIcon, UserIcon, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'

type AccountSection = 'profile' | 'security' | 'notifications'

const NAV_ITEMS: { section: AccountSection; href: string; label: string; icon: LucideIcon }[] = [
  { section: 'profile', href: '/account/profile', label: 'Profile', icon: UserIcon },
  { section: 'security', href: '/account/security', label: 'Security', icon: ShieldIcon },
  {
    section: 'notifications',
    href: '/account/notifications',
    label: 'Notifications',
    icon: BellIcon
  }
]

/** Shared vertical sub-nav for the Account Settings pages, reached only via the account menu — mirrors the reference site's Settings sub-nav, kept to the 3 sections this kit actually built. */
export function AccountSettingsNav({ active }: { active: AccountSection }) {
  return (
    <nav className="flex flex-row gap-1 lg:flex-col">
      {NAV_ITEMS.map(item => (
        <Link
          key={item.section}
          to={item.href}
          className={cn(
            'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            item.section === active
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
          )}
        >
          <item.icon className="size-4 shrink-0" />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
