import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarNav, useSidebar } from '@pompeitech/vesuvius-ui'
import { useLocation, useNavigate } from 'react-router'
import { Logo, LogoMark } from '../../components/brand/logo'
import { AccountMenu } from './account-menu'
import { findOpenAncestorIds, NAV_GROUPS, toSidebarNavItem } from './nav-config'

/**
 * Full wordmark when expanded, icon-only mark once the sidebar collapses to
 * its icon rail — but only on desktop. On mobile the sidebar is always a
 * full-width drawer (see `Sidebar`'s own `isMobile` branch, which ignores
 * `state` entirely), so the collapsed/expanded distinction from a
 * previously-persisted desktop toggle shouldn't apply there too.
 */
function SidebarLogo() {
  const { state, isMobile } = useSidebar()
  const collapsed = !isMobile && state === 'collapsed'

  return (
    <div className="flex items-center px-2 py-1.5">
      {collapsed ? (
        <LogoMark surface="sidebar" className="size-9" />
      ) : (
        <Logo surface="sidebar" className="h-12 w-auto" />
      )}
    </div>
  )
}

/** The app's one sidebar: logo, grouped nav (Ecommerce / Project Management), account menu. */
export function DashboardSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        {NAV_GROUPS.map(group => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarNav
                items={group.items.map(item => toSidebarNavItem(item, location.pathname))}
                defaultOpenIds={findOpenAncestorIds(group.items, location.pathname)}
                onNavigate={item => item.href && navigate(item.href)}
              />
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <AccountMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
