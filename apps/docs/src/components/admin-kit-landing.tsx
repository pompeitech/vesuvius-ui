'use client'

import { Badge, Button, Card } from '@pompeitech/vesuvius-ui'
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Download,
  KanbanSquare,
  LayoutDashboard,
  Play,
  Sparkles,
  Users,
  WalletCards
} from 'lucide-react'
import { useState } from 'react'

const previewHref = 'https://vesuvius-ui-admin-kit.vercel.app'
const downloadHref = 'https://github.com/pompeitech/vesuvius-ui/archive/refs/heads/main.zip'

type Showcase = {
  id: string
  eyebrow: string
  title: string
  description: string
  icon: typeof LayoutDashboard
  tone: string
}

function getShowcases(isEnglish: boolean): Showcase[] {
  return [
    {
      id: 'dashboards',
      eyebrow: isEnglish ? '01 · Executive dashboards' : '01 · Dashboard executive',
      title: isEnglish ? 'Numbers that tell a story.' : 'Numeri che raccontano una storia.',
      description: isEnglish
        ? 'KPIs, revenue, conversions and trends already laid out so you can ship a credible dashboard from the first commit.'
        : 'KPI, revenue, conversioni e trend già impaginati per partire da una dashboard credibile al primo commit.',
      icon: LayoutDashboard,
      tone: 'from-orange-500/30 via-orange-500/5 to-transparent'
    },
    {
      id: 'kanban',
      eyebrow: isEnglish ? '02 · Project management' : '02 · Project management',
      title: isEnglish
        ? 'From backlog to done, without friction.'
        : 'Dal backlog al “done” senza attrito.',
      description: isEnglish
        ? 'A dense but readable Kanban with drag and drop, filters and states designed for teams that do real work.'
        : 'Kanban denso ma leggibile, drag & drop, filtri e stati pensati per team che lavorano davvero.',
      icon: KanbanSquare,
      tone: 'from-cyan-400/25 via-cyan-400/5 to-transparent'
    },
    {
      id: 'ecommerce',
      eyebrow: isEnglish ? '03 · Commerce operations' : '03 · Commerce operations',
      title: isEnglish
        ? 'Catalog, orders and logistics in one system.'
        : 'Catalogo, ordini e logistica in un unico sistema.',
      description: isEnglish
        ? 'Complete ecommerce flows with operational tables, statuses, detail views and forms ready to adapt.'
        : 'Flussi ecommerce completi, con tabelle operative, stati, dettagli e form pronti per essere adattati.',
      icon: WalletCards,
      tone: 'from-violet-400/25 via-violet-400/5 to-transparent'
    },
    {
      id: 'people',
      eyebrow: isEnglish ? '04 · People & HR' : '04 · People & HR',
      title: isEnglish
        ? 'Put people at the heart of the workspace.'
        : 'Le persone al centro del workspace.',
      description: isEnglish
        ? 'Directories, attendance, requests and profiles with clear visual hierarchies and reusable components.'
        : 'Directory, presenze, richieste e profili con gerarchie visive chiare e componenti riutilizzabili.',
      icon: Users,
      tone: 'from-emerald-400/25 via-emerald-400/5 to-transparent'
    }
  ]
}

function MiniBars() {
  return (
    <div className="flex h-28 items-end gap-2 px-2">
      {[38, 56, 44, 72, 61, 88, 76, 98, 83, 110, 92, 118].map((height, index) => (
        <div
          key={index}
          className="from-primary to-primary/40 flex-1 rounded-t-sm bg-gradient-to-t"
          style={{ height }}
        />
      ))}
    </div>
  )
}

