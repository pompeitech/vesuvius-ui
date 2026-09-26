import { ChevronsUpDownIcon, BellIcon, LogOutIcon, ShieldIcon, UserIcon } from 'lucide-react'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, SidebarMenu, SidebarMenuButton, SidebarMenuItem, toast, UserAvatar } from '@pompeitech/vesuvius-ui'
import { useNavigate } from 'react-router'
import { setAuthenticated } from '../../lib/auth'
import { useCurrentUserStore } from '../../lib/use-current-user-store'

function AccountSummary({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex items-center gap-2">
      <UserAvatar name={name} size="sm" />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{name}</span>
        <span className="truncate text-xs text-muted-foreground">{email}</span>
      </div>
    </div>
  )
}

/**
 * The sidebar footer's account row — click to open Profile/Security/
 * Notifications (real pages, see `features/account/`) or log out (really
 * clears the simulated session, see `lib/auth.ts`). Reads the live,
 * editable profile (`useCurrentUserStore`) rather than the static
 * `CURRENT_USER` snapshot, so an edit on the Profile page shows up here
 * immediately.
 */
export function AccountMenu() {
  const [profile] = useCurrentUserStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    setAuthenticated(false)
    toast.success("You've been logged out.")
    navigate('/login')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <AccountSummary name={profile.name} email={profile.email} />
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="px-1 py-1.5">
                <AccountSummary name={profile.name} email={profile.email} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/account/profile')}>
              <UserIcon />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/account/security')}>
              <ShieldIcon />
              Security
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/account/notifications')}>
              <BellIcon />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
