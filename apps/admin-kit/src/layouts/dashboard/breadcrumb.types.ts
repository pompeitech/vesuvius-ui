/**
 * One step in a page's breadcrumb trail. `href` is omitted for the current
 * page (the last entry) — see `DashboardBreadcrumbs`, which renders it as
 * non-interactive text instead of a link.
 */
export type BreadcrumbEntry = {
  label: string
  href?: string
}

/** A full trail, root-to-leaf, set per route via `handle.breadcrumb` in `router.tsx`. */
export type BreadcrumbTrail = BreadcrumbEntry[]
