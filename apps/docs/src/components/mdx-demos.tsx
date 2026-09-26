'use client'

// Any interactive doc example — one that needs useState/useEffect/hooks, an
// event-handler prop, or a bare icon-component reference passed as a prop
// value — cannot be authored as inline JSX in the .mdx content itself: the
// whole MDX tree is compiled and evaluated by next-mdx-remote-client/rsc
// inside the Server Component page.tsx, so any function/component reference
// constructed there and passed as a *prop* into one of Vesuvius's "use
// client" components (not rendered as a child element, but passed as a prop
// value like `onCheckedChange={fn}` or `icon={SomeIcon}`) hits React's "the
// server generally can't pass functions to Client Components" restriction —
// it isn't specific to hooks. (Directly nesting `<Foo>{children}</Foo>` is
// fine; SERIALIZING a prop that is itself a closure or bare component
// reference is what breaks.)
//
// The fix: every such example is a small named component here instead,
// registered in DEMOS and referenced from the .mdx as `<Demo name="..." />`
// (optionally with plain string/number/boolean props for translated text —
// those ARE serializable, so EN/IT content can share one demo component and
// just pass different label props).
import * as LucideIcons from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { z } from 'zod'
import * as V from '@pompeitech/vesuvius-ui'

function Icon({ name, className }: { name: string; className?: string }) {
  const Comp = (
    LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>
  )[name]
  return Comp ? <Comp className={className} /> : null
}

