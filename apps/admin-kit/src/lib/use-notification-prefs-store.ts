import { usePersistedState } from './use-persisted-state'

export type NotifyScope = 'all' | 'direct' | 'none'

export type NotificationPrefs = {
  notifyScope: NotifyScope
  communicationEmails: boolean
  marketingEmails: boolean
  socialEmails: boolean
  securityEmails: boolean
  differentMobileSettings: boolean
}

const NOTIFICATION_PREFS_STORAGE_KEY = 'vesuvius-account:notifications'

const DEFAULT_NOTIFICATION_PREFS: NotificationPrefs = {
  notifyScope: 'all',
  communicationEmails: true,
  marketingEmails: false,
  socialEmails: false,
  securityEmails: true,
  differentMobileSettings: false
}

/** Notification preferences for the Account Settings > Notifications page — persisted so a choice survives a refresh, same `usePersistedState` pattern as the profile store. */
export function useNotificationPrefsStore() {
  return usePersistedState<NotificationPrefs>(
    NOTIFICATION_PREFS_STORAGE_KEY,
    DEFAULT_NOTIFICATION_PREFS
  )
}
