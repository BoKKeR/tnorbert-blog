// Feature: blog-theme-redesign, Property 1: Friday mode shows only Friday posts
// Feature: blog-theme-redesign, Property 2: Saturday mode shows only Saturday posts
// Feature: blog-theme-redesign, Property 3: Both mode shows all posts
// Feature: blog-theme-redesign, Property 4: Feed is sorted newest-first
// Feature: blog-theme-redesign, Property 7: Feed pagination never exceeds 10 posts per page

import * as fc from 'fast-check'
import { describe, it, expect } from 'vitest'
import { FRIDAY_CATEGORY_SLUGS, SATURDAY_CATEGORY_SLUGS } from '../components/HomeFeed/feedConfig'
import type { FeedMode } from '../components/HomeFeed/feedConfig'

// ---------------------------------------------------------------------------
// Minimal post shape used in tests
// ---------------------------------------------------------------------------

type TestPost = {
  id: string
  publishedAt: string
  categories: Array<{ slug: string }>
}

// ---------------------------------------------------------------------------
// Pure logic functions mirroring HomeFeedClient.tsx
// ---------------------------------------------------------------------------

function filterPosts(posts: TestPost[], mode: FeedMode): TestPost[] {
  if (mode === 'both') return posts

  const targetSlugs = mode === 'friday' ? FRIDAY_CATEGORY_SLUGS : SATURDAY_CATEGORY_SLUGS

  return posts.filter((post) =>
    post.categories.some((cat) => targetSlugs.includes(cat.slug)),
  )
}

function sortPostsByDate(posts: TestPost[]): TestPost[] {
  return [...posts].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return dateB - dateA
  })
}

const POSTS_PER_PAGE = 10

function paginatePosts(posts: TestPost[], page: number): TestPost[] {
  const startIndex = (page - 1) * POSTS_PER_PAGE
  return posts.slice(startIndex, startIndex + POSTS_PER_PAGE)
}

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

/** A slug that belongs only to the Friday set */
const fridaySlugArb = fc.constantFrom(...FRIDAY_CATEGORY_SLUGS)

/** A slug that belongs only to the Saturday set */
const saturdaySlugArb = fc.constantFrom(...SATURDAY_CATEGORY_SLUGS)

/** A slug that belongs to neither set */
const uncategorisedSlugArb = fc.string({ minLength: 1, maxLength: 20 }).filter(
  (s) => !FRIDAY_CATEGORY_SLUGS.includes(s) && !SATURDAY_CATEGORY_SLUGS.includes(s),
)

// Use integer timestamps in a safe range (2020-01-01 to 2030-01-01) to avoid
// fc.date() generating out-of-range values that throw on .toISOString()
const MIN_TS = new Date('2020-01-01').getTime()
const MAX_TS = new Date('2030-01-01').getTime()
const isoDateArb = fc.integer({ min: MIN_TS, max: MAX_TS }).map((ts) => new Date(ts).toISOString())

/** A post whose categories contain at least one Friday slug (may also have others) */
const fridayPostArb: fc.Arbitrary<TestPost> = fc
  .record({
    id: fc.uuid(),
    publishedAt: isoDateArb,
    categories: fc
      .array(fc.record({ slug: fridaySlugArb }), { minLength: 1, maxLength: 3 })
      .chain((fridayCats) =>
        fc
          .array(fc.record({ slug: saturdaySlugArb }), { minLength: 0, maxLength: 2 })
          .map((satCats) => [...fridayCats, ...satCats]),
      ),
  })

/** A post whose categories contain at least one Saturday slug (may also have others) */
const saturdayPostArb: fc.Arbitrary<TestPost> = fc
  .record({
    id: fc.uuid(),
    publishedAt: isoDateArb,
    categories: fc
      .array(fc.record({ slug: saturdaySlugArb }), { minLength: 1, maxLength: 3 })
      .chain((satCats) =>
        fc
          .array(fc.record({ slug: fridaySlugArb }), { minLength: 0, maxLength: 2 })
          .map((fridayCats) => [...satCats, ...fridayCats]),
      ),
  })

/** A post whose categories contain ONLY Saturday slugs (no Friday slugs) */
const saturdayOnlyPostArb: fc.Arbitrary<TestPost> = fc.record({
  id: fc.uuid(),
  publishedAt: isoDateArb,
  categories: fc.array(fc.record({ slug: saturdaySlugArb }), { minLength: 1, maxLength: 3 }),
})

/** A post whose categories contain ONLY Friday slugs (no Saturday slugs) */
const fridayOnlyPostArb: fc.Arbitrary<TestPost> = fc.record({
  id: fc.uuid(),
  publishedAt: isoDateArb,
  categories: fc.array(fc.record({ slug: fridaySlugArb }), { minLength: 1, maxLength: 3 }),
})

/** A post with any category composition (Friday, Saturday, uncategorised, or empty) */
const anyPostArb: fc.Arbitrary<TestPost> = fc.record({
  id: fc.uuid(),
  publishedAt: isoDateArb,
  categories: fc.array(
    fc.record({
      slug: fc.oneof(fridaySlugArb, saturdaySlugArb, uncategorisedSlugArb),
    }),
    { minLength: 0, maxLength: 4 },
  ),
})