// cmdk's internal store Provider is only wired up for content that Radix
// actually mounts — fine for Command used inside a closed-by-default
// Popover/Dialog (nothing renders server-side to begin with), but a `Command`
// rendered directly and unconditionally (no Popover/Dialog gating it) hits
// "Cannot read properties of undefined (reading 'subscribe')" during Next's
// static-generation SSR pass. Deferring the real mount to after hydration
// sidesteps it — the placeholder keeps the preview's layout stable.
function ClientOnly({ placeholder, children }: { placeholder: ReactNode; children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted ? <>{children}</> : <>{placeholder}</>
}

// ---------- checkbox: select-all ----------
function CheckboxSelectAll({
  selectAllLabel = 'Select all',
  itemLabel = 'Item'
}: {
  selectAllLabel?: string
  itemLabel?: string
}) {
  const [items, setItems] = useState(() => [true, false, false])
  const allChecked = items.every(Boolean)
  const someChecked = items.some(Boolean) && !allChecked
  return (
    <div className="flex flex-col gap-2">
      <div className="border-border flex items-center gap-2 border-b pb-2">
        <V.Checkbox
          checked={someChecked ? 'indeterminate' : allChecked}
          onCheckedChange={v => setItems(items.map(() => v === true))}
        />
        <V.Label>{selectAllLabel}</V.Label>
      </div>
      {items.map((checked, i) => (
        <div key={i} className="flex items-center gap-2">
          <V.Checkbox
            checked={checked}
            onCheckedChange={v => setItems(items.map((it, idx) => (idx === i ? v === true : it)))}
          />
          <V.Label>
            {itemLabel} {i + 1}
          </V.Label>
        </div>
      ))}
    </div>
  )
}

// ---------- command: default palette ----------
function CommandPaletteInner({
  searchPlaceholder = 'Type a command or search...',
  emptyText = 'No results found.',
  suggestionsLabel = 'Suggestions',
  settingsLabel = 'Settings',
  calendarLabel = 'Calendar',
  emojiLabel = 'Search Emoji',
  calculatorLabel = 'Calculator',
  profileLabel = 'Profile',
  billingLabel = 'Billing'
}: {
  searchPlaceholder?: string
  emptyText?: string
  suggestionsLabel?: string
  settingsLabel?: string
  calendarLabel?: string
  emojiLabel?: string
  calculatorLabel?: string
  profileLabel?: string
  billingLabel?: string
}) {
  return (
    <V.Command className="w-96 rounded-lg border shadow-md">
      <V.CommandInput placeholder={searchPlaceholder} />
      <V.CommandList>
        <V.CommandEmpty>{emptyText}</V.CommandEmpty>
        <V.CommandGroup heading={suggestionsLabel}>
          <V.CommandItem>
            <LucideIcons.Calendar />
            {calendarLabel}
          </V.CommandItem>
          <V.CommandItem>
            <LucideIcons.Smile />
            {emojiLabel}
          </V.CommandItem>
          <V.CommandItem>
            <LucideIcons.Calculator />
            {calculatorLabel}
          </V.CommandItem>
        </V.CommandGroup>
        <V.CommandSeparator />
        <V.CommandGroup heading={settingsLabel}>
          <V.CommandItem>
            <LucideIcons.User />
            {profileLabel}
            <V.CommandShortcut>⌘P</V.CommandShortcut>
          </V.CommandItem>
          <V.CommandItem>
            <LucideIcons.CreditCard />
            {billingLabel}
            <V.CommandShortcut>⌘B</V.CommandShortcut>
          </V.CommandItem>
        </V.CommandGroup>
      </V.CommandList>
    </V.Command>
  )
}
function CommandPaletteDemo(props: Record<string, unknown>) {
  return (
    <ClientOnly placeholder={<div className="h-[22.5rem] w-96 rounded-lg border shadow-md" />}>
      <CommandPaletteInner {...props} />
    </ClientOnly>
  )
}

// ---------- sheet: two sibling Radix Dialog roots on one page hit the same
// SSR context quirk as an ungated Command (see ClientOnly's own comment) ----------
function SheetRight({
  triggerLabel = 'Open',
  title = 'Edit profile',
  description = 'Make changes to your profile here.',
  nameLabel = 'Name',
  saveLabel = 'Save changes'
}: {
  triggerLabel?: string
  title?: string
  description?: string
  nameLabel?: string
  saveLabel?: string
}) {
  return (
    <ClientOnly placeholder={<div className="h-9 w-20 rounded-md border" />}>
      <V.Sheet>
        <V.SheetTrigger asChild>
          <V.Button variant="outline">{triggerLabel}</V.Button>
        </V.SheetTrigger>
        <V.SheetContent>
          <V.SheetHeader>
            <V.SheetTitle>{title}</V.SheetTitle>
            <V.SheetDescription>{description}</V.SheetDescription>
          </V.SheetHeader>
          <div className="grid gap-4 px-4">
            <div className="grid gap-1.5">
              <V.Label htmlFor="docs-sheet-name">{nameLabel}</V.Label>
              <V.Input id="docs-sheet-name" defaultValue="Pedro Duarte" />
            </div>
          </div>
          <V.SheetFooter>
            <V.SheetClose asChild>
              <V.Button>{saveLabel}</V.Button>
            </V.SheetClose>
          </V.SheetFooter>
        </V.SheetContent>
      </V.Sheet>
    </ClientOnly>
  )
}
function SheetLeft({
  triggerLabel = 'Open from left',
  title = 'Navigation',
  description = 'Slides in from the left edge.'
}: {
  triggerLabel?: string
  title?: string
  description?: string
}) {
  return (
    <ClientOnly placeholder={<div className="h-9 w-32 rounded-md border" />}>
      <V.Sheet>
        <V.SheetTrigger asChild>
          <V.Button variant="outline">{triggerLabel}</V.Button>
        </V.SheetTrigger>
        <V.SheetContent side="left">
          <V.SheetHeader>
            <V.SheetTitle>{title}</V.SheetTitle>
            <V.SheetDescription>{description}</V.SheetDescription>
          </V.SheetHeader>
        </V.SheetContent>
      </V.Sheet>
    </ClientOnly>
  )
}

// ---------- progress: animated ----------
function ProgressAnimated() {
  const [value, setValue] = useState(13)
  useEffect(() => {
    const timer = setTimeout(() => setValue(66), 500)
    return () => clearTimeout(timer)
  }, [])
  return <V.Progress value={value} className="w-72" />
}

// ---------- collapsible: starred repos ----------
function CollapsibleStarredRepos({ title = 'Starred repos' }: { title?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <V.Collapsible open={open} onOpenChange={setOpen} className="w-72 space-y-2">
      <div className="flex items-center justify-between gap-4 px-1">
        <span className="text-sm font-semibold">{title}</span>
        <V.CollapsibleTrigger asChild>
          <V.Button variant="ghost" size="icon" className="size-8">
            <Icon name="ChevronsUpDown" className="size-4" />
          </V.Button>
        </V.CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 text-sm shadow-xs">@radix-ui/primitives</div>
      <V.CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm shadow-xs">@tanstack/react-table</div>
        <div className="rounded-md border px-4 py-2 text-sm shadow-xs">@dnd-kit/core</div>
      </V.CollapsibleContent>
    </V.Collapsible>
  )
}

// ---------- command palette (static, no state needed but kept here for symmetry) ----------

// ---------- context-menu / dropdown-menu: status bar toggle ----------
function DropdownMenuAccount({
  triggerLabel = 'Open menu',
  accountLabel = 'My Account',
  profileLabel = 'Profile',
  billingLabel = 'Billing',
  statusBarLabel = 'Status Bar'
}: {
  triggerLabel?: string
  accountLabel?: string
  profileLabel?: string
  billingLabel?: string
  statusBarLabel?: string
}) {
  const [showStatusBar, setShowStatusBar] = useState(true)
  return (
    <V.DropdownMenu>
      <V.DropdownMenuTrigger asChild>
        <V.Button variant="outline">{triggerLabel}</V.Button>
      </V.DropdownMenuTrigger>
      <V.DropdownMenuContent className="w-56">
        <V.DropdownMenuLabel>{accountLabel}</V.DropdownMenuLabel>
        <V.DropdownMenuSeparator />
        <V.DropdownMenuGroup>
          <V.DropdownMenuItem>
            {profileLabel}
            <V.DropdownMenuShortcut>⇧⌘P</V.DropdownMenuShortcut>
          </V.DropdownMenuItem>
          <V.DropdownMenuItem>
            {billingLabel}
            <V.DropdownMenuShortcut>⌘B</V.DropdownMenuShortcut>
          </V.DropdownMenuItem>
        </V.DropdownMenuGroup>
        <V.DropdownMenuSeparator />
        <V.DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
          {statusBarLabel}
        </V.DropdownMenuCheckboxItem>
      </V.DropdownMenuContent>
    </V.DropdownMenu>
  )
}

// ---------- select: controlled ----------
function SelectFruit({
  label = 'Fruit',
  appleLabel = 'Apple',
  bananaLabel = 'Banana',
  blueberryLabel = 'Blueberry'
}: {
  label?: string
  appleLabel?: string
  bananaLabel?: string
  blueberryLabel?: string
}) {
  const [value, setValue] = useState('banana')
  return (
    <div className="grid gap-1.5">
      <V.Label htmlFor="demo-fruit-select">{label}</V.Label>
      <V.Select value={value} onValueChange={setValue}>
        <V.SelectTrigger id="demo-fruit-select" className="w-56">
          <V.SelectValue />
        </V.SelectTrigger>
        <V.SelectContent>
          <V.SelectItem value="apple">{appleLabel}</V.SelectItem>
          <V.SelectItem value="banana">{bananaLabel}</V.SelectItem>
          <V.SelectItem value="blueberry">{blueberryLabel}</V.SelectItem>
        </V.SelectContent>
      </V.Select>
    </div>
  )
}

// ---------- stepper: clickable ----------
function StepperClickable({
  step1 = 'Account',
  step2 = 'Profile',
  step3 = 'Payment',
  step4 = 'Review'
}: {
  step1?: string
  step2?: string
  step3?: string
  step4?: string
}) {
  const [active, setActive] = useState(0)
  return (
    <div className="w-full">
      <V.Stepper
        steps={[{ title: step1 }, { title: step2 }, { title: step3 }, { title: step4 }]}
        activeStep={active}
        onStepClick={setActive}
      />
    </div>
  )
}

// ---------- time-picker ----------
function TimePickerDemo({
  hourFormat,
  showSeconds
}: {
  hourFormat?: '12' | '24'
  showSeconds?: boolean
}) {
  const [date, setDate] = useState(() => new Date())
  return (
    <V.TimePicker
      date={date}
      onChange={setDate}
      hourFormat={hourFormat}
      showSeconds={showSeconds}
    />
  )
}

// ---------- calendar: single ----------
function CalendarSingle() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <V.Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
  )
}

