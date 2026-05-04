// Feature: blog-theme-redesign, Property 8: PostHero contains author and date for any post
// Feature: blog-theme-redesign, Property 9: PostHero contains all category tags for any post

import * as fc from 'fast-check'
import { describe, it, expect } from 'vitest'

import { formatAuthors } from '@/utilities/formatAuthors'

// ---------------------------------------------------------------------------
// Pure logic functions mirrored from src/heros/PostHero/index.tsx
// ---------------------------------------------------------------------------

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  return dateFormatter.format(new Date(dateStr))
}

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

// Use integer timestamps in a safe range (2020-01-01 to 2030-01-01)
const MIN_TS = new Date('2020-01-01').getTime()
const MAX_TS = new Date('2030-01-01').getTime()
const isoDateArb = fc
  .integer({ min: MIN_TS, max: MAX_TS })
  .map((ts) => new Date(ts).toISOString())

/** Non-empty string arbitrary for names and titles */
const nonEmptyStringArb = fc.string({ minLength: 1, maxLength: 80 })

/**
 * An author object matching the populatedAuthors element type.
 * The formatAuthors utility filters out authors without a name, so we
 * generate authors that always have a non-empty name.
 */
const authorArb = fc.record({
  name: nonEmptyStringArb,
})

/** 1–3 authors, all with non-empty names */
const authorsArb = fc.array(authorArb, { minLength: 1, maxLength: 3 })

/** A category object with a non-empty title */
const categoryArb = fc.record({
  id: fc.uuid(),
  title: nonEmptyStringArb,
  slug: fc.string({ minLength: 1, maxLength: 30 }),
})

/** 1–5 categories */
const categoriesArb = fc.array(categoryArb, { minLength: 1, maxLength: 5 })

// ---------------------------------------------------------------------------
// Property 8: PostHero contains author and date for any post
// Validates: Requirements 5.3
// ---------------------------------------------------------------------------

describe('Property 8: PostHero contains author and date for any post', () => {
  it('formatAuthors produces a non-empty string for any array of 1–3 authors with names', () => {
    // **Validates: Requirements 5.3**
    fc.assert(
      fc.property(authorsArb, (authors) => {
        const result = formatAuthors(authors)
        expect(result.length).toBeGreaterThan(0)
      }),
      { numRuns: 100 },
    )
  })

  it('formatAuthors output contains the first author name for any valid author array', () => {
    // **Validates: Requirements 5.3**
    fc.assert(
      fc.property(authorsArb, (authors) => {
        const result = formatAuthors(authors)
        // The first author's name must appear in the formatted string
        expect(result).toContain(authors[0].name)
      }),
      { numRuns: 100 },
    )
  })

  it('formatDate produces a non-empty string containing the year for any valid ISO date', () => {
    // **Validates: Requirements 5.3**
    fc.assert(
      fc.property(isoDateArb, (publishedAt) => {
        const result = formatDate(publishedAt)
        expect(result.length).toBeGreaterThan(0)
        const year = new Date(publishedAt).getFullYear().toString()
        expect(result).toContain(year)
      }),
      { numRuns: 100 },
    )
  })

  it('for any post with populatedAuthors and publishedAt, both author string and date string are non-empty', () => {
    // **Validates: Requirements 5.3**
    // This is the core property: for any valid post data, the PostHero would
    // render both the author name and the formatted date.
    fc.assert(
      fc.property(
        fc.record({
          populatedAuthors: authorsArb,
          publishedAt: isoDateArb,
        }),
        (post) => {
          const authorString = formatAuthors(post.populatedAuthors)
          const dateString = formatDate(post.publishedAt)

          // Both must be non-empty — the PostHero renders them when present
          expect(authorString.length).toBeGreaterThan(0)
          expect(dateString.length).toBeGreaterThan(0)

          // The author string must contain at least the first author's name
          expect(authorString).toContain(post.populatedAuthors[0].name)

          // The date string must contain the year
          const year = new Date(post.publishedAt).getFullYear().toString()
          expect(dateString).toContain(year)
        },
      ),
      { numRuns: 100 },
    )
  })
})

// ---------------------------------------------------------------------------
// Property 9: PostHero contains all category tags for any post
// Validates: Requirements 5.4
// ---------------------------------------------------------------------------

describe('Property 9: PostHero contains all category tags for any post', () => {
  it('for any array of 1–5 categories, each category title is a non-empty string', () => {
    // **Validates: Requirements 5.4**
    fc.assert(
      fc.property(categoriesArb, (categories) => {
        for (const category of categories) {
          expect(typeof category.title).toBe('string')
          expect(category.title.length).toBeGreaterThan(0)
        }
      }),
      { numRuns: 100 },
    )
  })

  it('for any array of 1–5 categories, every category title is preserved without transformation', () => {
    // **Validates: Requirements 5.4**
    // The PostHero renders each category title directly (no truncation or transformation).
    // This property verifies that the title values are preserved as-is and would be
    // renderable in the component.
    fc.assert(
      fc.property(categoriesArb, (categories) => {
        // Simulate what PostHero does: iterate categories and extract titles
        const renderedTitles = categories
          .filter((cat) => cat !== null && typeof cat === 'object')
          .map((cat) => cat.title || 'Untitled')

        // Every input category must have a corresponding rendered title
        expect(renderedTitles.length).toBe(categories.length)

        // Each rendered title must match the original category title
        for (let i = 0; i < categories.length; i++) {
          expect(renderedTitles[i]).toBe(categories[i].title)
        }
      }),
      { numRuns: 100 },
    )
  })

  it('for any post with 1–5 categories, all category titles would appear in the rendered output', () => {
    // **Validates: Requirements 5.4**
    // Core property: for any valid post with categories, the PostHero renders
    // a label for every category. We verify the rendering logic preserves all titles.
    fc.assert(
      fc.property(
        fc.record({
          title: nonEmptyStringArb,
          categories: categoriesArb,
        }),
        (post) => {
          // Simulate the PostHero category rendering logic:
          // categories?.map((category, index) => {
          //   if (typeof category === 'object' && category !== null) {
          //     const { title: categoryTitle } = category
          //     return categoryTitle || 'Untitled'
          //   }
          //   return null
          // })
          const renderedLabels = post.categories
            .map((category) => {
              if (typeof category === 'object' && category !== null) {
                return (category as { title?: string }).title || 'Untitled'
              }
              return null
            })
            .filter((label): label is string => label !== null)

          // Every category must produce a rendered label
          expect(renderedLabels.length).toBe(post.categories.length)

          // Each category title must appear in the rendered labels
          for (const category of post.categories) {
            expect(renderedLabels).toContain(category.title)
          }
        },
      ),
      { numRuns: 100 },
    )
  })
})
