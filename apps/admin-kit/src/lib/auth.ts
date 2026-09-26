const AUTH_STORAGE_KEY = 'vesuvius-auth:session'

/**
 * Whether there's a simulated signed-in session — this app has no real
 * backend, so "logged in" is just a flag in `localStorage`. Plain functions
 * rather than a hook: `root-layout.tsx`'s route `loader()` (and the Login/
 * Signup pages' own loaders) need to read this outside of React render,
 * where hooks can't run. Reads/writes are wrapped defensively, same
 * principle as `usePersistedState` — a private-browsing tab or
 * storage-disabled browser just always renders the signed-out state.
 */
export function isAuthenticated(): boolean {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function setAuthenticated(value: boolean): void {
  try {
    if (value) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  } catch {
    // Ignore — see the doc comment above.
  }
}
