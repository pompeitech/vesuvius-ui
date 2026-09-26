'use client'

import Link from 'next/link'
import {
  ArrowUpRightIcon,
  CheckCircle2Icon,
  CheckIcon,
  CircleIcon,
  MicIcon,
  SparklesIcon,
  UserRoundIcon
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  useTheme
} from '@pompeitech/vesuvius-ui'
import type { ThemeCatalogEntry } from '@/lib/theme-catalog'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

function getCatalogCopy(dict: Dictionary, theme: ThemeCatalogEntry) {
  return dict.themeCatalog[theme.name as keyof Dictionary['themeCatalog']]
}

function ThemeSwatches({ theme }: { theme: ThemeCatalogEntry }) {
  return (
    <div className="flex gap-1.5" aria-label={`${theme.label} color swatches`}>
      {theme.swatch.map(color => (
        <span
          key={color}
          className="size-5 rounded-full border border-black/10 shadow-sm"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}

export function ThemePreview({
  theme,
  dict,
  dark = false,
  compact = false
}: {
  theme: ThemeCatalogEntry
  dict: Dictionary
  dark?: boolean
  compact?: boolean
}) {
  if (!compact) {
    return (
      <div data-theme={theme.name} className={dark ? 'dark rounded-2xl' : 'rounded-2xl'}>
        <div className="border-border bg-background text-foreground overflow-hidden rounded-2xl border shadow-sm">
          <div className="border-border text-muted-foreground flex items-center justify-between border-b px-5 py-3 text-xs">
            <span className="text-foreground font-medium">{theme.label} / workspace</span>
            <span>{dict.themePages.livePreview}</span>
          </div>

          <div className="grid gap-4 p-5 lg:grid-cols-[1.05fr_1fr_1fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {[
                  ['default', 'default'],
                  ['secondary', 'secondary'],
                  ['outline', 'outline'],
                  ['ghost', 'ghost'],
                  ['destructive', 'destructive']
                ].map(([label, variant]) => (
                  <Button
                    key={label}
                    size="xs"
                    variant={
                      variant as 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
                    }
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span>Notifications</span>
                  <span className="bg-primary/90 inline-flex h-5 w-8 items-center rounded-full p-0.5">
                    <span className="bg-primary-foreground ml-auto size-4 rounded-full" />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Compact</span>
                  <span className="bg-muted inline-flex h-5 w-8 items-center rounded-full p-0.5">
                    <span className="bg-muted-foreground/50 size-4 rounded-full" />
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="flex items-center gap-2">
                    <CheckCircle2Icon className="text-primary size-4" /> Terms
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2">
                    <CircleIcon className="size-4" /> Marketing
                  </span>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="bg-muted relative h-1 rounded-full">
                    <span className="bg-primary absolute inset-y-0 left-0 w-3/5 rounded-full" />
                    <span className="bg-background border-primary absolute -top-1.5 left-3/5 size-4 rounded-full border" />
                  </div>
                  <div className="bg-muted relative h-1 rounded-full">
                    <span className="bg-primary absolute inset-y-0 left-1/4 w-1/2 rounded-full" />
                    <span className="bg-background border-primary absolute -top-1.5 left-1/4 size-4 rounded-full border" />
                    <span className="bg-background border-primary absolute -top-1.5 left-3/4 size-4 rounded-full border" />
                  </div>
                </div>
              </div>
              <div className="flex -space-x-2">
                {['bg-primary', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4'].map((color, index) => (
                  <span
                    key={color}
                    className={`${color} border-background flex size-8 items-center justify-center rounded-full border-2 text-[10px] text-white`}
                  >
                    {index === 0 ? <UserRoundIcon className="size-3.5" /> : ''}
                  </span>
                ))}
              </div>
              <Badge variant="outline">New feature available</Badge>
            </div>

            <div className="space-y-3">
              <div className="border-border bg-card rounded-xl border p-3">
                <p className="font-medium">Success</p>
                <p className="text-muted-foreground text-sm">
                  Your changes have been saved successfully.
                </p>
              </div>
              <div className="border-primary/40 bg-primary/5 flex items-center justify-between rounded-xl border p-3 text-sm">
                <span>Starter</span>
                <span className="border-primary text-primary size-4 rounded-full border-2" />
              </div>
              <div className="border-border flex items-center justify-between rounded-xl border p-3 text-sm">
                <span>Pro</span>
                <CircleIcon className="text-muted-foreground size-4" />
              </div>
              <div className="border-border overflow-hidden rounded-xl border text-sm">
                <div className="bg-muted/60 grid grid-cols-3 p-2 font-medium">
                  <span>Name</span>
                  <span>Status</span>
                  <span className="text-right">Balance</span>
                </div>
                {['John Doe', 'Jane Smith', 'Bob Johnson'].map((name, index) => (
                  <div key={name} className="border-border grid grid-cols-3 border-t p-2">
                    <span>{name}</span>
                    <span>{index === 2 ? 'Inactive' : 'Active'}</span>
                    <span className="text-right">
                      {['$1,234.56', '$2,345.67', '$567.89'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <input
                readOnly
                value="name@example.com"
                className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 text-sm outline-none focus-visible:ring-2"
                aria-label="Email preview"
              />
              <input
                readOnly
                value="Unavailable"
                className="border-input bg-muted/30 text-muted-foreground flex h-9 w-full rounded-lg border px-3 text-sm"
                aria-label="Unavailable preview"
              />
              <textarea
                readOnly
                value="Write a short note..."
                className="border-input bg-background min-h-16 w-full resize-none rounded-lg border px-3 py-2 text-sm"
                aria-label="Note preview"
              />
              <Button className="w-full">
                <SparklesIcon className="size-4" /> Sign up with Google
              </Button>
              <div className="text-muted-foreground flex items-center gap-3 text-xs uppercase">
                <span className="bg-border h-px flex-1" /> or{' '}
                <span className="bg-border h-px flex-1" />
              </div>
              <p className="text-sm font-medium">Email</p>
              <input
                readOnly
                value="m@example.com"
                className="border-input bg-background flex h-9 w-full rounded-lg border px-3 text-sm"
                aria-label="Login email preview"
              />
              <input
                readOnly
                value="Enter your password"
                className="border-input bg-background text-muted-foreground flex h-9 w-full rounded-lg border px-3 text-sm"
                aria-label="Password preview"
              />
              <Button className="w-full">Log in</Button>
            </div>
          </div>

          <div className="border-border grid gap-4 border-t p-5 lg:grid-cols-[1.7fr_1fr]">
            <div className="border-border bg-card rounded-xl border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Performance Overview</p>
                  <p className="text-muted-foreground text-sm">Revenue, cost, and profit trends</p>
                </div>
                <div className="bg-muted flex gap-1 rounded-lg p-1 text-xs">
                  <span className="bg-background rounded px-2 py-1">Revenue</span>
                  <span className="text-muted-foreground px-2 py-1">Profit</span>
                  <span className="text-muted-foreground px-2 py-1">Orders</span>
                </div>
              </div>
              <svg
                viewBox="0 0 640 150"
                className="text-primary mt-5 h-32 w-full"
                role="img"
                aria-label="Performance chart"
              >
                <path
                  d="M0 118 C45 92 70 104 110 98 S180 105 220 88 S290 101 330 75 S395 95 430 70 S500 83 545 54 S605 70 640 32 L640 150 L0 150 Z"
                  fill="currentColor"
                  opacity=".12"
                />
                <path
                  d="M0 118 C45 92 70 104 110 98 S180 105 220 88 S290 101 330 75 S395 95 430 70 S500 83 545 54 S605 70 640 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M0 130 C45 128 70 120 110 124 S180 112 220 120 S290 106 330 110 S395 98 430 105 S500 90 545 95 S605 82 640 88"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="5 5"
                  strokeWidth="2"
                  opacity=".65"
                />
              </svg>
              <div className="text-muted-foreground flex justify-between text-[10px]">
                {['Jan 4', 'Jan 6', 'Jan 8', 'Jan 10', 'Jan 12', 'Jan 15'].map(label => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
            <div className="border-border bg-card rounded-xl border p-4">
              <p className="font-medium">Device Breakdown</p>
              <p className="text-muted-foreground mt-5 text-sm">Traffic by device type</p>
              <div
                className="mx-auto my-5 size-32 rounded-full"
                style={{
                  background:
                    'conic-gradient(var(--chart-1) 0 42%, var(--chart-2) 42% 70%, var(--chart-3) 70% 84%, var(--chart-4) 84% 94%, var(--chart-5) 94% 100%)'
                }}
              >
                <div className="bg-card m-6 size-20 rounded-full" />
              </div>
              <div className="space-y-1 text-xs">
                {[
                  ['Desktop', '42%'],
                  ['Mobile', '28%'],
                  ['Tablet', '14%'],
                  ['TV', '10%'],
                  ['Other', '6%']
                ].map(([label, value], index) => (
                  <div key={label} className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: `var(--chart-${index + 1})` }}
                      />
                      {label}
                    </span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t p-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              [
                'AI Voice',
                'Easily explore residential and commercial properties featuring comprehensive profiles, stunning images, and immersive virtual tours.',
                'voice'
              ],
              [
                'Performance Indicator',
                'Easily explore or compile residential and commercial properties featuring comprehensive profiles, photos, and virtual walkthroughs.',
                'line'
              ],
              [
                'Sales Analytics',
                'Effortlessly list or browse residential and commercial properties with detailed profiles, images, and virtual tours.',
                'bars'
              ],
              [
                'Fast',
                'Quickly explore and manage residential and commercial properties with comprehensive profiles.',
                'steps'
              ],
              [
                'Task Overview',
                'Effortlessly manage your tasks with a Kanban board, where you can visualize your workflow, prioritize tasks, and track progress.',
                'task'
              ]
            ].map(([title, description, visual]) => (
              <div
                key={title}
                className={`border-border bg-card rounded-xl border p-5 ${visual === 'voice' || visual === 'line' ? 'md:col-span-1 xl:col-span-1' : ''}`}
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-5 text-sm leading-6">{description}</p>
                <div className="mt-6 h-24">
                  {visual === 'voice' && (
                    <div className="flex h-full items-center justify-between px-2">
                      <div className="flex items-center gap-1">
                        {[3, 6, 10, 14, 9, 5].map((height, i) => (
                          <span
                            key={i}
                            className="bg-primary w-1 rounded-full"
                            style={{ height: `${height * 4}px` }}
                          />
                        ))}
                      </div>
                      <div className="bg-muted flex size-16 items-center justify-center rounded-full">
                        <MicIcon className="size-7" />
                      </div>
                      <div className="flex items-center gap-1">
                        {[5, 9, 14, 10, 6, 3].map((height, i) => (
                          <span
                            key={i}
                            className="bg-primary w-1 rounded-full"
                            style={{ height: `${height * 4}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {visual === 'line' && (
                    <svg viewBox="0 0 300 90" className="text-primary h-full w-full">
                      <path
                        d="M5 55 C30 20 38 70 65 30 S105 80 140 25 S185 70 215 35 S250 75 295 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <circle cx="270" cy="38" r="7" fill="currentColor" opacity=".35" />
                    </svg>
                  )}
                  {visual === 'bars' && (
                    <div className="flex h-full items-end justify-around px-2">
                      {[28, 48, 64, 82, 100, 56, 38, 50].map((height, i) => (
                        <span
                          key={i}
                          className={`${i === 4 ? 'bg-primary' : 'bg-muted'} w-7 rounded-t-lg`}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  )}
                  {visual === 'steps' && (
                    <div className="bg-muted space-y-2 rounded-xl p-3 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2Icon className="text-primary size-4" /> Submitted{' '}
                        <span className="text-muted-foreground ml-auto">May 08, 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2Icon className="text-primary size-4" /> Pending
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2">
                        <CircleIcon className="size-4" /> Completed
                      </div>
                    </div>
                  )}
                  {visual === 'task' && (
                    <div className="bg-muted rounded-xl p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Dashboard Design</span>
                        <Badge variant="secondary">In progress</Badge>
                      </div>
                      <p className="text-muted-foreground mt-3 text-xs">16 Jan 2025</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-theme={theme.name} className={dark ? 'dark rounded-2xl' : 'rounded-2xl'}>
      <div
        className={
          compact
            ? 'bg-background text-foreground overflow-hidden'
            : 'border-border bg-background text-foreground overflow-hidden rounded-2xl border shadow-sm'
        }
      >
        <div className="border-border text-muted-foreground flex items-center justify-between border-b px-4 py-2.5 text-[11px]">
          <span className="text-foreground font-medium">{theme.label}</span>
          <span>{dict.themePages.livePreview}</span>
        </div>
        <div className={`grid gap-4 ${compact ? 'gap-3 p-4' : 'p-5 sm:grid-cols-[1.15fr_0.85fr]'}`}>
          <div className={compact ? 'space-y-3' : 'space-y-4'}>
            <div>
              <p className="text-primary text-[10px] font-medium tracking-[0.18em] uppercase">
                Overview
              </p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight">A calmer way to ship.</h3>
              <p className="text-muted-foreground mt-1 max-w-sm text-xs leading-5">
                Semantic tokens, applied with restraint.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="xs">Get started</Button>
              <Button size="xs" variant="outline">
                View activity
              </Button>
            </div>
            <div className="border-border bg-card rounded-xl border p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Release confidence</span>
                <span className="text-muted-foreground">82%</span>
              </div>
              <Progress value={82} className="mt-2" />
            </div>
          </div>
          {compact ? (
            <div className="grid grid-cols-3 gap-2">
              {['Design', 'API', 'Docs'].map(label => (
                <div key={label} className="bg-muted rounded-lg px-2 py-1.5 text-[11px]">
                  <span className="block truncate">{label}</span>
                  <span className="text-primary mt-0.5 flex items-center gap-1 font-medium">
                    <CheckIcon className="size-2.5" /> Ready
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Signals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Design system', 'API surface', 'Documentation'].map((label, index) => (
                  <div
                    key={label}
                    className="bg-muted flex items-center justify-between rounded-lg px-3 py-2 text-sm"
                  >
                    <span>{label}</span>
                    <span className="text-primary flex items-center gap-1 text-xs">
                      <CheckIcon className="size-3.5" /> {index === 2 ? 'Ready' : 'Active'}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export function ThemeCard({
  theme,
  locale,
  dict
}: {
  theme: ThemeCatalogEntry
  locale: string
  dict: Dictionary
}) {
  return (
    <Link href={`/${locale}/themes/${theme.name}`} className="group block">
      <Card className="border-border/80 bg-background group-hover:border-primary/50 h-full gap-0 overflow-hidden p-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="border-border bg-background relative overflow-hidden border-b">
          <ThemePreview theme={theme} dict={dict} compact />
        </div>
        <CardContent className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold tracking-tight">{theme.label}</h2>
              <p className="text-muted-foreground mt-1 text-xs">
                {getCatalogCopy(dict, theme).mood}
              </p>
            </div>
            <ThemeSwatches theme={theme} />
          </div>
          <p className="text-muted-foreground text-sm leading-6">
            {getCatalogCopy(dict, theme).description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

export function ThemeDetail({
  theme,
  locale,
  dict
}: {
  theme: ThemeCatalogEntry
  locale: string
  dict: Dictionary
}) {
  const { resolvedTheme } = useTheme()
  const tokens = [
    ['background', 'Background'],
    ['foreground', 'Foreground'],
    ['card', 'Card'],
    ['card-foreground', 'Card foreground'],
    ['popover', 'Popover'],
    ['popover-foreground', 'Popover foreground'],
    ['primary', 'Primary'],
    ['primary-foreground', 'Primary foreground'],
    ['primary-emphasis', 'Primary emphasis'],
    ['secondary', 'Secondary'],
    ['secondary-foreground', 'Secondary foreground'],
    ['muted', 'Muted'],
    ['muted-foreground', 'Muted foreground'],
    ['accent', 'Accent'],
    ['accent-foreground', 'Accent foreground'],
    ['destructive', 'Destructive'],
    ['destructive-foreground', 'Destructive foreground'],
    ['highlight', 'Highlight'],
    ['highlight-foreground', 'Highlight foreground'],
    ['border', 'Border'],
    ['input', 'Input'],
    ['ring', 'Ring'],
    ['chart-1', 'Chart 1'],
    ['chart-2', 'Chart 2'],
    ['chart-3', 'Chart 3'],
    ['chart-4', 'Chart 4'],
    ['chart-5', 'Chart 5'],
    ['sidebar', 'Sidebar'],
    ['sidebar-foreground', 'Sidebar foreground'],
    ['sidebar-primary', 'Sidebar primary'],
    ['sidebar-primary-foreground', 'Sidebar primary foreground'],
    ['sidebar-accent', 'Sidebar accent'],
    ['sidebar-accent-foreground', 'Sidebar accent foreground'],
    ['sidebar-border', 'Sidebar border'],
    ['sidebar-ring', 'Sidebar ring']
  ] as const

  return (
    <div className="space-y-16">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Link href={`/${locale}/themes`} className="hover:text-foreground transition-colors">
          {dict.nav.themes}
        </Link>
        <span>/</span>
        <span className="text-foreground">{theme.label}</span>
      </div>

      <section className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
        <div className="space-y-6">
          <Badge variant="secondary" className="rounded-full px-3">
            {dict.themePages.builtIn}
          </Badge>
          <div>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">{theme.label}</h1>
            <p className="text-muted-foreground mt-5 max-w-2xl text-xl leading-9">
              {getCatalogCopy(dict, theme).description}
            </p>
          </div>
          <p className="text-muted-foreground max-w-xl text-sm leading-6">
            {getCatalogCopy(dict, theme).mood}. {dict.themePages.detailDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a
                href={`https://github.com/pompeitech/vesuvius-ui/blob/main/packages/ui/src/styles/themes/${theme.name}.css`}
                target="_blank"
                rel="noreferrer"
              >
                {dict.themePages.viewSource} <ArrowUpRightIcon className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${locale}/themes`}>{dict.themePages.viewAll}</Link>
            </Button>
          </div>
        </div>
        <div
          data-theme={theme.name}
          className={`bg-card border-border rounded-2xl border p-5 ${resolvedTheme === 'dark' ? 'dark' : ''}`}
        >
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            {dict.themePages.palette}
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {theme.swatch.map(color => (
              <span
                key={color}
                className="h-20 rounded-xl border border-black/10"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{dict.themePages.primary}</span>
              <code>{theme.primary}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{dict.themePages.secondary}</span>
              <code>{theme.secondary}</code>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-primary text-sm font-medium">{dict.themePages.colorSystem}</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight">
            {dict.themePages.liveTokens}
          </h2>
        </div>
        <div
          data-theme={theme.name}
          className={`grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8 ${resolvedTheme === 'dark' ? 'dark' : ''}`}
        >
          {tokens.map(([token, label]) => (
            <div key={token} className="bg-card border-border rounded-xl border p-3">
              <div
                className="border-border min-h-16 w-full rounded-lg border"
                style={{ background: `var(--${token})` }}
              />
              <p className="mt-3 text-xs font-medium">{label}</p>
              <code className="text-muted-foreground text-[10px]">--{token}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="gap-0 p-0">
          <CardHeader className="border-border border-b p-5">
            <CardTitle>{dict.themePages.typography}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 p-5 sm:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-xs">{dict.themePages.display}</p>
              <p className="mt-2 text-2xl font-semibold">{theme.displayFont}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">{dict.themePages.body}</p>
              <p className="mt-2 text-2xl font-semibold">{theme.bodyFont}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">{dict.themePages.code}</p>
              <p className="mt-2 font-mono text-lg">{theme.monoFont}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="gap-0 p-0">
          <CardHeader className="border-border border-b p-5">
            <CardTitle>{dict.themePages.shapeDepth}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3 p-5">
            <div className="bg-muted rounded-sm p-4 text-center text-xs">sm</div>
            <div className="bg-muted rounded-lg p-4 text-center text-xs">lg</div>
            <div className="bg-muted rounded-xl p-4 text-center text-xs shadow-sm">xl</div>
            <p className="text-muted-foreground col-span-3 text-sm">
              {dict.themePages.shapeDescription}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="border-border bg-muted/40 rounded-2xl border p-5 sm:p-6">
        <p className="text-sm font-medium">
          {dict.themePages.install} {theme.label}
        </p>
        <div className="border-border bg-background text-muted-foreground mt-3 rounded-lg border px-4 py-3 font-mono text-xs">
          <span className="text-primary">@import</span> "@pompeitech/vesuvius-ui/themes/{theme.name}
          .css";
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-primary text-sm font-medium">{dict.themePages.showcase}</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight">
            {dict.themePages.showcaseTitle}
          </h2>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          <div className="xl:col-span-2">
            <ThemePreview theme={theme} dict={dict} dark={resolvedTheme === 'dark'} />
          </div>
        </div>
      </section>
    </div>
  )
}
