import { usePersistedState } from './use-persisted-state'
import { CURRENT_USER } from './current-user'

export type CurrentUserProfile = {
  name: string
  email: string
  phone: string
  jobTitle: string
  bio: string
  timezone: string
}

const CURRENT_USER_STORAGE_KEY = 'vesuvius-account:profile'

const DEFAULT_PROFILE: CurrentUserProfile = {
  name: CURRENT_USER.name,
  email: CURRENT_USER.email,
  phone: '',
  jobTitle: '',
  bio: '',
  timezone: 'Europe/Rome'
}

/**
 * The signed-in user's editable profile, same "single record, editable on
 * its own settings page, persisted since there's no real backend" pattern
 * as `useCompanyStore`. Deliberately separate from the static `CURRENT_USER`
 * constant (`current-user.ts`) rather than replacing it: `CURRENT_USER` has
 * several other read-only consumers app-wide (dashboard greetings, Time
 * Clock, Inbox, ...) that don't need to re-render on a profile edit — only
 * the account menu and the Account Settings pages need the live version.
 */
export function useCurrentUserStore() {
  return usePersistedState<CurrentUserProfile>(CURRENT_USER_STORAGE_KEY, DEFAULT_PROFILE)
}
