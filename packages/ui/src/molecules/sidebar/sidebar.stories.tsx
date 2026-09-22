import type { Meta, StoryObj } from '@storybook/react-vite'
import { Home, Package, Settings, ShoppingCart, Users } from 'lucide-react'
import { Separator } from '../../atoms/separator/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTooltipProvider,
  SidebarTrigger
} from './sidebar'
import { SidebarProvider } from './sidebar-provider'

const meta = {
  title: 'Molecules/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { title: 'Dashboard', icon: Home },
  { title: 'Products', icon: Package },
  { title: 'Orders', icon: ShoppingCart },
  { title: 'Customers', icon: Users }
]

export const Default: Story = {
  render: () => (
    <SidebarTooltipProvider>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="px-2 py-1.5 text-sm font-semibold">Vesuvius UI</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Ecommerce</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map(item => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton tooltip={item.title}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </header>
          <div className="text-muted-foreground p-4 text-sm">
            Page content goes here. Collapse the sidebar with the trigger, or ⌘/Ctrl+B.
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SidebarTooltipProvider>
  )
}

export const Settings_: Story = {
  name: 'With active item',
  render: () => (
    <SidebarTooltipProvider>
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Dashboard">
                      <Home />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="text-muted-foreground p-4 text-sm">Content</div>
        </SidebarInset>
      </SidebarProvider>
    </SidebarTooltipProvider>
  )
}
