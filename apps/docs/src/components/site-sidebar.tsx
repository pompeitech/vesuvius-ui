'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from '@pompeitech/vesuvius-ui'
import type { Locale } from '@/lib/i18n/locales'
import type { SidebarNode, SidebarSection } from '@/lib/sidebar-tree'

function slugHref(locale: Locale, slug: string[]): string {
  return `/${locale}/docs/${slug.join('/')}`
}

function NodeItem({
  locale,
  node,
  pathname
}: {
  locale: Locale
  node: SidebarNode
  pathname: string
}) {
  if (node.type === 'leaf') {
    const href = slugHref(locale, node.slug)
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={pathname === href}
          className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:shadow-[inset_2px_0_0_var(--primary)]"
        >
          <Link href={href}>{node.title}</Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <span className="px-2 py-1 text-xs font-semibold text-muted-foreground">{node.label}</span>
      <SidebarMenuSub>
        {node.items.map(child =>
          child.type === 'leaf' ? (
            <SidebarMenuSubItem key={child.slug.join('/')}>
              <SidebarMenuSubButton
                asChild
                isActive={pathname === slugHref(locale, child.slug)}
                className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
              >
                <Link href={slugHref(locale, child.slug)}>{child.title}</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ) : null
        )}
      </SidebarMenuSub>
    </SidebarMenuItem>
  )
}

export function SiteSidebar({ locale, sections }: { locale: Locale; sections: SidebarSection[] }) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" className="top-14 h-[calc(100svh-3.5rem)]">
      <SidebarContent className="thin-scrollbar">
        {sections.map(section => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map(node => (
                  <NodeItem
                    key={node.type === 'leaf' ? node.slug.join('/') : node.label}
                    locale={locale}
                    node={node}
                    pathname={pathname}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
