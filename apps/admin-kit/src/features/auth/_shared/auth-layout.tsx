import { ThemeModeToggle, Toaster, Typography } from '@pompeitech/vesuvius-ui'
import { CheckIcon, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import logoOnDark from '../../../assets/images/vesuvio-ui-logo-on-dark.svg'

type Highlight = { icon: LucideIcon; label: string }

type AuthLayoutProps = {
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}

const HIGHLIGHTS: Highlight[] = [
  {
    icon: CheckIcon,
    label: 'Ecommerce, Project Management, and HR in one workspace'
  },
  {
    icon: CheckIcon,
    label: 'Live dashboards, Kanban boards, and a real shipment tracker'
  },
  {
    icon: CheckIcon,
    label: 'One login for the whole admin — no juggling separate tools'
  }
]

export function AuthLayout({ title, description, children, footer }: AuthLayoutProps) {
  return (
    <>
      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-[#1a1512] via-[#241a14] to-[#3a1f12] p-10 text-white lg:flex">
          <img src={logoOnDark} alt="Vesuvio UI" className="h-[150px] w-auto" />

          <div className="flex flex-col gap-8">
            <Typography as="p" variant="h2" className="max-w-md text-white">
              Run your whole business from one dashboard.
            </Typography>
            <ul className="flex flex-col gap-4">
              {HIGHLIGHTS.map(highlight => (
                <li key={highlight.label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <highlight.icon className="size-3.5" />
                  </span>
                  <span className="text-sm text-white/80">{highlight.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <Typography variant="muted" className="text-white/50">
            © {new Date().getFullYear()} Pompeitech. All rights reserved.
          </Typography>
        </div>

        <div className="relative flex flex-col items-center justify-center gap-8 px-6 py-12">
          <div className="absolute top-6 right-6">
            <ThemeModeToggle />
          </div>

          <div className="flex w-full max-w-sm flex-col gap-8">
            <div className="flex flex-col gap-2 text-center lg:text-left">
              <Typography as="h1" variant="h3">
                {title}
              </Typography>
              <Typography variant="muted">{description}</Typography>
            </div>

            {children}

            {footer}
          </div>
        </div>
      </div>

      <Toaster />
    </>
  )
}
