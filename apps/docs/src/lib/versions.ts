// The design system has one real version right now — content lives under
// `content/<locale>/docs/**` directly, not `content/<locale>/<version>/docs/**`,
// to avoid an unused directory layer. When a second version is actually
// needed, this is the one seam to widen: add a `version` segment to the
// content path helpers in `content.ts` and to the route
// (`app/[locale]/docs/[[...slug]]` → `app/[locale]/[version]/docs/[[...slug]]`),
// and turn `<VersionSwitcher>` on in the header (it renders nothing while
// VERSIONS.length is 1).
export const VERSIONS = ['latest'] as const
export type Version = (typeof VERSIONS)[number]
export const CURRENT_VERSION: Version = 'latest'
export const VERSION_LABELS: Record<Version, string> = {
  latest: 'v0.1 (latest)'
}
