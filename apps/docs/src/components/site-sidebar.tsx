'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
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

  return <CategoryItem locale={locale} node={node} pathname={pathname} />
}

/** A component tier (Atoms / Molecules / Organisms) as an expandable group —
 * same Collapsible + SidebarMenuButton composition as the kit's own
 * SidebarNav. Starts open only for the tier holding the current page, and
 * re-opens when navigation lands inside a closed one. */
function CategoryItem({
  locale,
  node,
  pathname
}: {
  locale: Locale
  node: Extract<SidebarNode, { type: 'category' }>
  pathname: string
}) {
  const containsActive = node.items.some(
    child => child.type === 'leaf' && pathname === slugHref(locale, child.slug)
  )
  const [open, setOpen] = useState(containsActive)

  useEffect(() => {
    if (containsActive) setOpen(true)
  }, [containsActive])

  return (
    <Collapsible asChild open={open} onOpenChange={setOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="font-medium">
            <span className="truncate">{node.label}</span>
            <span className="text-muted-foreground ml-auto text-xs tabular-nums">
              {node.items.length}
            </span>
            <ChevronRightIcon className="text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
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
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
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
