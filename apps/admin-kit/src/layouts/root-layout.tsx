import { redirect } from 'react-router'
import { isAuthenticated } from '../lib/auth'
import { DashboardLayout } from './dashboard/dashboard-layout'

/** Gates the whole dashboard shell behind the simulated session — see `lib/auth.ts`. Runs as a route `loader` (same idiom every other page in this kit already uses) rather than a render-time check, so it re-evaluates on every navigation into the shell. */
export async function loader() {
  if (!isAuthenticated()) {
    return redirect('/login')
  }
  return null
}

export function Component() {
  return <DashboardLayout />
}
