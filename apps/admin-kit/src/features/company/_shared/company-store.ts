import { COMPANY, type Company } from '@pompeitech/mock-data'
import { usePersistedState } from '../../../lib/use-persisted-state'

export const COMPANY_STORAGE_KEY = 'vesuvius-company:profile'

/** The single company record, editable on the Company Profile settings page and persisted the same way the Attendance Policy is. */
export function useCompanyStore() {
  return usePersistedState<Company>(COMPANY_STORAGE_KEY, COMPANY)
}