// ---------- rich-text-editor ----------
function RichTextEditorDemo({ placeholder = 'Write something...' }: { placeholder?: string }) {
  const [value, setValue] = useState(() => `<p>${placeholder}</p>`)
  return <V.RichTextEditor value={value} onChange={setValue} className="w-full" />
}

// ---------- people-select ----------
const PEOPLE = [
  { value: 'ada', label: 'Ada Lovelace', description: 'Engineering' },
  { value: 'grace', label: 'Grace Hopper', description: 'Engineering' },
  { value: 'alan', label: 'Alan Turing', description: 'Security' },
  { value: 'margaret', label: 'Margaret Hamilton', description: 'Engineering' }
]
function PeopleSelectDemo({ clearable = false }: { clearable?: boolean }) {
  const [value, setValue] = useState<string | undefined>('ada')
  return (
    <V.PeopleSelect
      options={PEOPLE}
      value={value}
      onChange={setValue}
      clearable={clearable}
      className="w-72"
    />
  )
}

// ---------- multi-select ----------
const DEPARTMENT_ICONS = [
  'TrendingUp',
  'Palette',
  'Laptop',
  'Users',
  'Truck',
  'ShoppingCart',
  'ShieldCheck'
]
function MultiSelectDemo({
  labels = [
    'Sales',
    'Marketing',
    'Engineering',
    'Customer Support',
    'Logistics',
    'Ecommerce',
    'Security'
  ],
  placeholder = 'Select departments...',
  ariaLabel = 'Departments',
  maxDisplay,
  allSelected = false
}: {
  labels?: string[]
  placeholder?: string
  ariaLabel?: string
  maxDisplay?: number
  allSelected?: boolean
}) {
  const options = useMemo(
    () =>
      labels.map((label, i) => ({
        label,
        value: label.toLowerCase().replace(/\s+/g, '-'),
        icon: (
          LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>
        )[DEPARTMENT_ICONS[i] ?? 'Circle']
      })),
    [labels]
  )
  const [values, setValues] = useState<string[]>(
    allSelected
      ? options.map(o => o.value)
      : ([options[0]?.value, options[2]?.value].filter(Boolean) as string[])
  )
  return (
    <V.MultiSelect
      options={options}
      value={values}
      onValueChange={setValues}
      placeholder={placeholder}
      aria-label={ariaLabel}
      maxDisplay={maxDisplay}
      className="w-96"
    />
  )
}

