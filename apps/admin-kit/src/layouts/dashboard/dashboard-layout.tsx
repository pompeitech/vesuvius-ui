import { SidebarInset, SidebarProvider, SidebarTooltipProvider, Toaster } from '@pompeitech/vesuvius-ui'
import { Outlet } from 'react-router'
import { DashboardHeader } from './dashboard-header'
import { DashboardSidebar } from './dashboard-sidebar'

/** Shared sidebar + topbar + breadcrumb shell, mounted once around the whole router tree. */
export function DashboardLayout() {
  return (
    <SidebarTooltipProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </SidebarTooltipProvider>
  )
}
