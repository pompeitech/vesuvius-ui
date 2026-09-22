import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  CreditCardIcon,
  LayoutDashboardIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UsersIcon
} from 'lucide-react'
import { Separator } from '../../atoms/separator/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarTooltipProvider,
  SidebarTrigger
} from './sidebar'
import { SidebarProvider } from './sidebar-provider'
import { SidebarNav, type SidebarNavItem } from './sidebar-nav'

const meta = {
  title: 'Molecules/SidebarNav',
  component: SidebarNav,
  tags: ['autodocs'],
  args: { items: [] },
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof SidebarNav>

export default meta
type Story = StoryObj<typeof meta>

const ITEMS: SidebarNavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Overview & KPIs',
    icon: LayoutDashboardIcon,
    active: true
  },
  {
    id: 'products',
    label: 'Products',
    description: 'Catalog & inventory',
    icon: PackageIcon,
    badge: 128,
    items: [
      { id: 'products-all', label: 'All products' },
      { id: 'products-categories', label: 'Categories' },
      { id: 'products-inventory', label: 'Inventory' }
    ]
  },
  {
    id: 'orders',
    label: 'Orders',
    description: 'Sales & fulfillment',
    icon: ShoppingCartIcon,
    badge: '3 new',
    items: [
      { id: 'orders-all', label: 'All orders' },
      { id: 'orders-returns', label: 'Returns' }
    ]
  },
  {
    id: 'customers',
    label: 'Customers',
    description: 'Accounts & segments',
    icon: UsersIcon
  },
  {
    id: 'billing',
    label: 'Billing',
    description: 'Invoices & plans',
    icon: CreditCardIcon
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Workspace preferences',
    icon: SettingsIcon,
    disabled: true
  }
]

/**
 * A full app shell: resize the viewport (or drag the panel narrower in
 * Storybook) to see it collapse into the mobile Sheet — this is the
 * responsive behavior `SidebarProvider`/`Sidebar` already handle; try the
 * trigger button too, and note the icon-only collapsed state's tooltips.
 */
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
                <SidebarNav
                  items={ITEMS}
                  defaultOpenIds={['orders']}
                  onNavigate={item => console.log('navigate', item.id)}
                />
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
            Resize the window narrower to see the sidebar switch to the mobile sheet, or click the
            trigger to collapse it to icons.
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SidebarTooltipProvider>
  )
}