// ---------- tree-view: file explorer ----------
function TreeViewFileExplorer() {
  const data: V.TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      icon: LucideIcons.Folder,
      children: [
        {
          id: 'components',
          label: 'components',
          icon: LucideIcons.Folder,
          children: [
            { id: 'button.tsx', label: 'button.tsx', icon: LucideIcons.File },
            { id: 'input.tsx', label: 'input.tsx', icon: LucideIcons.File }
          ]
        },
        { id: 'index.ts', label: 'index.ts', icon: LucideIcons.File }
      ]
    },
    { id: 'package.json', label: 'package.json', icon: LucideIcons.File },
    {
      id: 'readme',
      label: 'README.md',
      icon: LucideIcons.File,
      disabled: true
    }
  ]
  return <V.TreeView className="w-72" defaultExpanded={['src', 'components']} data={data} />
}

// ---------- sidebar-nav ----------
function SidebarNavDemo({ groupLabel = 'Ecommerce' }: { groupLabel?: string }) {
  const items: V.SidebarNavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LucideIcons.LayoutDashboard,
      active: true
    },
    {
      id: 'products',
      label: 'Products',
      icon: LucideIcons.Package,
      badge: 128,
      items: [
        { id: 'products-all', label: 'All products' },
        { id: 'products-categories', label: 'Categories' }
      ]
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: LucideIcons.ShoppingCart,
      badge: 12,
      items: [
        { id: 'orders-all', label: 'All orders' },
        { id: 'orders-returns', label: 'Returns' }
      ]
    },
    { id: 'customers', label: 'Customers', icon: LucideIcons.Users }
  ]
  return (
    <div className="border-border h-80 w-64 overflow-hidden rounded-lg border">
      <V.SidebarTooltipProvider>
        <V.SidebarProvider className="h-full min-h-0 w-auto">
          <V.Sidebar collapsible="none" className="h-full">
            <V.SidebarContent>
              <V.SidebarGroup>
                <V.SidebarGroupLabel>{groupLabel}</V.SidebarGroupLabel>
                <V.SidebarGroupContent>
                  <V.SidebarNav items={items} defaultOpenIds={['products']} />
                </V.SidebarGroupContent>
              </V.SidebarGroup>
            </V.SidebarContent>
          </V.Sidebar>
        </V.SidebarProvider>
      </V.SidebarTooltipProvider>
    </div>
  )
}

