// Feature: blog-theme-redesign, Property 10: Body text contrast ratio meets WCAG AA
// Feature: blog-theme-redesign, Property 11: Large text contrast ratio meets WCAG AA

import * as fc from 'fast-check'
import { describe, it, expect } from 'vitest'

// ---------------------------------------------------------------------------
// WCAG relative luminance helpers
// ---------------------------------------------------------------------------

/**
 * Convert a single 8-bit sRGB channel value (0–255) to its linear-light
 * representation as defined by the WCAG 2.1 relative luminance formula.
 */
function linearize(channel8bit: number): number {
  const c = channel8bit / 255
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

/**
 * Parse a 6-digit hex color string (e.g. "#FAF3E1") into its [R, G, B]
 * components as integers in the range 0–255.
 */
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return [r, g, b]
}

/**
 * Compute the WCAG 2.1 relative luminance of a hex color.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

/**
 * Compute the WCAG 2.1 contrast ratio between a foreground and background
 * hex color.  The ratio is always ≥ 1 (lighter color is always the numerator).
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function wcagContrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// ---------------------------------------------------------------------------
// Brand palette
// ---------------------------------------------------------------------------

const CREAM = '#FAF3E1' // light mode background / dark mode foreground
const INK = '#1E1E23' // light mode foreground / dark mode background

// ---------------------------------------------------------------------------
// Color pairs used for text rendering
// ---------------------------------------------------------------------------

/** Pairs used for body text (≥18px regular or ≥14px bold) — must meet 4.5:1 */
const BODY_TEXT_PAIRS: Array<{ label: string; fg: string; bg: string }> = [
  { label: 'light mode — ink on cream', fg: INK, bg: CREAM },
  { label: 'dark mode — cream on ink', fg: CREAM, bg: INK },
]

/** Pairs used for large text (≥24px regular or ≥18.67px bold) — must meet 3:1 */
const LARGE_TEXT_PAIRS: Array<{ label: string; fg: string; bg: string }> = [
  { label: 'light mode — ink on cream', fg: INK, bg: CREAM },
  { label: 'dark mode — cream on ink', fg: CREAM, bg: INK },
]

// ---------------------------------------------------------------------------
// Property 10: Body text contrast ratio meets WCAG AA (≥ 4.5:1)
// Validates: Requirements 11.1
// ---------------------------------------------------------------------------

describe('Property 10: Body text contrast ratio meets WCAG AA', () => {
  it('every body-text color pair from the brand palette has a contrast ratio ≥ 4.5:1', () => {
    // Use fc.constantFrom to iterate over all fixed pairs via fast-check
    fc.assert(
      fc.property(fc.constantFrom(...BODY_TEXT_PAIRS), (pair) => {
        const ratio = wcagContrastRatio(pair.fg, pair.bg)
        expect(ratio).toBeGreaterThanOrEqual(4.5)
      }),
      { numRuns: BODY_TEXT_PAIRS.length },
    )
  })
})

// ---------------------------------------------------------------------------
// Property 11: Large text contrast ratio meets WCAG AA (≥ 3:1)
// Validates: Requirements 11.2
// ---------------------------------------------------------------------------

describe('Property 11: Large text contrast ratio meets WCAG AA', () => {
  it('every large-text color pair from the brand palette has a contrast ratio ≥ 3:1', () => {
    // Use fc.constantFrom to iterate over all fixed pairs via fast-check
    fc.assert(
      fc.property(fc.constantFrom(...LARGE_TEXT_PAIRS), (pair) => {
        const ratio = wcagContrastRatio(pair.fg, pair.bg)
        expect(ratio).toBeGreaterThanOrEqual(3)
      }),
      { numRuns: LARGE_TEXT_PAIRS.length },
    )
  })
})
