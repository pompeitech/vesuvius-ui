import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  SidebarTooltipProvider
} from '@ui/molecules/sidebar/sidebar'
import { SidebarNav } from '@ui/molecules/sidebar/sidebar-nav'
import { SidebarProvider } from '@ui/molecules/sidebar/sidebar-provider'
import { describe, expect, test, vi } from 'vitest'

describe('Sidebar', () => {
  test('navigates and expands nested sections', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(
      <SidebarTooltipProvider>
        <SidebarProvider>
          <Sidebar collapsible="none">
            <SidebarContent>
              <SidebarNav
                onNavigate={onNavigate}
                items={[
                  { id: 'home', label: 'Home' },
                  { id: 'docs', label: 'Docs', items: [{ id: 'intro', label: 'Introduction' }] }
                ]}
              />
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </SidebarTooltipProvider>
    )
    await user.click(screen.getByRole('button', { name: 'Home' }))
    expect(onNavigate).toHaveBeenCalledWith(expect.objectContaining({ id: 'home' }))
    await user.click(screen.getByRole('button', { name: 'Docs' }))
    expect(screen.getByText('Introduction')).toBeVisible()
    await user.click(screen.getByText('Introduction'))
    expect(onNavigate).toHaveBeenCalledWith(expect.objectContaining({ id: 'intro' }))
  })

  test('responds to the keyboard shortcut', () => {
    render(
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Sidebar>
      </SidebarProvider>
    )
    const sidebar = document.querySelector('[data-slot="sidebar"]')
    expect(sidebar).toHaveAttribute('data-state', 'expanded')
    fireEvent.keyDown(window, { key: 'b', metaKey: true })
    expect(sidebar).toHaveAttribute('data-state', 'collapsed')
  })

  test('renders structural slots and menu variants', () => {
    render(
      <SidebarTooltipProvider>
        <SidebarProvider>
          <Sidebar collapsible="none">
            <SidebarHeader>
              <SidebarInput aria-label="Filter navigation" />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarGroupAction aria-label="Add workspace" />
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive variant="outline" size="lg">
                        Projects
                      </SidebarMenuButton>
                      <SidebarMenuAction aria-label="Project actions" showOnHover />
                      <SidebarMenuBadge>3</SidebarMenuBadge>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator />
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#">Overview</SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
              <SidebarMenuSkeleton showIcon />
            </SidebarContent>
            <SidebarFooter>Account</SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </SidebarTooltipProvider>
    )
    expect(screen.getByLabelText('Filter navigation')).toBeVisible()
    expect(screen.getByText('Workspace')).toBeVisible()
    expect(screen.getByText('3')).toBeVisible()
    expect(screen.getByText('Overview')).toHaveAttribute('href', '#')
  })
})