// ---------- chart-card / stat-card: icon prop ----------
function ChartCardRevenue({
  label = 'Total Revenue',
  value = '$276,000.00',
  changeLabel = 'vs last month',
  caption = 'Total Revenue (Last 6 Months)'
}: {
  label?: string
  value?: string
  changeLabel?: string
  caption?: string
}) {
  return (
    <div className="w-full max-w-md">
      <V.ChartCard
        icon={LucideIcons.DollarSign}
        label={label}
        value={value}
        changePct={12}
        changeLabel={changeLabel}
        caption={caption}
      >
        <div className="text-primary h-24">
          <V.Sparkline
            data={[41000, 36000, 52000, 45000, 58000, 41000]}
            filled
            width={400}
            height={96}
          />
        </div>
      </V.ChartCard>
    </div>
  )
}

function StatCardRow({
  revenueLabel = 'Total Revenue',
  avgOrderLabel = 'Avg. Order Value'
}: {
  revenueLabel?: string
  avgOrderLabel?: string
}) {
  return (
    <>
      <V.StatCard
        label={revenueLabel}
        value="$45,231.89"
        icon={LucideIcons.DollarSign}
        changePct={12.4}
        className="w-64"
      />
      <V.StatCard
        label={avgOrderLabel}
        value="$68.20"
        icon={LucideIcons.CreditCard}
        changePct={-1.8}
        className="w-64"
      />
    </>
  )
}

function StatCardTrend({
  label = 'Average Sales',
  changeLabel = 'vs last month'
}: {
  label?: string
  changeLabel?: string
}) {
  return (
    <V.StatCard
      label={label}
      value="837"
      changePct={1.3}
      changeLabel={changeLabel}
      trend={<V.Sparkline data={[18, 21, 14, 7, 11, 16, 17, 10]} filled />}
      className="w-64"
    />
  )
}

// ---------- toast ----------
function ToastDefault({
  buttonLabel = 'Show toast',
  title = 'Event has been created',
  description = 'Sunday, December 3rd at 9:00am',
  actionLabel = 'Undo'
}: {
  buttonLabel?: string
  title?: string
  description?: string
  actionLabel?: string
}) {
  return (
    <V.Button
      onClick={() =>
        V.toast(title, {
          description,
          action: { label: actionLabel, onClick: () => {} }
        })
      }
    >
      {buttonLabel}
    </V.Button>
  )
}

function ToastVariants({
  successLabel = 'Success',
  errorLabel = 'Error',
  warningLabel = 'Warning',
  infoLabel = 'Info',
  successMsg = 'Saved successfully',
  errorMsg = 'Something went wrong',
  warningMsg = 'Check your input',
  infoMsg = 'New update available'
}: {
  successLabel?: string
  errorLabel?: string
  warningLabel?: string
  infoLabel?: string
  successMsg?: string
  errorMsg?: string
  warningMsg?: string
  infoMsg?: string
}) {
  return (
    <>
      <V.Button variant="outline" onClick={() => V.toast.success(successMsg)}>
        {successLabel}
      </V.Button>
      <V.Button variant="outline" onClick={() => V.toast.error(errorMsg)}>
        {errorLabel}
      </V.Button>
      <V.Button variant="outline" onClick={() => V.toast.warning(warningMsg)}>
        {warningLabel}
      </V.Button>
      <V.Button variant="outline" onClick={() => V.toast.info(infoMsg)}>
        {infoLabel}
      </V.Button>
    </>
  )
}

// ---------- charts: formatted values ----------
const REVENUE_DATA = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 3800, expenses: 2600 },
  { month: 'Mar', revenue: 5100, expenses: 3100 },
  { month: 'Apr', revenue: 4700, expenses: 2900 },
  { month: 'May', revenue: 6200, expenses: 3400 },
  { month: 'Jun', revenue: 7100, expenses: 3800 }
]
function ChartFormattedValues() {
  return (
    <div className="h-72 w-full">
      <V.SimpleLineChart
        data={REVENUE_DATA}
        index="month"
        categories={['revenue']}
        valueFormatter={(v: number) => `$${(v / 1000).toFixed(1)}k`}
      />
    </div>
  )
}

// ---------- empty state: default ----------
function EmptyStateDefault({
  title = 'No orders yet',
  description = 'Orders will appear here once your first customer checks out.',
  actionLabel = 'Create order'
}: {
  title?: string
  description?: string
  actionLabel?: string
}) {
  return (
    <V.EmptyState
      icon={LucideIcons.FileSearchIcon}
      title={title}
      description={description}
      action={<V.Button size="sm">{actionLabel}</V.Button>}
    />
  )
}

