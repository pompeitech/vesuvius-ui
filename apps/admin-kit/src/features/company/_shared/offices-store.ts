import { OFFICES, officeLocationLabel, type Office } from '@pompeitech/mock-data'
import { usePersistedState } from '../../../lib/use-persisted-state'

export const OFFICES_STORAGE_KEY = 'vesuvius-company:offices'

/**
 * The company's list of offices — managed on the Offices settings page and
 * persisted the same way the Attendance Policy is. The Time Clock page
 * reads this same list for its "Assigned to" picker and geofencing, so
 * adding/editing an office here actually changes what that page offers.
 */
export function useOfficesStore() {
  return usePersistedState<Office[]>(OFFICES_STORAGE_KEY, OFFICES)
}

export { officeLocationLabel }
