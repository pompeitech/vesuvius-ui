export type ThemeSwatch = readonly [string, string, string, string]

export const DEFAULT_THEME_SWATCHES: Record<string, ThemeSwatch> = {
  lava: [
    'oklch(0.620 0.166 38.218)',
    'oklch(0.744 0.125 77.154)',
    'oklch(0.530 0.168 29.503)',
    'oklch(0.62 0.09 58)'
  ],
  stripe: ['#533afd', '#00a98f', '#7a5af8', '#1ea7fd'],
  vercel: ['#000000', '#666666', '#999999', '#cccccc'],
  supabase: ['#71e1ac', '#3b82f6', '#f59e0b', '#8b5cf6'],
  linear: ['#6e78d5', '#2f9e67', '#c98927', '#ad67c8'],
  claude: ['#c15f3c', '#3f8066', '#b4772f', '#8b6aa8'],
  'amber-minimal': ['#f49f1e', '#15803d', '#2563eb', '#9333ea'],
  claymorphism: ['#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899'],
  alpine: ['#3158d9', '#f07b68', '#e9a9b5', '#5b7ce2'],
  aubergine: ['#3f0e40', '#611f69', '#1264a3', '#36c5f0']
}

export const FALLBACK_THEME_SWATCH: ThemeSwatch = [
  'var(--muted)',
  'var(--muted)',
  'var(--muted)',
  'var(--muted)'
]

export function formatThemeName(theme: string) {
  const labels: Record<string, string> = {
    lava: 'Lava',
    stripe: 'Stripe',
    vercel: 'Vercel',
    supabase: 'Supabase',
    linear: 'Linear',
    claude: 'Claude',
    'amber-minimal': 'Amber Minimal',
    claymorphism: 'Claymorphism',
    alpine: 'Alpine',
    aubergine: 'Aubergine'
  }
  if (labels[theme]) return labels[theme]

  return theme
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
