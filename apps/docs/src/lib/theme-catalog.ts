export type ThemeCatalogEntry = {
  name: string
  label: string
  description: string
  mood: string
  primary: string
  secondary: string
  swatch: readonly string[]
  displayFont: string
  bodyFont: string
  monoFont: string
}

export const THEME_CATALOG: readonly ThemeCatalogEntry[] = [
  {
    name: 'lava',
    label: 'Lava',
    description: 'Warm volcanic stone, cream surfaces and a burnt-orange action color.',
    mood: 'The flagship Vesuvius palette',
    primary: '#d65a31',
    secondary: '#e9b949',
    swatch: ['#d65a31', '#e9b949', '#f5eadf', '#24201d'],
    displayFont: 'Cal Sans',
    bodyFont: 'Inter',
    monoFont: 'ui-monospace'
  },
  {
    name: 'stripe',
    label: 'Stripe',
    description: 'A white canvas, deep navy ink and a focused violet-blurple action color.',
    mood: 'Financial infrastructure turned product UI',
    primary: '#533afd',
    secondary: '#00a98f',
    swatch: ['#533afd', '#00a98f', '#7a5af8', '#1ea7fd'],
    displayFont: 'sohne-var',
    bodyFont: 'sohne-var',
    monoFont: 'Source Code Pro'
  },
  {
    name: 'vercel',
    label: 'Vercel',
    description: 'Pure black, airy white surfaces and sharp developer-product chrome.',
    mood: 'Aggressively minimal',
    primary: '#000000',
    secondary: '#666666',
    swatch: ['#000000', '#666666', '#999999', '#cccccc'],
    displayFont: 'Inter',
    bodyFont: 'Geist',
    monoFont: 'Geist Mono'
  },
  {
    name: 'supabase',
    label: 'Supabase',
    description: 'Bright emerald-mint energy with friendly technical surfaces.',
    mood: 'Open-source infrastructure with warmth',
    primary: '#16a878',
    secondary: '#3b82f6',
    swatch: ['#16a878', '#3b82f6', '#f59e0b', '#8b5cf6'],
    displayFont: 'Inter',
    bodyFont: 'Inter',
    monoFont: 'ui-monospace'
  },
  {
    name: 'linear',
    label: 'Linear',
    description: 'Restrained cool surfaces with a soft violet-indigo primary.',
    mood: 'Polished issue-tracker calm',
    primary: '#6e78d5',
    secondary: '#2f9e67',
    swatch: ['#6e78d5', '#2f9e67', '#c98927', '#ad67c8'],
    displayFont: 'Inter',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono'
  },
  {
    name: 'claude',
    label: 'Claude',
    description: 'Warm parchment, terracotta heat and scholarly product chrome.',
    mood: 'A reading-room glow for thoughtful products',
    primary: '#c15f3c',
    secondary: '#3f8066',
    swatch: ['#c15f3c', '#3f8066', '#b4772f', '#8b6aa8'],
    displayFont: 'Poppins',
    bodyFont: 'Lora',
    monoFont: 'ui-monospace'
  },
  {
    name: 'amber-minimal',
    label: 'Amber Minimal',
    description: 'A clean white palette with a focused amber-gold primary.',
    mood: 'Quiet surfaces, clear action',
    primary: '#f49f1e',
    secondary: '#15803d',
    swatch: ['#f49f1e', '#15803d', '#2563eb', '#9333ea'],
    displayFont: 'Inter',
    bodyFont: 'Inter',
    monoFont: 'ui-monospace'
  },
  {
    name: 'claymorphism',
    label: 'Claymorphism',
    description: 'Soft dimensional clay surfaces with a bold violet action color.',
    mood: 'Friendly depth without visual noise',
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    swatch: ['#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899'],
    displayFont: 'Plus Jakarta Sans',
    bodyFont: 'Plus Jakarta Sans',
    monoFont: 'Roboto Mono'
  },
  {
    name: 'alpine',
    label: 'Alpine',
    description:
      'Deep alpine-night ink, confident cobalt structure and coral warmth on a blush canvas.',
    mood: 'A premium SaaS palette with a pulse',
    primary: '#3158d9',
    secondary: '#f07b68',
    swatch: ['#3158d9', '#f07b68', '#e9a9b5', '#5b7ce2'],
    displayFont: 'Montserrat',
    bodyFont: 'Montserrat',
    monoFont: 'Fira Code'
  },
  {
    name: 'aubergine',
    label: 'Aubergine',
    description:
      'Slack-inspired aubergine navigation, expressive violet surfaces and bright blue actions.',
    mood: 'Collaborative energy with a friendly edge',
    primary: '#1264a3',
    secondary: '#611f69',
    swatch: ['#3f0e40', '#611f69', '#1264a3', '#36c5f0'],
    displayFont: 'Slack-Lato, Lato',
    bodyFont: 'Slack-Lato, Lato',
    monoFont: 'ui-monospace'
  }
]

export function getThemeCatalogEntry(name: string) {
  return THEME_CATALOG.find(theme => theme.name === name)
}
