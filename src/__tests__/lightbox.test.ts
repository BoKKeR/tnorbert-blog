import * as fc from 'fast-check'
import { describe, it, expect } from 'vitest'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { extractCaption, prevIndex, nextIndex } from '@/components/Lightbox/helpers'

// ── extractCaption ──────────────────────────────────────────────────────────

describe('extractCaption', () => {
  it('returns empty string for null', () => {
    expect(extractCaption(null)).toBe('')
  })

  it('returns empty string for undefined', () => {
    expect(extractCaption(undefined)).toBe('')
  })

  it('returns empty string for state with empty children array', () => {
    expect(extractCaption({ root: { children: [] } } as any)).toBe('')
  })

  it('extracts text from a flat paragraph node', () => {
    const state = {
      root: {
        children: [
          { type: 'paragraph', children: [{ type: 'text', text: 'Hello world' }] },
        ],
      },
    }
    expect(extractCaption(state as any)).toBe('Hello world')
  })

  it('concatenates text from multiple top-level nodes separated by a space', () => {
    const state = {
      root: {
        children: [
          { type: 'paragraph', children: [{ type: 'text', text: 'First' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Second' }] },
        ],
      },
    }
    const result = extractCaption(state as any)
    expect(result).toContain('First')
    expect(result).toContain('Second')
  })

  it('result is always trimmed for any non-empty text input', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
        (text) => {
          const state = {
            root: {
              children: [{ type: 'paragraph', children: [{ type: 'text', text: text }] }],
            },
          }
          const result = extractCaption(state as any)
          expect(result).toBe(result.trim())
        },
      ),
      { numRuns: 50 },
    )
  })
})

// ── prevIndex ───────────────────────────────────────────────────────────────

describe('prevIndex', () => {
  it('returns 0 when total is 0', () => {
    expect(prevIndex(0, 0)).toBe(0)
  })

  it('wraps from index 0 to total - 1', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), (total) => {
        expect(prevIndex(0, total)).toBe(total - 1)
      }),
      { numRuns: 100 },
    )
  })

  it('decrements by 1 for any index > 0', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 2, max: 100 })
          .chain((total) =>
            fc.integer({ min: 1, max: total - 1 }).map((current) => ({ current, total })),
          ),
        ({ current, total }) => {
          expect(prevIndex(current, total)).toBe(current - 1)
        },
      ),
      { numRuns: 100 },
    )
  })
})

// ── nextIndex ───────────────────────────────────────────────────────────────

describe('nextIndex', () => {
  it('returns 0 when total is 0', () => {
    expect(nextIndex(0, 0)).toBe(0)
  })

  it('wraps from total - 1 to 0', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), (total) => {
        expect(nextIndex(total - 1, total)).toBe(0)
      }),
      { numRuns: 100 },
    )
  })

  it('increments by 1 for any index < total - 1', () => {
    fc.assert(
      fc.property(
        fc
          .integer({ min: 2, max: 100 })
          .chain((total) =>
            fc.integer({ min: 0, max: total - 2 }).map((current) => ({ current, total })),
          ),
        ({ current, total }) => {
          expect(nextIndex(current, total)).toBe(current + 1)
        },
      ),
      { numRuns: 100 },
    )
  })
})

// ── MediaBlock static analysis ───────────────────────────────────────────────

describe('MediaBlock static requirements', () => {
  const src = fs.readFileSync(
    path.resolve(process.cwd(), 'src/blocks/MediaBlock/Component.tsx'),
    'utf-8',
  )

  it("has 'use client' directive at the top", () => {
    expect(src).toMatch(/^['"]use client['"]/)
  })

  it('imports useLightbox from the Lightbox component', () => {
    expect(src).toMatch(/useLightbox.*from.*Lightbox/)
  })

  it('calls register and open from useLightbox()', () => {
    expect(src).toMatch(/useLightbox\(\)/)
    expect(src).toMatch(/\bregister\b/)
    expect(src).toMatch(/\bopen\b/)
  })
})

// ── Post page static analysis ────────────────────────────────────────────────

describe('Post page static requirements', () => {
  const src = fs.readFileSync(
    path.resolve(process.cwd(), 'src/app/(frontend)/posts/[slug]/page.tsx'),
    'utf-8',
  )

  it('imports LightboxProvider', () => {
    expect(src).toMatch(/LightboxProvider.*from.*Lightbox/)
  })

  it('renders <LightboxProvider> wrapping content', () => {
    expect(src).toMatch(/<LightboxProvider/)
    expect(src).toMatch(/<\/LightboxProvider>/)
  })
})