// ---------- wizard: validated step ----------
function WizardValidated({
  accountTitle = 'Account',
  emailErrorMsg = 'Enter a valid email to continue.',
  doneTitle = 'Done',
  doneMsg = "You can't reach this step without a valid email."
}: {
  accountTitle?: string
  emailErrorMsg?: string
  doneTitle?: string
  doneMsg?: string
}) {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const isValid = /\S+@\S+\.\S+/.test(email)
  return (
    <div className="w-full max-w-lg">
      <V.Wizard
        steps={[
          {
            title: accountTitle,
            content: (
              <div className="grid gap-1.5 py-2">
                <V.Label htmlFor="wv-email">Email</V.Label>
                <V.Input
                  id="wv-email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  aria-invalid={touched && !isValid}
                />
                {touched && !isValid && (
                  <V.FormHelperText variant="error">{emailErrorMsg}</V.FormHelperText>
                )}
              </div>
            ),
            validate: () => {
              setTouched(true)
              return isValid
            }
          },
          {
            title: doneTitle,
            content: <p className="text-muted-foreground py-2 text-sm">{doneMsg}</p>
          }
        ]}
      />
    </div>
  )
}

// ---------- wizard: default (no validation, just multi-step) ----------
function WizardDefault({
  accountTitle = 'Account',
  accountDesc = 'Basic info',
  emailLabel = 'Email',
  paymentTitle = 'Payment',
  paymentDesc = 'Billing details',
  cardLabel = 'Card number',
  reviewTitle = 'Review',
  reviewDesc = 'Confirm',
  reviewText = 'Review your order and click Finish to confirm.'
}: {
  accountTitle?: string
  accountDesc?: string
  emailLabel?: string
  paymentTitle?: string
  paymentDesc?: string
  cardLabel?: string
  reviewTitle?: string
  reviewDesc?: string
  reviewText?: string
}) {
  return (
    <div className="w-full max-w-lg">
      <V.Wizard
        steps={[
          {
            title: accountTitle,
            description: accountDesc,
            content: (
              <div className="grid gap-1.5 py-2">
                <V.Label htmlFor="w-email">{emailLabel}</V.Label>
                <V.Input id="w-email" type="email" placeholder="you@example.com" />
              </div>
            )
          },
          {
            title: paymentTitle,
            description: paymentDesc,
            content: (
              <div className="grid gap-1.5 py-2">
                <V.Label htmlFor="w-card">{cardLabel}</V.Label>
                <V.Input id="w-card" placeholder="4242 4242 4242 4242" />
              </div>
            )
          },
          {
            title: reviewTitle,
            description: reviewDesc,
            content: <p className="text-muted-foreground py-2 text-sm">{reviewText}</p>
          }
        ]}
      />
    </div>
  )
}

// ---------- data-table ----------
type Order = { id: string; customer: string; status: string; amount: number }
const ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customer: 'Ada Lovelace',
    status: 'delivered',
    amount: 128.5
  },
  {
    id: 'ORD-002',
    customer: 'Grace Hopper',
    status: 'processing',
    amount: 64.0
  },
  { id: 'ORD-003', customer: 'Alan Turing', status: 'pending', amount: 245.75 },
  {
    id: 'ORD-004',
    customer: 'Margaret Hamilton',
    status: 'shipped',
    amount: 89.99
  }
]
const STATUS_VARIANT: Record<string, 'success' | 'default' | 'warning' | 'secondary'> = {
  delivered: 'success',
  processing: 'default',
  pending: 'warning',
  shipped: 'secondary'
}
function DataTableDemo({
  orderCol = 'Order',
  customerCol = 'Customer',
  statusCol = 'Status',
  amountCol = 'Amount'
}: {
  orderCol?: string
  customerCol?: string
  statusCol?: string
  amountCol?: string
}) {
  const columns: V.DataTableColumnDef<Order, unknown>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: ({ header }) => <V.DataTableColumnHeader header={header} title={orderCol} />,
        cell: ({ getValue }) => <span className="font-medium">{getValue() as string}</span>
      },
      {
        accessorKey: 'customer',
        header: ({ header }) => <V.DataTableColumnHeader header={header} title={customerCol} />
      },
      {
        accessorKey: 'status',
        header: ({ header }) => <V.DataTableColumnHeader header={header} title={statusCol} />,
        cell: ({ getValue }) => {
          const status = getValue() as string
          return (
            <V.Badge variant={STATUS_VARIANT[status]} className="capitalize">
              {status}
            </V.Badge>
          )
        }
      },
      {
        accessorKey: 'amount',
        header: ({ header }) => <V.DataTableColumnHeader header={header} title={amountCol} />,
        cell: ({ getValue }) => `$${(getValue() as number).toFixed(2)}`
      }
    ],
    [orderCol, customerCol, statusCol, amountCol]
  )
  return <V.DataTable columns={columns} data={ORDERS} enableExport />
}

