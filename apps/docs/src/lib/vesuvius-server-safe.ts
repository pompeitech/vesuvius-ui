// A handful of Vesuvius exports are plain, side-effect-free functions (cva
// variant helpers, mostly) that content calls directly as a JS expression
// — `className={navigationMenuTriggerStyle()}` — rather than rendering as
// a JSX component. `vesuvius-client.ts`'s whole barrel is client-boundary
// only (see its own comment), and a client-boundary *function* (unlike a
// component) can't be invoked synchronously from server code — React
// throws "Attempted to call X() from the server but X is on the client."
// These have zero React/hook dependency in their own source files (just
// `cva()` from class-variance-authority), so importing them directly from
// packages/ui's *source* — bypassing the bundled dist/index.js barrel
// entirely — sidesteps the client-boundary requirement altogether. Add to
// this file as new pages need another `*Variants`/style-helper function
// called live in content; components (anything used as `<Tag/>`) never
// need this, only bare function calls do.
export { navigationMenuTriggerStyle } from '../../../../packages/ui/src/molecules/navigation-menu/navigation-menu.variants'

// `z` (zod) needs to be in scope for any live Form demo that builds a
// schema inline (`z.object({...})`) — it's plain JS, no client boundary
// issue, so a direct package import is enough.
export { z } from 'zod'
