import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@pompeitech/vesuvius-ui'
import { HomeIcon } from 'lucide-react'
import { Fragment } from 'react'
import { Link, useMatches } from 'react-router'
import type { BreadcrumbTrail } from './breadcrumb.types'

/** Always the first crumb — every route trail in `router.tsx` starts after it. */
const HOME_ENTRY = { label: 'Home', href: '/' }

/**
 * Renders the current route's breadcrumb trail from its `handle.breadcrumb`
 * (set per route in `router.tsx` — the single, centralized source of truth
 * for the whole trail, not just the leaf label). Every route under the
 * dashboard shell defines one, so this always has something to show; a
 * route that forgets to set `handle.breadcrumb` just renders "Home" alone
 * rather than throwing.
 *
 * One component, reused by `DashboardHeader` on every page — this is the
 * only place that turns route data into breadcrumb markup.
 */
export function DashboardBreadcrumbs() {
  const matches = useMatches()
  const trail: BreadcrumbTrail =
    (matches.at(-1)?.handle as { breadcrumb?: BreadcrumbTrail } | undefined)?.breadcrumb ?? []
  const entries = [HOME_ENTRY, ...trail]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1
          return (
            <Fragment key={`${entry.label}-${index}`}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast || !entry.href ? (
                  <BreadcrumbPage>
                    {index === 0 ? <HomeIcon className="size-3.5" /> : entry.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={entry.href}>
                      {index === 0 ? <HomeIcon className="size-3.5" /> : entry.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
