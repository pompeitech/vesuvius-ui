'use client'

import {
  Alert,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDescription,
  AlertTitle,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  ChartCard,
  Checkbox,
  EmptyState,
  IconButton,
  Calendar,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SimpleBarChart,
  Slider,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  Textarea
} from '@pompeitech/vesuvius-ui'
// Same reasoning as mdx-components.tsx / site-header.tsx: this whole file is
// already "use client", so importing the package directly (rather than
// through vesuvius-client.ts) is fine — that indirection only exists to
// cross the RSC boundary from a Server Component, which nothing here does.
import {
  ActivityIcon,
  PaletteIcon as AppearanceIcon,
  ArrowRightIcon,
  BarChart3Icon,
  BellIcon,
  BookOpenIcon,
  CalendarIcon,
  ChevronUpIcon,
  CreditCardIcon,
  FileTextIcon,
  LifeBuoyIcon,
  MailIcon,
  RefreshCwIcon,
  SendIcon,
  ShieldIcon,
  SparklesIcon,
  TargetIcon,
  UserIcon,
  UsersIcon,
  WalletIcon
} from 'lucide-react'
import Image from 'next/image'
import { ThemeLogo } from './theme-logo'
import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n/get-dictionary'
import type { Locale } from '@/lib/i18n/locales'

const REVENUE_DATA = [
  { month: 'Apr', revenue: 32 },
  { month: 'May', revenue: 41 },
  { month: 'Jun', revenue: 38 },
  { month: 'Jul', revenue: 52 },
  { month: 'Aug', revenue: 47 },
  { month: 'Sep', revenue: 61 }
]

const PLANNING_LINKS = [
  { icon: FileTextIcon, label: 'Documents' },
  { icon: WalletIcon, label: 'Budget' },
  { icon: BarChart3Icon, label: 'Reports' },
  { icon: TargetIcon, label: 'Goals' },
  { icon: CalendarIcon, label: 'Calendar' }
]

const SUPPORT_LINKS = [
  { icon: LifeBuoyIcon, label: 'Help Center' },
  { icon: BookOpenIcon, label: 'Docs' },
  { icon: MailIcon, label: 'Contact Us' },
  { icon: ActivityIcon, label: 'Status' },
  { icon: UsersIcon, label: 'Community' }
]

const OVERVIEW_LINKS = [
  { icon: BarChart3Icon, label: 'Analytics', active: true },
  { icon: ActivityIcon, label: 'Transactions' },
  { icon: WalletIcon, label: 'Investments' },
  { icon: CreditCardIcon, label: 'Accounts' },
  { icon: TargetIcon, label: 'Spending' }
]

const ACCOUNT_LINKS = [
  { icon: UserIcon, label: 'Profile' },
  { icon: CreditCardIcon, label: 'Billing' },
  { icon: BellIcon, label: 'Notifications' },
  { icon: ShieldIcon, label: 'Security' },
  { icon: AppearanceIcon, label: 'Appearance' }
]

