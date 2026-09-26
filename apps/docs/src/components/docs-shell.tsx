'use client'

// Same reasoning as mdx-components.tsx / site-header.tsx. `children` here
// is already-rendered content handed down from the Server Component layout
// (docs/layout.tsx) — a Client Component can render Server Component
// output passed as `children`/props without itself needing to import
// anything server-only, so this boundary doesn't affect the actual MDX
// page content underneath it.
import type { ReactNode } from 'react'
import { SidebarProvider, SidebarTooltipProvider, SidebarInset } from '@pompeitech/vesuvius-ui'
import type { Locale } from '@/lib/i18n/locales'
import type { Dictionary } from '@/lib/i18n/get-dictionary'
import type { SidebarSection } from '@/lib/sidebar-tree'
import { SiteHeader } from './site-header'
import { SiteSidebar } from './site-sidebar'

export function DocsShell({
  locale,
  dict,
  sections,
  children
}: {
  locale: Locale
  dict: Dictionary
  sections: SidebarSection[]
  children: ReactNode
}) {
  return (
    <SidebarTooltipProvider>
      {/* SidebarProvider's own wrapper is `flex` (row) by design, meant
          for exactly two items — Sidebar (fixed width) + SidebarInset
          (fills the rest) — sitting side by side. A shadcn.com-style
          full-width sticky header ABOVE that row still needs to be a
          descendant of SidebarProvider (SidebarTrigger inside SiteHeader
          calls useSidebar()), so it's nested one level deeper instead, as
          the single flex item SidebarProvider sees, itself laid out
          column-wise: header on top, the sidebar+content row below it. */}
      <SidebarProvider className="min-h-0 w-full">
        <div className="flex w-full flex-col">
          <SiteHeader locale={locale} dict={dict} showSidebarTrigger />
          <div className="flex w-full flex-1">
            <SiteSidebar locale={locale} sections={sections} />
            <SidebarInset className="w-full min-w-0 px-8 py-8">{children}</SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </SidebarTooltipProvider>
  )
}