function DashboardScreen({ isEnglish }: { isEnglish: boolean }) {
  return (
    <div className="grid h-full gap-3 p-4 md:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            ['Revenue', '$284.6k', '+18.4%'],
            ['Orders', '2,481', '+12.8%'],
            ['Customers', '18.2k', '+8.1%']
          ].map(([label, value, trend]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-3">
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/45">{label}</p>
              <p className="mt-2 text-sm font-semibold text-white">{value}</p>
              <p className="mt-1 text-[9px] text-emerald-300">{trend}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-white/80">
                {isEnglish ? 'Revenue overview' : 'Andamento revenue'}
              </p>
              <p className="mt-1 text-[9px] text-white/40">
                {isEnglish ? 'Last 12 months' : 'Ultimi 12 mesi'}
              </p>
            </div>
            <span className="rounded-full border border-white/10 px-2 py-1 text-[9px] text-white/50">
              2026 <ChevronDown className="ml-1 inline size-3" />
            </span>
          </div>
          <MiniBars />
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium text-white/80">
              {isEnglish ? 'Recent activity' : 'Attività recenti'}
            </p>
            <span className="size-2 rounded-full bg-emerald-400" />
          </div>
          {(isEnglish
            ? ['Order #1048 paid', 'New team member', 'Campaign launched']
            : ['Ordine #1048 pagato', 'Nuovo membro del team', 'Campagna lanciata']
          ).map((item, index) => (
            <div key={item} className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
              <span className="flex size-5 items-center justify-center rounded-full bg-white/10 text-[8px] text-white/70">
                {index + 1}
              </span>
              <span className="text-[9px] text-white/60">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/10 p-3">
          <p className="text-[9px] uppercase tracking-[0.18em] text-primary-foreground/60">
            {isEnglish ? 'Conversion' : 'Conversione'}
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">4.82%</p>
          <div className="mt-3 h-1.5 rounded-full bg-white/10">
            <div className="h-full w-3/4 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

function KanbanScreen({ isEnglish }: { isEnglish: boolean }) {
  const columns = [
    [
      isEnglish ? 'Backlog' : 'Backlog',
      isEnglish
        ? ['Audit navigation', 'Research pricing']
        : ['Audit navigazione', 'Ricerca pricing']
    ],
    [
      isEnglish ? 'In progress' : 'In corso',
      isEnglish ? ['New dashboard', 'Mobile filters'] : ['Nuova dashboard', 'Filtri mobile']
    ],
    [
      isEnglish ? 'Done' : 'Completato',
      isEnglish ? ['Release notes', 'Theme tokens'] : ['Note di rilascio', 'Token del tema']
    ]
  ] as const
  return (
    <div className="grid h-full grid-cols-3 gap-3 p-4">
      {columns.map(([title, cards], columnIndex) => (
        <div key={title} className="min-w-0 rounded-lg bg-white/[0.04] p-2">
          <div className="flex items-center justify-between px-1 py-2">
            <span className="text-[10px] font-medium text-white/70">{title}</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-white/45">
              {cards.length}
            </span>
          </div>
          {cards.map((card, cardIndex) => (
            <div
              key={card}
              className="mb-2 rounded-md border border-white/10 bg-[#1b202b] p-2.5 shadow-lg"
            >
              <div className="mb-3 h-1 w-8 rounded-full bg-primary/80" />
              <p className="text-[10px] leading-4 text-white/80">{card}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[8px] text-white/35">
                  #{columnIndex + 1}0{cardIndex + 3}
                </span>
                <span className="flex -space-x-1">
                  <span className="size-4 rounded-full border border-[#1b202b] bg-orange-300" />
                  <span className="size-4 rounded-full border border-[#1b202b] bg-cyan-300" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function EcommerceScreen({ isEnglish }: { isEnglish: boolean }) {
  return (
    <div className="h-full p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium text-white/80">{isEnglish ? 'Orders' : 'Ordini'}</p>
          <p className="mt-1 text-[9px] text-white/40">
            {isEnglish ? 'Manage your latest transactions' : 'Gestisci le ultime transazioni'}
          </p>
        </div>
        <span className="rounded-md bg-primary px-2.5 py-1.5 text-[9px] font-medium text-white">
          {isEnglish ? 'Export CSV' : 'Esporta CSV'}
        </span>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10">
        {[
          ['#1048', 'Maya Chen', '$2,840.00', isEnglish ? 'Paid' : 'Pagato'],
          ['#1047', 'Noah Williams', '$1,280.50', isEnglish ? 'Processing' : 'In elaborazione'],
          ['#1046', 'Sofia Rossi', '$820.00', isEnglish ? 'Paid' : 'Pagato'],
          ['#1045', 'Ethan Brown', '$4,120.90', isEnglish ? 'Refunded' : 'Rimborsato']
        ].map(([id, name, amount, status]) => (
          <div
            key={id}
            className="grid grid-cols-[0.7fr_1.5fr_1fr_0.9fr] border-b border-white/10 px-3 py-3 last:border-0"
          >
            <span className="text-[9px] text-white/45">{id}</span>
            <span className="text-[9px] text-white/75">{name}</span>
            <span className="text-[9px] text-white/60">{amount}</span>
            <span className="text-[9px] text-emerald-300">{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PeopleScreen({ isEnglish }: { isEnglish: boolean }) {
  return (
    <div className="grid h-full gap-3 p-4 md:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
        <p className="text-[10px] font-medium text-white/80">
          {isEnglish ? 'People overview' : 'Panoramica persone'}
        </p>
        <div className="mt-5 flex items-center justify-center">
          <div className="flex size-28 items-center justify-center rounded-full border-[14px] border-primary/80 border-r-white/10 border-b-white/10">
            <span className="text-2xl font-semibold text-white">86%</span>
          </div>
        </div>
        <p className="mt-4 text-center text-[9px] text-white/40">
          {isEnglish ? 'Attendance this month' : 'Presenze questo mese'}
        </p>
      </div>
      <div className="space-y-2">
        {[
          ['Maya Chen', isEnglish ? 'Product designer' : 'Product designer', 'MC', 'bg-orange-300'],
          [
            'Noah Williams',
            isEnglish ? 'Frontend engineer' : 'Frontend engineer',
            'NW',
            'bg-cyan-300'
          ],
          [
            'Sofia Rossi',
            isEnglish ? 'People operations' : 'People operations',
            'SR',
            'bg-violet-300'
          ]
        ].map(([name, role, initials, color]) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3"
          >
            <span
              className={`flex size-8 items-center justify-center rounded-full text-[9px] font-semibold text-slate-900 ${color}`}
            >
              {initials}
            </span>
            <span>
              <span className="block text-[10px] text-white/80">{name}</span>
              <span className="mt-1 block text-[9px] text-white/40">{role}</span>
            </span>
            <span className="ml-auto size-2 rounded-full bg-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Screen({ id, isEnglish }: { id: string; isEnglish: boolean }) {
  if (id === 'kanban') return <KanbanScreen isEnglish={isEnglish} />
  if (id === 'ecommerce') return <EcommerceScreen isEnglish={isEnglish} />
  if (id === 'people') return <PeopleScreen isEnglish={isEnglish} />
  return <DashboardScreen isEnglish={isEnglish} />
}

export function AdminKitLanding({ locale }: { locale: string }) {
  const isEnglish = locale === 'en'
  const showcases = getShowcases(isEnglish)
  const copy = isEnglish
    ? {
      heroTitle: 'Your next admin panel, already off the charts.',
      heroDescription:
        'A complete React application kit for building dashboards, ecommerce experiences and operational workspaces with product-grade quality.',
      preview: 'Open live preview',
      download: 'Download Admin Kit',
      features: ['React + TypeScript', 'Tailwind v4', 'Dark mode', '10 themes'],
      builtFor: 'Built for momentum',
      seriousStart: 'Not a template. A serious starting point.',
      seriousDescription:
        'Every area is designed like a product: hierarchy, states, empty states, tables and actions that hold up from demo day to daily work.',
      explore: 'Explore section',
      ready: 'Ready when you are',
      finalTitle: 'Take your next product beyond the usual CRUD.',
      finalDescription:
        'See the app in action, then download the kit and start composing your own experience.',
      goPreview: 'Go to preview',
      shipsWith: 'Ships with',
      screens: '24+ production screens'
    }
    : {
      heroTitle: 'Il tuo prossimo admin panel, già fuori scala.',
      heroDescription:
        'Un application kit React completo per costruire dashboard, ecommerce e workspace operativi con una qualità da prodotto finito.',
      preview: 'Apri la live preview',
      download: 'Scarica Admin Kit',
      features: ['React + TypeScript', 'Tailwind v4', 'Dark mode', '10 temi'],
      builtFor: 'Built for momentum',
      seriousStart: 'Non è un template. È un punto di partenza serio.',
      seriousDescription:
        'Ogni area è pensata come un prodotto: gerarchia, stati, empty states, tabelle e azioni che reggono il passaggio dalla demo al lavoro quotidiano.',
      explore: 'Esplora sezione',
      ready: 'Ready when you are',
      finalTitle: 'Porta il tuo prossimo prodotto oltre il solito CRUD.',
      finalDescription:
        'Guarda l’app in azione, poi scarica il kit e inizia a comporre la tua esperienza.',
      goPreview: 'Vai alla preview',
      shipsWith: 'Ships with',
      screens: '24+ production screens'
    }
  const [active, setActive] = useState('dashboards')
  const activeShowcase = showcases.find(showcase => showcase.id === active) ?? showcases[0]!
  const Icon = activeShowcase.icon

  return (
    <main className="overflow-hidden">
      <section className="relative isolate border-b px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_10%,color-mix(in_oklch,var(--primary)_24%,transparent),transparent_34%),radial-gradient(circle_at_10%_60%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_28%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Badge variant="outline" className="mb-6 gap-2 rounded-full px-3 py-1">
              <Sparkles className="size-3.5 text-primary" /> Vesuvius Admin Kit
            </Badge>
            <h1 className="max-w-3xl text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              {copy.heroTitle}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8 sm:text-xl">
              {copy.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href={previewHref} target="_blank" rel="noreferrer">
                  <Play className="size-4" /> {copy.preview}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={downloadHref} target="_blank" rel="noreferrer">
                  <Download className="size-4" /> {copy.download}
                </a>
              </Button>
            </div>
            <div className="text-muted-foreground mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {copy.features.map(item => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="size-4 text-primary" /> {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-full bg-primary/15 blur-3xl" />
            <div className="border-foreground/10 bg-[#11151e] shadow-2xl shadow-primary/10 rounded-2xl border p-2 ring-1 ring-white/5">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-3 pb-3 pt-1">
                <span className="size-2.5 rounded-full bg-red-400/80" />
                <span className="size-2.5 rounded-full bg-yellow-300/80" />
                <span className="size-2.5 rounded-full bg-green-400/80" />
                <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-[9px] text-white/35">
                  admin.vesuvius.local
                </span>
              </div>
              <div className="grid min-h-[340px] grid-cols-[52px_1fr] overflow-hidden rounded-xl bg-[#151a24] sm:min-h-[430px]">
                <aside className="border-r border-white/10 bg-[#0e121a] p-3">
                  <div className="mb-8 flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-black text-white">
                    V
                  </div>
                  <div className="space-y-3">
                    {[BarChart3, KanbanSquare, Users, WalletCards].map((Item, index) => (
                      <div
                        key={index}
                        className={`flex size-7 items-center justify-center rounded-md ${index === 0 ? 'bg-primary/20 text-primary' : 'text-white/25'}`}
                      >
                        <Item className="size-3.5" />
                      </div>
                    ))}
                  </div>
                </aside>
                <div className="min-w-0">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <div>
                      <p className="text-[9px] text-white/40">
                        {isEnglish ? 'Workspace / Overview' : 'Workspace / Panoramica'}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-white">
                        {isEnglish ? 'Good morning, Alex' : 'Buongiorno, Alex'}
                      </p>
                    </div>
                    <div className="size-7 rounded-full bg-orange-300" />
                  </div>
                  <DashboardScreen isEnglish={isEnglish} />
                </div>
              </div>
            </div>
            <div className="bg-background absolute -bottom-5 -left-4 rounded-xl border p-3 shadow-xl sm:-left-8">
              <p className="text-muted-foreground text-[10px] uppercase tracking-[0.18em]">
                {copy.shipsWith}
              </p>
              <p className="mt-1 text-sm font-bold">{copy.screens}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.22em]">
            {copy.builtFor}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            {copy.seriousStart}
          </h2>
          <p className="text-muted-foreground mt-5 text-lg leading-8">{copy.seriousDescription}</p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.32fr_0.68fr]">
          <div className="flex gap-2 overflow-x-auto lg:block lg:space-y-2">
            {showcases.map(showcase => {
              const ItemIcon = showcase.icon
              const isActive = active === showcase.id
              return (
                <button
                  key={showcase.id}
                  type="button"
                  onClick={() => setActive(showcase.id)}
                  className={`min-w-[190px] rounded-xl border p-4 text-left transition-all lg:min-w-0 ${isActive ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10' : 'hover:bg-muted/50 border-border'}`}
                >
                  <ItemIcon
                    className={`size-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                  />
                  <p className="mt-6 text-sm font-semibold">{showcase.eyebrow.split(' · ')[1]}</p>
                  <p className="text-muted-foreground mt-1 text-xs leading-5">{copy.explore}</p>
                </button>
              )
            })}
          </div>
          <Card
            className={`overflow-hidden border-0 bg-gradient-to-br ${activeShowcase.tone} p-0 shadow-2xl`}
          >
            <div className="bg-[#10151f] p-5 sm:p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
                    {activeShowcase.eyebrow}
                  </p>
                  <h3 className="mt-3 max-w-lg text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {activeShowcase.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
                    {activeShowcase.description}
                  </p>
                </div>
                <Icon className="hidden size-7 shrink-0 text-white/40 sm:block" />
              </div>
              <div className="min-h-[300px] overflow-hidden rounded-xl border border-white/10 bg-[#151a24] shadow-inner sm:min-h-[360px]">
                <Screen id={activeShowcase.id} isEnglish={isEnglish} />
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="border-y bg-muted/20 px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.22em]">
              {copy.ready}
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
              {copy.finalTitle}
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-8">
              {copy.finalDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button size="lg" asChild>
              <a href={previewHref} target="_blank" rel="noreferrer">
                {copy.goPreview} <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={downloadHref} target="_blank" rel="noreferrer">
                Download <Download className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
