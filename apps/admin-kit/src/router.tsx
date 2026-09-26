import { createBrowserRouter, Navigate } from 'react-router'

/**
 * Data-mode router (no Framework Mode / SSR — this is a pure client SPA).
 * One shell (`DashboardLayout`, via root-layout) wraps the whole tree — a single
 * sidebar with both "Ecommerce" and "Project Management" groups always
 * visible, no app-switcher.
 */
const ECOMMERCE = { label: 'Ecommerce', href: '/ecommerce/dashboard-1' }
const PROJECT_MANAGEMENT = {
  label: 'Project Management',
  href: '/project-management/dashboard-1'
}
const PROJECTS = { label: 'Projects', href: '/project-management/projects' }
const PRODUCTS = { label: 'Products', href: '/ecommerce/product-list-1' }
const ORDERS = { label: 'Orders', href: '/ecommerce/order-list-1' }
const SHIPMENTS = { label: 'Shipments', href: '/ecommerce/shipment-list-1' }
const COMPANY = { label: 'Company', href: '/company/profile' }
const ACCOUNT = { label: 'Account', href: '/account/profile' }
const HR = { label: 'HR', href: '/hr/employees' }
const DEPARTMENTS = { label: 'Departments', href: '/hr/departments' }
const ATTENDANCE = { label: 'Attendance', href: '/hr/attendance-requests' }
const RECRUITING = { label: 'Recruiting', href: '/hr/job-openings' }
const SHIFTS_TIME = { label: 'Shifts & Time Tracking', href: '/hr/shifts' }