function NavListCard({
  title,
  links
}: {
  title: string
  links: { icon: typeof FileTextIcon; label: string; active?: boolean }[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0.5">
        {links.map(({ icon: Icon, label, active }) => (
          <span
            key={label}
            className={
              active
                ? 'bg-accent text-accent-foreground flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium'
                : 'text-muted-foreground flex items-center gap-2 rounded-md px-2 py-1.5 text-sm'
            }
          >
            <Icon className="size-3.5 shrink-0" />
            <span className="truncate">{label}</span>
          </span>
        ))}
      </CardContent>
    </Card>
  )
}

function DeviceBreakdownCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Device breakdown</CardTitle>
        <p className="text-muted-foreground text-xs">Traffic by device type</p>
      </CardHeader>
      <CardContent>
        <div
          className="mx-auto size-44 rounded-full"
          style={{
            background:
              'conic-gradient(var(--chart-1) 0 42%, var(--chart-2) 42% 70%, var(--chart-3) 70% 84%, var(--chart-4) 84% 94%, var(--chart-5) 94% 100%)'
          }}
        >
          <div className="bg-card m-8 size-28 rounded-full" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
          {[
            ['Desktop', '42%', 'var(--chart-1)'],
            ['Mobile', '28%', 'var(--chart-2)'],
            ['Tablet', '14%', 'var(--chart-3)'],
            ['Other', '16%', 'var(--chart-4)']
          ].map(([label, value, color]) => (
            <div key={label} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
                {label}
              </span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RecentTransactionsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-medium">Recent transactions</CardTitle>
          <p className="text-muted-foreground text-xs">Latest activity</p>
        </div>
        <Button size="sm" variant="outline">
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="border-border overflow-x-auto rounded-md border text-sm">
          <div className="bg-muted grid min-w-[420px] grid-cols-4 p-3 text-xs font-medium">
            <span>Customer</span>
            <span>Status</span>
            <span>Date</span>
            <span className="text-right">Amount</span>
          </div>
          {[
            ['Olivia Martin', 'Completed', 'Sep 18', '$2,400'],
            ['Liam Johnson', 'Processing', 'Sep 17', '$1,840'],
            ['Noah Williams', 'Completed', 'Sep 16', '$980']
          ].map(([customer, status, date, amount]) => (
            <div
              key={customer}
              className="border-border grid min-w-[420px] grid-cols-4 border-t p-3"
            >
              <span className="font-medium">{customer}</span>
              <span className="text-muted-foreground">{status}</span>
              <span className="text-muted-foreground">{date}</span>
              <span className="text-right font-medium">{amount}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PerformanceOverviewCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-sm font-medium">Performance overview</CardTitle>
          <p className="text-muted-foreground text-xs">Revenue, cost and profit trends</p>
        </div>
        <div className="bg-muted flex rounded-md p-1 text-xs">
          <span className="bg-background rounded px-2 py-1 font-medium">Revenue</span>
          <span className="text-muted-foreground px-2 py-1">Profit</span>
          <span className="text-muted-foreground px-2 py-1">Orders</span>
        </div>
      </CardHeader>
      <CardContent>
        <SimpleBarChart
          data={REVENUE_DATA}
          index="month"
          categories={['revenue']}
          showLegend
          showYAxis
          className="h-64"
        />
      </CardContent>
    </Card>
  )
}

function BentoShowcase() {
  return (
    <div className="relative mx-auto mt-14 mb-14 w-full max-w-[1800px] px-6 lg:px-10">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Badge variant="outline">Featured component blocks</Badge>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
          Everything you need to build the interface.
        </h2>
        <p className="text-muted-foreground mt-4 text-lg leading-8">
          Complex, reusable UI compositions built from the same Vesuvius primitives, tokens and
          interaction patterns.
        </p>
      </div>
      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex flex-wrap gap-2">
                <Button size="sm">
                  Button
                  <ArrowRightIcon className="size-3.5" />
                </Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
                <Button size="sm" variant="outline">
                  Outline
                </Button>
              </div>
              <Input placeholder="Name" />
              <Textarea placeholder="Message" className="min-h-16 resize-none" />
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Switch defaultChecked aria-label="Notifications" className="ml-auto" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Alert Dialog
                </Button>
                <Button size="sm" variant="outline" className="flex-1 gap-1">
                  Button Group
                  <ChevronUpIcon className="size-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <NavListCard title="Planning" links={PLANNING_LINKS} />
            <NavListCard title="Support" links={SUPPORT_LINKS} />
          </div>

          <DeviceBreakdownCard />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <p className="text-muted-foreground text-xs">Last 6 months of activity</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <SimpleBarChart
                data={REVENUE_DATA}
                index="month"
                categories={['revenue']}
                showLegend={false}
                showYAxis={false}
                className="h-32"
              />
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted rounded-md p-2.5">
                  <p className="text-muted-foreground text-xs">Upcoming</p>
                  <p className="text-foreground text-sm font-semibold">Oct 2026</p>
                  <p className="text-muted-foreground text-xs">Scheduled</p>
                </div>
                <div className="bg-muted rounded-md p-2.5">
                  <p className="text-muted-foreground text-xs">Billing plan</p>
                  <p className="text-foreground text-sm font-semibold">Accelerated</p>
                  <p className="text-muted-foreground text-xs">Recurring</p>
                </div>
              </div>
              <Button size="sm" className="w-full">
                View Full Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <p className="text-foreground text-2xl font-bold">$12,480</p>
                <Badge variant="outline" className="mt-1">
                  Pending Setup
                </Badge>
              </div>
              <div className="border-border flex flex-col gap-1.5 border-t pt-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gross royalties</span>
                  <span className="text-foreground font-medium">$13,180.75</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Processing fee</span>
                  <span className="text-foreground font-medium">-$700.75</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Total ready to pay out</span>
                  <span className="text-foreground font-semibold">$12,480.00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <PerformanceOverviewCard />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">New goal</CardTitle>
              <p className="text-muted-foreground text-xs">
                Define your target and we&apos;ll help you pace it.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="bento-goal" className="text-xs">
                  Goal name
                </Label>
                <Input
                  id="bento-goal"
                  placeholder="e.g. New office, home downpayment"
                  className="h-8"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="bento-amount" className="text-xs">
                    Target amount
                  </Label>
                  <Input id="bento-amount" defaultValue="$15,000" className="h-8" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="bento-date" className="text-xs">
                    Target date
                  </Label>
                  <Input id="bento-date" defaultValue="Dec 2026" className="h-8" />
                </div>
              </div>
              <Button size="sm" className="mt-1">
                Create Goal
              </Button>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Payout settings</CardTitle>
              <p className="text-muted-foreground text-xs">
                Set the minimum balance required before a payout triggers.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="bento-currency" className="text-xs">
                  Preferred currency
                </Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="bento-currency" className="h-8 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD — US Dollar</SelectItem>
                    <SelectItem value="eur">EUR — Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <span>Minimum payout amount</span>
                  <span className="text-foreground font-medium">$2,500</span>
                </div>
                <Progress value={45} aria-label="Minimum payout amount" className="mt-1.5" />
                <div className="text-muted-foreground mt-1 flex items-center justify-between text-[11px]">
                  <span>$50 min</span>
                  <span>$10,000 max</span>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="bento-notes" className="text-xs">
                  Notes
                </Label>
                <Textarea
                  id="bento-notes"
                  placeholder="Add any notes for this payout configuration…"
                  className="min-h-14 resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-4">
          <Card className="flex flex-1 flex-col">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Ask AI</CardTitle>
              <CardAction>
                <RefreshCwIcon className="text-muted-foreground size-3.5" />
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-full">
                  <SparklesIcon className="size-4" />
                </span>
                <p className="text-foreground text-sm font-semibold">Morning, Ada!</p>
                <p className="text-muted-foreground max-w-[220px] text-xs">
                  What are we building today? Press send to start a new conversation.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Ask anything…" className="h-8" />
                <Button size="icon" className="size-8 shrink-0">
                  <SendIcon className="size-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <NavListCard title="Overview" links={OVERVIEW_LINKS} />
            <NavListCard title="Account" links={ACCOUNT_LINKS} />
          </div>

          <RecentTransactionsCard />
        </div>
      </div>
    </div>
  )
}

const COMPONENT_CATALOG = {
  atoms: [
    'Alert',
    'Aspect Ratio',
    'Avatar',
    'Badge',
    'Button',
    'Card',
    'Checkbox',
    'Icon Button',
    'Input',
    'Label',
    'Number Input',
    'Password Input',
    'Progress',
    'Radio Group',
    'Separator',
    'Skeleton',
    'Slider',
    'Switch',
    'Textarea',
    'Typography'
  ],
  molecules: [
    'Accordion',
    'Alert Dialog',
    'Avatar Group',
    'Breadcrumb',
    'Chart Card',
    'Combobox',
    'Command',
    'Confirm Dialog',
    'Context Menu',
    'Dialog',
    'Dropdown Menu',
    'Empty State',
    'File Preview',
    'Filter Bar',
    'Form',
    'Input Group',
    'Pagination',
    'Popover',
    'Select',
    'Sidebar',
    'Stat Card',
    'Stepper',
    'Table',
    'Tabs',
    'Toast',
    'Tooltip',
    'User Avatar'
  ],
  organisms: [
    'Calendar',
    'Charts',
    'Data Table',
    'Date Picker',
    'Date Range Picker',
    'Date Time Picker',
    'Date Time Range Picker',
    'Kanban Board',
    'Multi Select',
    'People Select',
    'Rich Text Editor',
    'Time Picker',
    'Timeline',
    'Tree View',
    'Wizard'
  ]
} as const

function ComponentLivePreview({ name }: { name: string }) {
  if (name === 'Button') {
    return (
      <div className="flex flex-wrap gap-2">
        <Button size="xs">Default</Button>
        <Button size="xs" variant="outline">
          Outline
        </Button>
      </div>
    )
  }
  if (name === 'Badge') {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    )
  }
  if (name === 'Input' || name === 'Password Input' || name === 'Number Input') {
    return (
      <Input
        placeholder={name === 'Number Input' ? '0.00' : 'name@example.com'}
        type={name === 'Password Input' ? 'password' : 'text'}
      />
    )
  }
  if (name === 'Textarea') {
    return <Textarea placeholder="Write a short note…" className="min-h-20 resize-none" />
  }
  if (name === 'Checkbox') {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Checkbox defaultChecked id="catalog-terms" />
        <Label htmlFor="catalog-terms">Accept terms</Label>
      </div>
    )
  }
  if (name === 'Radio Group') {
    return (
      <RadioGroup defaultValue="comfortable" className="flex gap-4 text-sm">
        <Label className="flex items-center gap-2">
          <RadioGroupItem value="comfortable" /> Comfortable
        </Label>
        <Label className="flex items-center gap-2">
          <RadioGroupItem value="compact" /> Compact
        </Label>
      </RadioGroup>
    )
  }
  if (name === 'Progress') {
    return <Progress value={68} aria-label="Progress preview" />
  }
  if (name === 'Slider') {
    return <Slider defaultValue={[42]} max={100} aria-label="Slider preview" />
  }
  if (name === 'Switch') {
    return (
      <div className="flex items-center gap-3 text-sm">
        <Switch defaultChecked aria-label="Notifications preview" />
        Notifications
      </div>
    )
  }
  if (name === 'Alert') {
    return (
      <Alert className="w-full py-2">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Changes saved successfully.</AlertDescription>
      </Alert>
    )
  }
  if (name === 'Alert Dialog') {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="outline">
            Delete account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete account?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  if (name === 'Avatar') {
    return (
      <Avatar size="lg">
        <AvatarFallback>VD</AvatarFallback>
      </Avatar>
    )
  }
  if (name === 'Icon Button') {
    return <IconButton aria-label="Open actions">⋯</IconButton>
  }
  if (name === 'Card') {
    return (
      <Card className="w-full">
        <CardContent className="p-3 text-sm">A composed surface</CardContent>
      </Card>
    )
  }
  if (name === 'Separator') {
    return (
      <div className="w-full space-y-3 text-sm">
        <span>Section title</span>
        <div className="bg-border h-px w-full" />
        <span className="text-muted-foreground">Supporting text</span>
      </div>
    )
  }
  if (name === 'Skeleton') {
    return (
      <div className="w-full space-y-2">
        <div className="bg-muted h-3 w-2/3 animate-pulse rounded" />
        <div className="bg-muted h-3 w-full animate-pulse rounded" />
        <div className="bg-muted h-3 w-1/2 animate-pulse rounded" />
      </div>
    )
  }
  if (name === 'Calendar') {
    return <Calendar className="scale-90" />
  }
  if (name === 'Charts') {
    return (
      <SimpleBarChart
        data={REVENUE_DATA}
        index="month"
        categories={['revenue']}
        showLegend={false}
        showYAxis={false}
        className="h-28 w-full"
      />
    )
  }
  if (name === 'Tabs') {
    return (
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
      </Tabs>
    )
  }
  if (name === 'Accordion') {
    return (
      <Accordion type="single" collapsible className="w-full text-sm">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Vesuvius UI?</AccordionTrigger>
          <AccordionContent>A composable component system.</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  if (name === 'Empty State') {
    return (
      <EmptyState
        compact
        title="Nothing here yet"
        description="Create your first item."
        action={<Button size="xs">Create</Button>}
      />
    )
  }
  if (name === 'Select') {
    return (
      <Select defaultValue="monthly">
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>
    )
  }
  if (name === 'Stat Card') {
    return (
      <div className="w-full">
        <p className="text-muted-foreground text-xs">Monthly revenue</p>
        <p className="mt-1 text-2xl font-semibold">$12,480</p>
        <Badge variant="outline" className="mt-2">
          +12.4%
        </Badge>
      </div>
    )
  }
  if (name === 'Chart Card') {
    return (
      <ChartCard
        label="Revenue"
        value="$12,480"
        changePct={12.4}
        caption="Last 30 days"
        className="w-full"
      >
        <SimpleBarChart
          data={REVENUE_DATA}
          index="month"
          categories={['revenue']}
          showLegend={false}
          showYAxis={false}
          className="h-20"
        />
      </ChartCard>
    )
  }
  if (name === 'Data Table' || name === 'Table') {
    return (
      <div className="border-border w-full overflow-hidden rounded-md border text-xs">
        <div className="bg-muted grid grid-cols-3 p-2 font-medium">
          <span>Name</span>
          <span>Status</span>
          <span className="text-right">Value</span>
        </div>
        {[
          ['John Doe', 'Active', '$1,234'],
          ['Jane Smith', 'Active', '$2,345']
        ].map(([person, status, value]) => (
          <div key={person} className="border-border grid grid-cols-3 border-t p-2">
            <span>{person}</span>
            <span>{status}</span>
            <span className="text-right">{value}</span>
          </div>
        ))}
      </div>
    )
  }
  if (name === 'Kanban Board') {
    return (
      <div className="grid w-full grid-cols-3 gap-2 text-[10px]">
        {['Todo', 'In progress', 'Done'].map(column => (
          <div key={column} className="bg-muted rounded p-2">
            <p className="font-medium">{column}</p>
            <div className="bg-card mt-2 rounded p-2 shadow-sm">Task card</div>
          </div>
        ))}
      </div>
    )
  }
  if (name === 'People Select' || name === 'Multi Select' || name === 'Combobox') {
    return (
      <div className="border-input bg-background text-muted-foreground flex h-9 w-full items-center justify-between rounded-md border px-3 text-sm">
        Select options <span>⌄</span>
      </div>
    )
  }
  if (name === 'Form' || name === 'Input Group') {
    return (
      <div className="w-full space-y-2">
        <Label className="text-xs">Email</Label>
        <Input placeholder="name@example.com" />
        <Button size="sm">Continue</Button>
      </div>
    )
  }
  if (name === 'Timeline' || name === 'Stepper') {
    return (
      <div className="w-full space-y-2 text-xs">
        {['Submitted', 'In review', 'Complete'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span className={`size-2 rounded-full ${i < 2 ? 'bg-primary' : 'bg-muted'}`} />
            {step}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-muted/60 flex w-full items-center gap-2 rounded-lg p-3 text-sm">
      <span className="bg-primary/15 text-primary flex size-7 items-center justify-center rounded-md text-xs font-semibold">
        UI
      </span>
      <span className="truncate">{name} preview</span>
    </div>
  )
}

function componentLayout(name: string) {
  if (['Kanban Board', 'Data Table', 'Calendar', 'Charts'].includes(name)) {
    return 'md:col-span-12'
  }
  if (
    [
      'Date Picker',
      'Date Range Picker',
      'Date Time Picker',
      'Date Time Range Picker',
      'Chart Card',
      'Form',
      'Sidebar',
      'Rich Text Editor'
    ].includes(name)
  ) {
    return 'md:col-span-8'
  }
  if (['Table', 'Select', 'Combobox', 'Multi Select', 'People Select'].includes(name)) {
    return 'md:col-span-4'
  }
  return 'md:col-span-4'
}

function _ComponentCatalogShowcase({ dict }: { dict: Dictionary }) {
  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline">The Vesuvius UI component kit</Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
            Build polished interfaces, faster.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            Explore the building blocks behind Vesuvius UI. From a single atom to complete
            organisms, every component is ready to use, compose and adapt to your product.
          </p>
        </div>

        <div className="mt-20 space-y-24">
          {(['atoms', 'molecules', 'organisms'] as const).map(category => {
            const items = COMPONENT_CATALOG[category]
            return (
              <section key={category}>
                <div className="mb-8 flex items-end justify-between gap-6">
                  <div>
                    <p className="text-primary text-sm font-medium uppercase">Vesuvius UI</p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight capitalize">
                      {category}
                    </h3>
                  </div>
                  <span className="text-muted-foreground text-sm">{items.length} components</span>
                </div>
                <Card className="overflow-hidden">
                  <CardContent className="grid grid-cols-1 items-start gap-x-10 gap-y-14 p-6 md:grid-cols-12 lg:p-8">
                    {items.map(name => (
                      <div key={name} className={`min-w-0 ${componentLayout(name)}`}>
                        <h3 className="mb-4 text-sm font-semibold">{name}</h3>
                        <div className="flex min-h-32 w-full items-center justify-center">
                          <ComponentLivePreview name={name} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>
            )
          })}

          <section>
            <div className="mb-8">
              <p className="text-primary text-sm font-medium uppercase">Vesuvius UI</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight">Templates</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dict.home.templates.map(template => (
                <Card key={template.title} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{template.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-6">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-8">
              <p className="text-primary text-sm font-medium uppercase">Vesuvius UI</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight">Pages</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dict.home.pages.map(page => (
                <Card key={page.title} className="overflow-hidden">
                  <Image
                    src={page.image}
                    alt=""
                    width={640}
                    height={360}
                    className="aspect-video w-full object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-base">{page.title}</CardTitle>
                    <p className="text-muted-foreground text-sm leading-6">{page.description}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export function HomeContent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <>
      <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 py-24 text-center">
        <ThemeLogo className="h-auto max-w-full" />
        <Badge variant="outline">v0.1.0</Badge>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.home.hero.title}
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">{dict.home.hero.description}</p>
        <div className="flex gap-3">
          <Button size="lg" asChild>
            <Link href={`/${locale}/docs/intro`}>{dict.nav.docs}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              {dict.nav.github}
            </a>
          </Button>
        </div>
      </main>
      <BentoShowcase />
    </>
  )
}
