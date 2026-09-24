import { describe, expect, test } from 'vitest'
import { DEFAULT_CHART_COLORS, slugifyChartKey } from '@ui/organisms/charts/chart-utils'

describe('chart-utils', () => {
  test('DEFAULT_CHART_COLORS exposes five theme-token colors', () => {
    expect(DEFAULT_CHART_COLORS).toHaveLength(5)
    expect(DEFAULT_CHART_COLORS[0]).toBe('var(--chart-1)')
  })

  test('slugifyChartKey normalizes arbitrary labels into CSS-safe keys', () => {
    expect(slugifyChartKey('Total Revenue')).toBe('total-revenue')
    expect(slugifyChartKey('  Spaces  ')).toBe('spaces')
    expect(slugifyChartKey('100% Done!')).toBe('100-done')
  })

  test('slugifyChartKey falls back to "value" for an empty/symbol-only input', () => {
    expect(slugifyChartKey('!!!')).toBe('value')
    expect(slugifyChartKey('')).toBe('value')
  })
})