/** A mixed array of Friday posts, Saturday-only posts, and uncategorised posts */
const mixedPostArrayArb: fc.Arbitrary<TestPost[]> = fc
  .tuple(
    fc.array(fridayPostArb, { minLength: 0, maxLength: 5 }),
    fc.array(saturdayOnlyPostArb, { minLength: 0, maxLength: 5 }),
    fc.array(
      fc.record({
        id: fc.uuid(),
        publishedAt: isoDateArb,
        categories: fc.array(fc.record({ slug: uncategorisedSlugArb }), { minLength: 1, maxLength: 2 }),
      }),
      { minLength: 0, maxLength: 3 },
    ),
  )
  .map(([fri, sat, other]) => [...fri, ...sat, ...other])

// ---------------------------------------------------------------------------
// Property 1: Friday mode shows only Friday posts
// Validates: Requirements 3.2
// ---------------------------------------------------------------------------

describe('Property 1: Friday mode shows only Friday posts', () => {
  it('every post in the Friday-filtered result has at least one Friday category slug', () => {
    fc.assert(
      fc.property(mixedPostArrayArb, (posts) => {
        const result = filterPosts(posts, 'friday')

        for (const post of result) {
          const slugs = post.categories.map((c) => c.slug)
          const hasFridaySlug = slugs.some((s) => FRIDAY_CATEGORY_SLUGS.includes(s))
          expect(hasFridaySlug).toBe(true)
        }
      }),
      { numRuns: 100 },
    )
  })

  it('no post with only Saturday slugs appears in the Friday-filtered result', () => {
    fc.assert(
      fc.property(
        fc.array(saturdayOnlyPostArb, { minLength: 1, maxLength: 10 }),
        (saturdayOnlyPosts) => {
          const result = filterPosts(saturdayOnlyPosts, 'friday')
          expect(result).toHaveLength(0)
        },
      ),
      { numRuns: 100 },
    )
  })
})

// ---------------------------------------------------------------------------
// Property 2: Saturday mode shows only Saturday posts
// Validates: Requirements 3.3
// ---------------------------------------------------------------------------

describe('Property 2: Saturday mode shows only Saturday posts', () => {
  it('every post in the Saturday-filtered result has at least one Saturday category slug', () => {
    fc.assert(
      fc.property(mixedPostArrayArb, (posts) => {
        const result = filterPosts(posts, 'saturday')

        for (const post of result) {
          const slugs = post.categories.map((c) => c.slug)
          const hasSaturdaySlug = slugs.some((s) => SATURDAY_CATEGORY_SLUGS.includes(s))
          expect(hasSaturdaySlug).toBe(true)
        }
      }),
      { numRuns: 100 },
    )
  })

  it('no post with only Friday slugs appears in the Saturday-filtered result', () => {
    fc.assert(
      fc.property(
        fc.array(fridayOnlyPostArb, { minLength: 1, maxLength: 10 }),
        (fridayOnlyPosts) => {
          const result = filterPosts(fridayOnlyPosts, 'saturday')
          expect(result).toHaveLength(0)
        },
      ),
      { numRuns: 100 },
    )
  })
})

// ---------------------------------------------------------------------------
// Property 3: Both mode shows all posts
// Validates: Requirements 3.1, 3.2, 3.3
// ---------------------------------------------------------------------------

describe('Property 3: Both mode shows all posts', () => {
  it('every input post appears in the output when mode is "both"', () => {
    fc.assert(
      fc.property(fc.array(anyPostArb, { minLength: 0, maxLength: 20 }), (posts) => {
        const result = filterPosts(posts, 'both')

        // All input posts must appear in the result
        expect(result).toHaveLength(posts.length)

        for (const post of posts) {
          const found = result.some((r) => r.id === post.id)
          expect(found).toBe(true)
        }
      }),
      { numRuns: 100 },
    )
  })
})

// ---------------------------------------------------------------------------
// Property 4: Feed is sorted newest-first
// Validates: Requirements 3.5
// ---------------------------------------------------------------------------

describe('Property 4: Feed is sorted newest-first', () => {
  it('for every adjacent pair (a, b) in the sorted output, a.publishedAt >= b.publishedAt', () => {
    fc.assert(
      fc.property(fc.array(anyPostArb, { minLength: 0, maxLength: 20 }), (posts) => {
        const sorted = sortPostsByDate(posts)

        for (let i = 0; i < sorted.length - 1; i++) {
          const a = sorted[i]
          const b = sorted[i + 1]
          const dateA = new Date(a.publishedAt).getTime()
          const dateB = new Date(b.publishedAt).getTime()
          expect(dateA).toBeGreaterThanOrEqual(dateB)
        }
      }),
      { numRuns: 100 },
    )
  })
})

// ---------------------------------------------------------------------------
// Property 7: Feed pagination never exceeds 10 posts per page
// Validates: Requirements 3.9
// ---------------------------------------------------------------------------

describe('Property 7: Feed pagination never exceeds 10 posts per page', () => {
  it('the number of posts on any single page is at most 10', () => {
    fc.assert(
      fc.property(
        fc.array(anyPostArb, { minLength: 1, maxLength: 100 }),
        fc.integer({ min: 1, max: 10 }),
        (posts, page) => {
          const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
          // Clamp page to valid range
          const validPage = Math.min(page, totalPages)
          const paginated = paginatePosts(posts, validPage)
          expect(paginated.length).toBeLessThanOrEqual(POSTS_PER_PAGE)
        },
      ),
      { numRuns: 100 },
    )
  })
})