type KanbanDemoItem = {
  id: string
  title: string
  status: 'backlog' | 'todo' | 'progress' | 'done'
}

function KanbanBoardDemo() {
  const [items, setItems] = useState<KanbanDemoItem[]>([
    { id: '1', title: 'Define the API contract', status: 'backlog' },
    { id: '2', title: 'Build the first prototype', status: 'todo' },
    { id: '3', title: 'Review the interaction', status: 'progress' },
    { id: '4', title: 'Publish documentation', status: 'done' }
  ])

  return (
    <V.KanbanBoard
      className="h-96"
      columnWidth="12rem"
      columns={[
        { id: 'backlog', title: 'Backlog' },
        { id: 'todo', title: 'Todo' },
        { id: 'progress', title: 'In progress' },
        { id: 'done', title: 'Done' }
      ]}
      items={items}
      getItemId={item => item.id}
      getItemColumn={item => item.status}
      onItemMove={(item, status) =>
        setItems(current =>
          current.map(candidate =>
            candidate.id === item.id ? { ...candidate, status } : candidate
          )
        )
      }
      renderItem={item => (
        <div className="bg-background rounded-md border p-3 shadow-sm">
          <p className="text-sm font-medium">{item.title}</p>
          <V.Badge variant="secondary" className="mt-2 capitalize">
            {item.status}
          </V.Badge>
        </div>
      )}
    />
  )
}

const DEMOS: Record<string, (props: Record<string, unknown>) => ReactNode> = {
  'command-palette': CommandPaletteDemo,
  'sheet-right': SheetRight as (props: Record<string, unknown>) => ReactNode,
  'sheet-left': SheetLeft as (props: Record<string, unknown>) => ReactNode,
  'checkbox-select-all': CheckboxSelectAll as (props: Record<string, unknown>) => ReactNode,
  'progress-animated': ProgressAnimated,
  'collapsible-starred-repos': CollapsibleStarredRepos as (
    props: Record<string, unknown>
  ) => ReactNode,
  'dropdown-menu-account': DropdownMenuAccount as (props: Record<string, unknown>) => ReactNode,
  'select-fruit': SelectFruit as (props: Record<string, unknown>) => ReactNode,
  'stepper-clickable': StepperClickable as (props: Record<string, unknown>) => ReactNode,
  'time-picker': TimePickerDemo as (props: Record<string, unknown>) => ReactNode,
  'calendar-single': CalendarSingle,
  'rich-text-editor': RichTextEditorDemo as (props: Record<string, unknown>) => ReactNode,
  'people-select': PeopleSelectDemo as (props: Record<string, unknown>) => ReactNode,
  'multi-select': MultiSelectDemo as (props: Record<string, unknown>) => ReactNode,
  'tree-view-file-explorer': TreeViewFileExplorer,
  'sidebar-nav': SidebarNavDemo as (props: Record<string, unknown>) => ReactNode,
  'chart-card-revenue': ChartCardRevenue as (props: Record<string, unknown>) => ReactNode,
  'stat-card-row': StatCardRow as (props: Record<string, unknown>) => ReactNode,
  'stat-card-trend': StatCardTrend as (props: Record<string, unknown>) => ReactNode,
  'toast-default': ToastDefault as (props: Record<string, unknown>) => ReactNode,
  'toast-variants': ToastVariants as (props: Record<string, unknown>) => ReactNode,
  'chart-formatted-values': ChartFormattedValues,
  'empty-state-default': EmptyStateDefault,
  'wizard-default': WizardDefault as (props: Record<string, unknown>) => ReactNode,
  'wizard-validated': WizardValidated as (props: Record<string, unknown>) => ReactNode,
  'data-table': DataTableDemo as (props: Record<string, unknown>) => ReactNode,
  'kanban-board': KanbanBoardDemo
}

export function Demo({ name, ...props }: { name: string } & Record<string, unknown>) {
  const Component = DEMOS[name]
  if (!Component) return null
  return <Component {...props} />
}