export const router = createBrowserRouter(
  [
    {
      path: '/',
      lazy: () => import('./layouts/root-layout'),
      children: [
        {
          index: true,
          element: <Navigate to="/ecommerce/dashboard-1" replace />
        },
        {
          path: 'ecommerce/dashboard-1',
          lazy: () => import('./features/ecommerce/dashboard-1'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Overview' }] }
        },
        {
          path: 'ecommerce/dashboard-2',
          lazy: () => import('./features/ecommerce/dashboard-2'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Sales performance' }] }
        },
        {
          path: 'ecommerce/dashboard-3',
          lazy: () => import('./features/ecommerce/dashboard-3'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Customer activity' }] }
        },
        {
          path: 'ecommerce/dashboard-4',
          lazy: () => import('./features/ecommerce/dashboard-4'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Finance' }] }
        },
        {
          path: 'ecommerce/dashboard-5',
          lazy: () => import('./features/ecommerce/dashboard-5'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Operations' }] }
        },
        {
          path: 'ecommerce/dashboard-6',
          lazy: () => import('./features/ecommerce/dashboard-6'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Order intelligence' }] }
        },
        {
          path: 'ecommerce/dashboard-7',
          lazy: () => import('./features/ecommerce/dashboard-7'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Sales channels' }] }
        },
        {
          path: 'ecommerce/analytics',
          lazy: () => import('./features/ecommerce/analytics'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Analytics' }] }
        },
        {
          path: 'ecommerce/product-list-1',
          lazy: () => import('./features/ecommerce/product-list-1'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Products' }] }
        },
        {
          path: 'ecommerce/customers',
          lazy: () => import('./features/ecommerce/customers'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Customers' }] }
        },
        {
          path: 'ecommerce/add-product',
          lazy: () => import('./features/ecommerce/add-product'),
          handle: {
            breadcrumb: [ECOMMERCE, PRODUCTS, { label: 'Add Product' }]
          }
        },
        {
          path: 'ecommerce/add-product-2',
          lazy: () => import('./features/ecommerce/add-product-2'),
          handle: {
            breadcrumb: [ECOMMERCE, PRODUCTS, { label: 'Add Product 2' }]
          }
        },
        {
          path: 'ecommerce/edit-product/:id',
          lazy: () => import('./features/ecommerce/edit-product'),
          handle: {
            breadcrumb: [ECOMMERCE, PRODUCTS, { label: 'Edit Product' }]
          }
        },
        {
          path: 'ecommerce/edit-product-2/:id',
          lazy: () => import('./features/ecommerce/edit-product-2'),
          handle: {
            breadcrumb: [ECOMMERCE, PRODUCTS, { label: 'Edit Product 2' }]
          }
        },
        {
          path: 'ecommerce/product-detail-1/:id',
          lazy: () => import('./features/ecommerce/product-detail-1'),
          handle: {
            breadcrumb: [ECOMMERCE, PRODUCTS, { label: 'Product Detail' }]
          }
        },
        {
          path: 'ecommerce/product-detail-2/:id',
          lazy: () => import('./features/ecommerce/product-detail-2'),
          handle: {
            breadcrumb: [ECOMMERCE, PRODUCTS, { label: 'Product Detail 2' }]
          }
        },
        {
          path: 'ecommerce/product-list-2',
          lazy: () => import('./features/ecommerce/product-list-2'),
          handle: {
            breadcrumb: [ECOMMERCE, PRODUCTS, { label: 'Product List 2' }]
          }
        },
        {
          path: 'ecommerce/product-list-3',
          lazy: () => import('./features/ecommerce/product-list-3'),
          handle: {
            breadcrumb: [ECOMMERCE, PRODUCTS, { label: 'Product List 3' }]
          }
        },
        {
          path: 'ecommerce/product-list-4',
          lazy: () => import('./features/ecommerce/product-list-4'),
          handle: {
            breadcrumb: [ECOMMERCE, PRODUCTS, { label: 'Product List 4' }]
          }
        },
        {
          path: 'ecommerce/order-list-1',
          lazy: () => import('./features/ecommerce/order-list-1'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Orders' }] }
        },
        {
          path: 'ecommerce/order-list-2',
          lazy: () => import('./features/ecommerce/order-list-2'),
          handle: {
            breadcrumb: [ECOMMERCE, ORDERS, { label: 'Order List 2' }]
          }
        },
        {
          path: 'ecommerce/order-list-3',
          lazy: () => import('./features/ecommerce/order-list-3'),
          handle: {
            breadcrumb: [ECOMMERCE, ORDERS, { label: 'Order List 3' }]
          }
        },
        {
          path: 'ecommerce/add-order',
          lazy: () => import('./features/ecommerce/add-order'),
          handle: { breadcrumb: [ECOMMERCE, ORDERS, { label: 'Add Order' }] }
        },
        {
          path: 'ecommerce/edit-order/:id',
          lazy: () => import('./features/ecommerce/edit-order'),
          handle: { breadcrumb: [ECOMMERCE, ORDERS, { label: 'Edit Order' }] }
        },
        {
          path: 'ecommerce/order-detail-1/:id',
          lazy: () => import('./features/ecommerce/order-detail-1'),
          handle: {
            breadcrumb: [ECOMMERCE, ORDERS, { label: 'Order Detail' }]
          }
        },
        {
          path: 'ecommerce/order-detail-2/:id',
          lazy: () => import('./features/ecommerce/order-detail-2'),
          handle: {
            breadcrumb: [ECOMMERCE, ORDERS, { label: 'Order Detail 2' }]
          }
        },
        {
          path: 'ecommerce/pos-app',
          lazy: () => import('./features/ecommerce/pos-app'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'POS App' }] }
        },
        {
          path: 'ecommerce/shipment-list-1',
          lazy: () => import('./features/ecommerce/shipment-list-1'),
          handle: { breadcrumb: [ECOMMERCE, { label: 'Shipments' }] }
        },
        {
          path: 'ecommerce/shipment-detail-1/:id',
          lazy: () => import('./features/ecommerce/shipment-detail-1'),
          handle: {
            breadcrumb: [ECOMMERCE, SHIPMENTS, { label: 'Shipment Detail' }]
          }
        },
        {
          path: 'ecommerce/add-shipping',
          lazy: () => import('./features/ecommerce/add-shipping'),
          handle: {
            breadcrumb: [ECOMMERCE, SHIPMENTS, { label: 'Add Shipment' }]
          }
        },
        {
          path: 'ecommerce/edit-shipping/:id',
          lazy: () => import('./features/ecommerce/edit-shipping'),
          handle: {
            breadcrumb: [ECOMMERCE, SHIPMENTS, { label: 'Edit Shipping Label' }]
          }
        },
        {
          path: 'project-management/dashboard-1',
          lazy: () => import('./features/project-management/dashboard-1'),
          handle: {
            breadcrumb: [PROJECT_MANAGEMENT, { label: 'Executive overview' }]
          }
        },
        {
          path: 'project-management/dashboard-2',
          lazy: () => import('./features/project-management/dashboard-2'),
          handle: {
            breadcrumb: [PROJECT_MANAGEMENT, { label: 'Delivery health' }]
          }
        },
        {
          path: 'project-management/dashboard-3',
          lazy: () => import('./features/project-management/dashboard-3'),
          handle: {
            breadcrumb: [PROJECT_MANAGEMENT, { label: 'Team workload' }]
          }
        },
        {
          path: 'project-management/dashboard-4',
          lazy: () => import('./features/project-management/dashboard-4'),
          handle: {
            breadcrumb: [PROJECT_MANAGEMENT, { label: 'Portfolio health' }]
          }
        },
        {
          path: 'project-management/projects',
          lazy: () => import('./features/project-management/projects'),
          handle: {
            breadcrumb: [PROJECT_MANAGEMENT, PROJECTS, { label: 'Projects' }]
          }
        },
        {
          path: 'project-management/project-detail/:id',
          lazy: () => import('./features/project-management/project-detail'),
          handle: {
            breadcrumb: [PROJECT_MANAGEMENT, PROJECTS, { label: 'Project Detail' }]
          }
        },
        {
          path: 'project-management/issue-detail/:id',
          lazy: () => import('./features/project-management/issue-detail'),
          handle: {
            breadcrumb: [
              PROJECT_MANAGEMENT,
              PROJECTS,
              { label: 'Project Detail' },
              { label: 'Issue Detail' }
            ]
          }
        },
        {
          path: 'project-management/timesheet',
          lazy: () => import('./features/project-management/timesheet'),
          handle: { breadcrumb: [PROJECT_MANAGEMENT, { label: 'Timesheet' }] }
        },
        {
          path: 'project-management/members',
          lazy: () => import('./features/project-management/members'),
          handle: {
            breadcrumb: [PROJECT_MANAGEMENT, { label: 'Team & Members' }]
          }
        },
        {
          path: 'project-management/kanban',
          lazy: () => import('./features/project-management/kanban'),
          handle: { breadcrumb: [PROJECT_MANAGEMENT, { label: 'Kanban' }] }
        },
        {
          path: 'project-management/calendar',
          lazy: () => import('./features/project-management/calendar'),
          handle: { breadcrumb: [PROJECT_MANAGEMENT, { label: 'Calendar' }] }
        },
        {
          path: 'project-management/inbox',
          lazy: () => import('./features/project-management/inbox'),
          handle: { breadcrumb: [PROJECT_MANAGEMENT, { label: 'Inbox' }] }
        },
        {
          path: 'project-management/chats',
          lazy: () => import('./features/project-management/chats'),
          handle: { breadcrumb: [PROJECT_MANAGEMENT, { label: 'Chats' }] }
        },
        {
          path: 'project-management/ai-chatbot',
          lazy: () => import('./features/project-management/ai-chatbot'),
          handle: { breadcrumb: [PROJECT_MANAGEMENT, { label: 'AI Chatbot' }] }
        },
        {
          path: 'company/profile',
          lazy: () => import('./features/company/profile'),
          handle: { breadcrumb: [COMPANY, { label: 'Company Profile' }] }
        },
        {
          path: 'company/offices',
          lazy: () => import('./features/company/offices'),
          handle: { breadcrumb: [COMPANY, { label: 'Offices' }] }
        },
        {
          path: 'account/profile',
          lazy: () => import('./features/account/profile'),
          handle: { breadcrumb: [ACCOUNT, { label: 'Profile' }] }
        },
        {
          path: 'account/security',
          lazy: () => import('./features/account/security'),
          handle: { breadcrumb: [ACCOUNT, { label: 'Security' }] }
        },
        {
          path: 'account/notifications',
          lazy: () => import('./features/account/notifications'),
          handle: { breadcrumb: [ACCOUNT, { label: 'Notifications' }] }
        },
        {
          path: 'hr/employees',
          lazy: () => import('./features/hr/employees'),
          handle: { breadcrumb: [HR, { label: 'Employees' }] }
        },
        {
          path: 'hr/employee-detail/:id',
          lazy: () => import('./features/hr/employee-detail'),
          handle: { breadcrumb: [HR, { label: 'Employee Detail' }] }
        },
        {
          path: 'hr/attendance-requests',
          lazy: () => import('./features/hr/attendance-requests'),
          handle: { breadcrumb: [HR, { label: 'Time Off Requests' }] }
        },
        {
          path: 'hr/attendance-calendar',
          lazy: () => import('./features/hr/attendance-calendar'),
          handle: {
            breadcrumb: [HR, ATTENDANCE, { label: 'Attendance Calendar' }]
          }
        },
        {
          path: 'hr/expenses',
          lazy: () => import('./features/hr/expenses'),
          handle: { breadcrumb: [HR, { label: 'Expense Reports' }] }
        },
        {
          path: 'hr/payroll',
          lazy: () => import('./features/hr/payroll'),
          handle: { breadcrumb: [HR, { label: 'Payroll' }] }
        },
        {
          path: 'hr/payroll-detail/:period',
          lazy: () => import('./features/hr/payroll-detail'),
          handle: {
            breadcrumb: [HR, { label: 'Payroll', href: '/hr/payroll' }, { label: 'Payroll Detail' }]
          }
        },
        {
          path: 'hr/documents',
          lazy: () => import('./features/hr/documents'),
          handle: { breadcrumb: [HR, { label: 'Documents' }] }
        },
        {
          path: 'hr/departments',
          lazy: () => import('./features/hr/departments'),
          handle: { breadcrumb: [HR, { label: 'Departments' }] }
        },
        {
          path: 'hr/department-detail/:id',
          lazy: () => import('./features/hr/department-detail'),
          handle: {
            breadcrumb: [HR, DEPARTMENTS, { label: 'Department Detail' }]
          }
        },
        {
          path: 'hr/org-chart',
          lazy: () => import('./features/hr/org-chart'),
          handle: { breadcrumb: [HR, { label: 'Org Chart' }] }
        },
        {
          path: 'hr/job-openings',
          lazy: () => import('./features/hr/job-openings'),
          handle: { breadcrumb: [HR, RECRUITING, { label: 'Job Openings' }] }
        },
        {
          path: 'hr/recruiting-pipeline/:jobId',
          lazy: () => import('./features/hr/recruiting-pipeline'),
          handle: {
            breadcrumb: [HR, RECRUITING, { label: 'Recruiting Pipeline' }]
          }
        },
        {
          path: 'hr/external-professionals',
          lazy: () => import('./features/hr/external-professionals'),
          handle: {
            breadcrumb: [HR, RECRUITING, { label: 'External Professionals' }]
          }
        },
        {
          path: 'hr/time-clock',
          lazy: () => import('./features/hr/time-clock'),
          handle: { breadcrumb: [HR, SHIFTS_TIME, { label: 'Time Clock' }] }
        },
        {
          path: 'hr/team-status',
          lazy: () => import('./features/hr/team-status'),
          handle: { breadcrumb: [HR, SHIFTS_TIME, { label: 'Team Status' }] }
        },
        {
          path: 'hr/location-map',
          lazy: () => import('./features/hr/location-map'),
          handle: { breadcrumb: [HR, SHIFTS_TIME, { label: 'Location Map' }] }
        },
        {
          path: 'hr/shifts',
          lazy: () => import('./features/hr/shifts'),
          handle: { breadcrumb: [HR, SHIFTS_TIME, { label: 'Shifts' }] }
        },
        {
          path: 'hr/time-tracking',
          lazy: () => import('./features/hr/time-tracking'),
          handle: { breadcrumb: [HR, SHIFTS_TIME, { label: 'Time Tracking' }] }
        },
        {
          path: 'hr/attendance-settings',
          lazy: () => import('./features/hr/attendance-settings'),
          handle: {
            breadcrumb: [HR, SHIFTS_TIME, { label: 'Attendance Settings' }]
          }
        }
      ]
    },
    // Outside the dashboard shell entirely — no sidebar/header/breadcrumb, and
    // gated the other way round (root-layout's loader redirects *out* of the
    // shell when signed out; these two redirect *back in* when already signed
    // in — see each page's own `loader`).
    {
      path: 'login',
      lazy: () => import('./features/auth/login')
    },
    {
      path: 'signup',
      lazy: () => import('./features/auth/signup')
    }
  ],
  {
    // Matches vite.config.ts's `base` (Vite exposes it as BASE_URL) so routes
    // resolve correctly when this app is built for a sub-path deploy.
    basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
  }
)
