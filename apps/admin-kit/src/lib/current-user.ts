/**
 * Stand-in for the signed-in admin — this app has no auth, so every page
 * that needs "who's logged in" (the sidebar account menu, ecommerce
 * dashboard greetings, ...) reads from this one place instead of hardcoding
 * a name in each of them.
 */
export const CURRENT_USER = {
  name: 'Maya Torres',
  email: 'maya@vesuvius.dev'
}
