import { DEPARTMENTS, EMPLOYEES, JOB_OPENINGS, ORDERS, PRODUCTS, PROJECTS, SHIPMENTS
} from '@pompeitech/mock-data'
import type { SidebarNavItem } from '@pompeitech/vesuvius-ui'
import {
  BotIcon,
  Building2Icon,
  CalendarClockIcon,
  CalendarIcon,
  BarChart3Icon,
  ClipboardListIcon,
  ClockIcon,
  FileTextIcon,
  InboxIcon,
  KanbanSquareIcon,
  LayoutDashboardIcon,
  type LucideIcon,
  MapPinnedIcon,
  MessageCircleIcon,
  NetworkIcon,
  PackageIcon,
  ReceiptIcon,
  ShoppingCartIcon,
  StoreIcon,
  TableIcon,
  TruckIcon,
  UserCogIcon,
  UsersIcon,
  WalletIcon
} from 'lucide-react'

export type NavItemDef = {
  id: string
  label: string
  href?: string
  icon?: LucideIcon
  items?: NavItemDef[]
}

export type NavGroupDef = { label: string; items: NavItemDef[] }

export const NAV_GROUPS: NavGroupDef[] = [
  {
    label: 'Ecommerce',
    items: [
      {
        id: 'ecommerce-dashboard',
        label: 'Dashboard',
        icon: LayoutDashboardIcon,
        items: Array.from({ length: 7 }, (_, i) => {
          const n = i + 1
          const labels = [
            'Overview',
            'Sales performance',
            'Customer activity',
            'Finance',
            'Operations',
            'Order intelligence',
            'Sales channels'
          ]
          return {
            id: `ecommerce-dashboard-${n}`,
            label: labels[i] ?? `Dashboard ${n}`,
            href: `/ecommerce/dashboard-${n}`
          }
        })
      },
      {
        id: 'ecommerce-analytics',
        label: 'Analytics',
        icon: BarChart3Icon,
        href: '/ecommerce/analytics'
      },
      {
        id: 'ecommerce-products',
        label: 'Products',
        icon: PackageIcon,
        items: [
          {
            id: 'ecommerce-add-product',
            label: 'Add Product',
            href: '/ecommerce/add-product'
          },
          {
            id: 'ecommerce-add-product-2',
            label: 'Add Product 2',
            href: '/ecommerce/add-product-2'
          },
          {
            id: 'ecommerce-edit-product',
            label: 'Edit Product',
            href: PRODUCTS[0] ? `/ecommerce/edit-product/${PRODUCTS[0].id}` : undefined
          },
          {
            id: 'ecommerce-edit-product-2',
            label: 'Edit Product 2',
            href: PRODUCTS[0] ? `/ecommerce/edit-product-2/${PRODUCTS[0].id}` : undefined
          },
          {
            id: 'ecommerce-product-detail-1',
            label: 'Product Detail 1',
            href: PRODUCTS[0] ? `/ecommerce/product-detail-1/${PRODUCTS[0].id}` : undefined
          },
          {
            id: 'ecommerce-product-detail-2',
            label: 'Product Detail 2',
            href: PRODUCTS[0] ? `/ecommerce/product-detail-2/${PRODUCTS[0].id}` : undefined
          },
          {
            id: 'ecommerce-product-list-1',
            label: 'Product List 1',
            href: '/ecommerce/product-list-1'
          },
          {
            id: 'ecommerce-product-list-2',
            label: 'Product List 2',
            href: '/ecommerce/product-list-2'
          },
          {
            id: 'ecommerce-product-list-3',
            label: 'Product List 3',
            href: '/ecommerce/product-list-3'
          },
          {
            id: 'ecommerce-product-list-4',
            label: 'Product List 4',
            href: '/ecommerce/product-list-4'
          }
        ]
      },
      {
        id: 'ecommerce-customers',
        label: 'Customers',
        icon: UsersIcon,
        href: '/ecommerce/customers'
      },
      {
        id: 'ecommerce-orders',
        label: 'Orders',
        icon: ShoppingCartIcon,
        items: [
          {
            id: 'ecommerce-add-order',
            label: 'Add Order',
            href: '/ecommerce/add-order'
          },
          {
            id: 'ecommerce-edit-order',
            // Points at the first order — same "pick an example row" shortcut
            // used by the Products edit/detail nav entries above.
            label: 'Edit Order',
            href: ORDERS[0] ? `/ecommerce/edit-order/${ORDERS[0].id}` : undefined
          },
          {
            id: 'ecommerce-order-detail-1',
            label: 'Order Detail 1',
            href: ORDERS[0] ? `/ecommerce/order-detail-1/${ORDERS[0].id}` : undefined
          },
          {
            id: 'ecommerce-order-detail-2',
            label: 'Order Detail 2',
            href: ORDERS[0] ? `/ecommerce/order-detail-2/${ORDERS[0].id}` : undefined
          },
          {
            id: 'ecommerce-order-list-1',
            label: 'Order List 1',
            href: '/ecommerce/order-list-1'
          },
          {
            id: 'ecommerce-order-list-2',
            label: 'Order List 2',
            href: '/ecommerce/order-list-2'
          },
          {
            id: 'ecommerce-order-list-3',
            label: 'Order List 3',
            href: '/ecommerce/order-list-3'
          }
        ]
      },
      {
        id: 'ecommerce-pos',
        label: 'POS App',
        icon: StoreIcon,
        href: '/ecommerce/pos-app'
      },
      {
        id: 'ecommerce-shipments',
        label: 'Shipments',
        icon: TruckIcon,
        items: [
          {
            id: 'ecommerce-shipment-list-1',
            label: 'Shipment List',
            href: '/ecommerce/shipment-list-1'
          },
          {
            id: 'ecommerce-shipment-detail-1',
            label: 'Shipment Detail',
            href: SHIPMENTS[0] ? `/ecommerce/shipment-detail-1/${SHIPMENTS[0].id}` : undefined
          },
          {
            id: 'ecommerce-add-shipping',
            label: 'Add Shipment',
            href: '/ecommerce/add-shipping'
          },
          {
            id: 'ecommerce-edit-shipping',
            label: 'Edit Shipping Label',
            href: SHIPMENTS[0] ? `/ecommerce/edit-shipping/${SHIPMENTS[0].id}` : undefined
          }
        ]
      }
    ]
  },
  {
    label: 'Project Management',
    items: [
      {
        id: 'pm-dashboard',
        label: 'Dashboard',
        icon: LayoutDashboardIcon,
        items: Array.from({ length: 4 }, (_, i) => {
          const n = i + 1
          const labels = [
            'Executive overview',
            'Delivery health',
            'Team workload',
            'Portfolio health'
          ]
          return {
            id: `pm-dashboard-${n}`,
            label: labels[i] ?? `Dashboard ${n}`,
            href: `/project-management/dashboard-${n}`
          }
        })
      },
      {
        id: 'pm-projects',
        label: 'Projects',
        icon: TableIcon,
        items: [
          {
            id: 'pm-projects-list',
            label: 'Projects',
            href: '/project-management/projects'
          },
          {
            id: 'pm-project-detail',
            label: 'Project Detail',
            href: PROJECTS[0] ? `/project-management/project-detail/${PROJECTS[0].id}` : undefined
          }
        ]
      },
      {
        id: 'pm-timesheet',
        label: 'Timesheet',
        icon: ClockIcon,
        href: '/project-management/timesheet'
      },
      {
        id: 'pm-members',
        label: 'Team & Members',
        icon: UsersIcon,
        href: '/project-management/members'
      },
      {
        id: 'pm-kanban',
        label: 'Kanban',
        icon: KanbanSquareIcon,
        href: '/project-management/kanban'
      },
      {
        id: 'pm-calendar',
        label: 'Calendar',
        icon: CalendarIcon,
        href: '/project-management/calendar'
      },
      {
        id: 'pm-inbox',
        label: 'Inbox',
        icon: InboxIcon,
        href: '/project-management/inbox'
      },
      {
        id: 'pm-chats',
        label: 'Chats',
        icon: MessageCircleIcon,
        href: '/project-management/chats'
      },
      {
        id: 'pm-ai-chatbot',
        label: 'AI Chatbot',
        icon: BotIcon,
        href: '/project-management/ai-chatbot'
      }
    ]
  },
  {
    label: 'Company',
    items: [
      {
        id: 'company-profile',
        label: 'Company Profile',
        icon: Building2Icon,
        href: '/company/profile'
      },
      {
        id: 'company-offices',
        label: 'Offices',
        icon: MapPinnedIcon,
        href: '/company/offices'
      }
    ]
  },
  {
    label: 'HR',
    items: [
      {
        id: 'hr-employees',
        label: 'Employees',
        icon: UsersIcon,
        href: '/hr/employees'
      },
      {
        id: 'hr-employee-detail',
        label: 'Employee Detail',
        icon: UsersIcon,
        // Points at the first employee — same "pick an example row" shortcut
        // used by the Products/Orders detail nav entries above.
        href: EMPLOYEES[0] ? `/hr/employee-detail/${EMPLOYEES[0].id}` : undefined
      },
      {
        id: 'hr-departments',
        label: 'Departments',
        icon: Building2Icon,
        items: [
          {
            id: 'hr-departments-list',
            label: 'Departments',
            href: '/hr/departments'
          },
          {
            id: 'hr-department-detail',
            label: 'Department Detail',
            href: DEPARTMENTS[0] ? `/hr/department-detail/${DEPARTMENTS[0].id}` : undefined
          }
        ]
      },
      {
        id: 'hr-org-chart',
        label: 'Org Chart',
        icon: NetworkIcon,
        href: '/hr/org-chart'
      },
      {
        id: 'hr-attendance',
        label: 'Attendance',
        icon: ClipboardListIcon,
        items: [
          {
            id: 'hr-attendance-requests',
            label: 'Time Off Requests',
            href: '/hr/attendance-requests'
          },
          {
            id: 'hr-attendance-calendar',
            label: 'Attendance Calendar',
            href: '/hr/attendance-calendar'
          }
        ]
      },
      {
        id: 'hr-recruiting',
        label: 'Recruiting',
        icon: UserCogIcon,
        items: [
          {
            id: 'hr-job-openings',
            label: 'Job Openings',
            href: '/hr/job-openings'
          },
          {
            id: 'hr-recruiting-pipeline',
            label: 'Recruiting Pipeline',
            href: JOB_OPENINGS[0] ? `/hr/recruiting-pipeline/${JOB_OPENINGS[0].id}` : undefined
          },
          {
            id: 'hr-external-professionals',
            label: 'External Professionals',
            href: '/hr/external-professionals'
          }
        ]
      },
      {
        id: 'hr-time',
        label: 'Shifts & Time Tracking',
        icon: CalendarClockIcon,
        items: [
          { id: 'hr-time-clock', label: 'Time Clock', href: '/hr/time-clock' },
          {
            id: 'hr-team-status',
            label: 'Team Status',
            href: '/hr/team-status'
          },
          {
            id: 'hr-location-map',
            label: 'Location Map',
            href: '/hr/location-map'
          },
          { id: 'hr-shifts', label: 'Shifts', href: '/hr/shifts' },
          {
            id: 'hr-time-tracking',
            label: 'Time Tracking',
            href: '/hr/time-tracking'
          },
          {
            id: 'hr-attendance-settings',
            label: 'Attendance Settings',
            href: '/hr/attendance-settings'
          }
        ]
      },
      {
        id: 'hr-expenses',
        label: 'Expense Reports',
        icon: ReceiptIcon,
        href: '/hr/expenses'
      },
      {
        id: 'hr-payroll',
        label: 'Payroll',
        icon: WalletIcon,
        href: '/hr/payroll'
      },
      {
        id: 'hr-documents',
        label: 'Documents',
        icon: FileTextIcon,
        href: '/hr/documents'
      }
    ]
  }
]

/** Maps our nav-config shape onto the `SidebarNav` component's own item shape. */
export function toSidebarNavItem(item: NavItemDef, pathname: string): SidebarNavItem {
  if (item.items) {
    return {
      id: item.id,
      label: item.label,
      icon: item.icon,
      items: item.items.map(child => toSidebarNavItem(child, pathname))
    }
  }
  return {
    id: item.id,
    label: item.label,
    icon: item.icon,
    href: item.href,
    disabled: !item.href,
    badge: item.href ? undefined : 'Soon',
    active: item.href ? pathname === item.href : false
  }
}

/** Ids of every parent item with a descendant matching the current path — so its submenu starts expanded. */
export function findOpenAncestorIds(items: NavItemDef[], pathname: string): string[] {
  const open: string[] = []
  for (const item of items) {
    if (!item.items) continue
    const hasActiveDescendant = item.items.some(child => child.href === pathname)
    if (hasActiveDescendant) open.push(item.id)
    open.push(...findOpenAncestorIds(item.items, pathname))
  }
  return open
}
