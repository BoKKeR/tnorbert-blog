# Implementation Plan: blog-theme-redesign

## Overview

Incremental implementation of the complete visual redesign for deployonfri.day. Each task builds on the previous, starting with the CSS token foundation and ending with homepage wiring. The design uses TypeScript/React (Next.js 15 App Router), so all tasks target that stack. Property-based tests use **fast-check** (add as a dev dependency).

## Tasks

- [x] 1. CSS token system and Tailwind configuration
  - [x] 1.1 Update `src/app/(frontend)/globals.css` with new brand palette
    - Replace all `:root` and `[data-theme='dark']` CSS custom property values with the new HSL values from the design document (cream, ink, green, blue, orange, amber)
    - Add `--color-*` raw palette variables alongside the semantic tokens
    - Add `--warning` and `--warning-foreground` tokens to both `:root` and `[data-theme='dark']`
    - Set `--radius: 0.25rem` (4px)
    - Add `body { font-family: var(--font-libre-baskerville), Georgia, serif; }` to the base layer
    - Preserve the `html { opacity: 0 }` / `html[data-theme] { opacity: initial }` flash-prevention pattern
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 9.1, 9.3_

  - [x] 1.2 Update `tailwind.config.mjs` with font families and typography plugin extension
    - Replace `fontFamily.sans` with `fontFamily.serif` pointing to `var(--font-libre-baskerville)`
    - Retain `fontFamily.mono` pointing to `var(--font-geist-mono)`
    - Add `warning` color token (`hsl(var(--warning))` / `hsl(var(--warning-foreground))`)
    - Extend the `typography` plugin config: set Libre Baskerville as prose font, 18px base size, 1.75 line-height, brand color prose variables, heading font overrides for h1–h4, monospace code block styles
    - _Requirements: 1.6, 2.1, 2.2, 2.3, 2.6_

  - [x] 1.3 Write property tests for color contrast (Properties 10 and 11)
    - **Property 10: Body text contrast ratio meets WCAG AA**
    - **Validates: Requirements 11.1**
    - **Property 11: Large text contrast ratio meets WCAG AA**
    - **Validates: Requirements 11.2**
    - Install `fast-check` as a dev dependency
    - Create `src/__tests__/colorContrast.property.test.ts`
    - Implement a `wcagContrastRatio(fg: string, bg: string): number` helper using the WCAG relative luminance formula
    - For each light-mode and dark-mode foreground/background pair from the brand palette, assert contrast ≥ 4.5:1 for body text pairs and ≥ 3:1 for large text pairs
    - Tag: `// Feature: blog-theme-redesign, Property 10: Body text contrast ratio meets WCAG AA`
    - Tag: `// Feature: blog-theme-redesign, Property 11: Large text contrast ratio meets WCAG AA`

- [x] 2. Font loading via next/font
  - [x] 2.1 Update `src/app/(frontend)/layout.tsx` to load Libre Baskerville
    - Import `Libre_Baskerville` from `next/font/google` with subsets `['latin']`, weights `['400', '700']`, styles `['normal', 'italic']`, variable `'--font-libre-baskerville'`, display `'swap'`
    - Remove the `GeistSans` import (no longer used as primary font)
    - Retain `GeistMono` import for code blocks
    - Update the `<html>` className to use `cn(libreBaskerville.variable, GeistMono.variable)` instead of the Geist sans variable
    - _Requirements: 2.4_

- [x] 3. Header redesign with integrated 3-state logotype toggle
  - [x] 3.1 Rewrite `src/Header/Component.client.tsx` with sticky behaviour and scroll shadow
    - Add sticky positioning: `sticky top-0 z-50`
    - Add a scroll event listener that toggles `backdrop-blur-sm bg-background/90 border-b border-border` classes when `window.scrollY > 0`
    - Replace the existing `<Logo>` link with the new logotype toggle (see 3.2)
    - Add nav links: `/` (home) and `/about`
    - Add `DarkModeToggle` icon button (see 3.3) replacing the existing `ThemeSelector` reference
    - Add mobile hamburger button that toggles a slide-down nav drawer below 768px
    - Ensure all nav links have visible `focus-visible` ring styles
    - Use semantic `<header>` and `<nav>` elements
    - _Requirements: 6.1, 6.2, 6.4, 6.5, 6.6_

  - [x] 3.2 Implement the 3-state logotype toggle inside the header
    - Render the site name as: `Deploy on <button>Friday</button> / <button>Saturday</button>`
    - Manage `FeedMode` state (`'both' | 'friday' | 'saturday'`) in `localStorage` under key `'deployonfri-feed-mode'`; default to `'both'`
    - Visual states: `both` → both words full opacity; `friday` → Friday highlighted, Saturday dimmed; `saturday` → Saturday highlighted, Friday dimmed
    - Interaction: clicking a dimmed word activates only that word; clicking the already-active single word resets to `both`
    - Each word is a `<button>` with `aria-pressed` reflecting its active state and a descriptive `aria-label`
    - Export a `useFeedMode` hook or context so `HomeFeedClient` can subscribe to the same state
    - _Requirements: 3.1, 3.4, 6.1_

  - [x] 3.3 Implement `DarkModeToggle` icon button component
    - Create `src/components/DarkModeToggle/index.tsx` as a `'use client'` component
    - Render a sun/moon icon (from `lucide-react`) that cycles `light → dark → auto` by calling `setTheme` from the existing `ThemeProvider` context
    - Add a visually hidden `aria-live="polite"` region that announces "Dark mode enabled", "Light mode enabled", or "System theme active" on change
    - _Requirements: 6.3, 11.6_

- [x] 4. HomeFeed server + client components with 3-state filtering and pagination
  - [x] 4.1 Create `src/components/HomeFeed/feedConfig.ts`
    - Define and export `FRIDAY_CATEGORY_SLUGS` and `SATURDAY_CATEGORY_SLUGS` string arrays as specified in the design document
    - Define and export `FeedMode` type and `DEFAULT_MODE` constant
    - _Requirements: 3.2, 3.3_

  - [x] 4.2 Create `src/components/HomeFeed/index.tsx` (server component)
    - Fetch all published posts with `depth: 1`, `limit: 100`, sorted by `publishedAt` descending
    - Select fields: `title`, `slug`, `categories`, `meta`, `heroImage`, `publishedAt`
    - Pass the full post array as props to `HomeFeedClient`
    - _Requirements: 3.5, 3.9_

  - [x] 4.3 Create `src/components/HomeFeed/HomeFeedClient.tsx` (client component)
    - Accept `posts: Post[]` prop
    - Read `FeedMode` from the header's `useFeedMode` hook/context (or directly from `localStorage` on mount)
    - Filter posts by mode using `FRIDAY_CATEGORY_SLUGS` / `SATURDAY_CATEGORY_SLUGS`
    - Sort filtered posts by `publishedAt` descending
    - Implement client-side pagination: slice to 10 posts per page, manage `page` state with `useState`
    - Render a `PostCard` for each post on the current page
    - Render mode-specific empty state messages when no posts match
    - Render pagination controls (prev/next) only when `totalPages > 1`
    - _Requirements: 3.2, 3.3, 3.5, 3.7, 3.9, 3.10_

  - [x] 4.4 Write property test: Friday mode shows only Friday posts (Property 1)
    - **Property 1: Friday mode shows only Friday posts**
    - **Validates: Requirements 3.2**
    - Create `src/__tests__/homeFeed.property.test.ts`
    - Generate random arrays of posts with mixed Friday/Saturday/uncategorised category slugs using `fast-check`
    - Assert that after applying the Friday filter, every result post has at least one slug in `FRIDAY_CATEGORY_SLUGS`
    - Assert no post with only Saturday slugs appears
    - Tag: `// Feature: blog-theme-redesign, Property 1: Friday mode shows only Friday posts`

  - [x] 4.5 Write property test: Saturday mode shows only Saturday posts (Property 2)
    - **Property 2: Saturday mode shows only Saturday posts**
    - **Validates: Requirements 3.3**
    - Assert that after applying the Saturday filter, every result post has at least one slug in `SATURDAY_CATEGORY_SLUGS`
    - Assert no post with only Friday slugs appears
    - Tag: `// Feature: blog-theme-redesign, Property 2: Saturday mode shows only Saturday posts`

  - [x] 4.6 Write property test: Both mode shows all posts (Property 3)
    - **Property 3: Both mode shows all posts**
    - **Validates: Requirements 3.1, 3.2, 3.3**
    - Generate random post arrays of any category composition
    - Assert that in `both` mode, every input post appears in the output (no filtering)
    - Tag: `// Feature: blog-theme-redesign, Property 3: Both mode shows all posts`

  - [x] 4.7 Write property test: Feed is sorted newest-first (Property 4)
    - **Property 4: Feed is sorted newest-first**
    - **Validates: Requirements 3.5**
    - Generate random post arrays with arbitrary `publishedAt` ISO date strings
    - Assert that for every adjacent pair `(a, b)` in the sorted output, `a.publishedAt >= b.publishedAt`
    - Tag: `// Feature: blog-theme-redesign, Property 4: Feed is sorted newest-first`

  - [x] 4.8 Write property test: Feed pagination never exceeds 10 posts per page (Property 7)
    - **Property 7: Feed pagination never exceeds 10 posts per page**
    - **Validates: Requirements 3.9**
    - Generate random filtered post arrays of length 1–100
    - Assert that the number of `PostCard` elements rendered on any single page is at most 10
    - Tag: `// Feature: blog-theme-redesign, Property 7: Feed pagination never exceeds 10 posts per page`

- [x] 5. PostCard redesign
  - [x] 5.1 Rewrite `src/components/Card/index.tsx` as the new `PostCard`
    - Update `CardPostData` type to include `publishedAt` and `heroImage` fields
    - Render hero image in a `aspect-video` (16:9) container using `next/image` with a `sizes` attribute; use `object-cover`
    - Render a placeholder `div` with `bg-primary/20` and centered site logotype when `heroImage` is absent
    - Render category tags as pill badges using accent color tokens
    - Render post title as a linked `<h2>` using serif heading styles
    - Render publication date formatted as "Friday, 14 June 2025" (use `Intl.DateTimeFormat` with `weekday: 'long'`)
    - Render excerpt from `meta.description`, truncated to 160 characters with `…` appended when truncated
    - Apply hover state: `box-shadow: 0 2px 8px rgba(0,0,0,0.12)` and border color transition to `--primary` with no layout shift (use a transparent default border)
    - Use semantic `<article>` element; ensure the card is keyboard-navigable
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 9.1, 9.2, 9.5, 10.5_

  - [x] 5.2 Write property test: PostCard renders all required fields (Property 5)
    - **Property 5: PostCard renders all required fields**
    - **Validates: Requirements 3.6, 4.3, 4.5, 4.6**
    - Create `src/__tests__/postCard.property.test.ts`
    - Generate random posts with non-null `title`, `publishedAt`, at least one `category`, and `meta.description`
    - Render `PostCard` using a lightweight render helper (e.g., `@testing-library/react`)
    - Assert the rendered output contains the title text, a formatted date string, at least one category tag label, and the excerpt text
    - Tag: `// Feature: blog-theme-redesign, Property 5: PostCard renders all required fields`

  - [x] 5.3 Write property test: Excerpt is always truncated to 160 characters (Property 6)
    - **Property 6: Excerpt is always truncated to 160 characters**
    - **Validates: Requirements 4.4**
    - Generate arbitrary strings of any length as `meta.description`
    - Assert the displayed excerpt is at most 160 characters
    - Assert that when the original string exceeds 160 characters, the displayed text ends with `…`
    - Tag: `// Feature: blog-theme-redesign, Property 6: Excerpt is always truncated to 160 characters`

  - [x] 5.4 Write property test: All rendered images use next/image with a sizes prop (Property 12)
    - **Property 12: All rendered images use next/image with a sizes prop**
    - **Validates: Requirements 10.5**
    - For `PostCard` with a valid `heroImage`, assert the rendered `<img>` element has a non-empty `sizes` attribute (indicating Next.js `<Image>` was used)
    - Tag: `// Feature: blog-theme-redesign, Property 12: All rendered images use next/image with a sizes prop`

- [x] 6. PostHero redesign
  - [x] 6.1 Rewrite `src/heros/PostHero/index.tsx` with metadata-below-image layout
    - Remove the existing overlay/gradient layout (title and metadata overlaid on the image)
    - New layout order (top to bottom): "← All posts" back-link, category tag pills, `<h1>` title, author + date line, full-width 16:9 hero image
    - Render hero image using `next/image` with `sizes="100vw"` and `aspect-video` container; `object-cover`
    - Render "← All posts" as a `<Link href="/">` with accessible label
    - Render category tags as pill badges (same style as PostCard)
    - Render author name and publication date below the title
    - Apply `print:block` to the article metadata; apply `print:hidden` to the back-link
    - _Requirements: 5.1, 5.3, 5.4, 5.5, 10.5_

  - [x] 6.2 Write property test: PostHero contains author and date for any post (Property 8)
    - **Property 8: PostHero contains author and date for any post**
    - **Validates: Requirements 5.3**
    - Create `src/__tests__/postHero.property.test.ts`
    - Generate random posts with non-null `populatedAuthors` (1–3 authors) and `publishedAt`
    - Render `PostHero` and assert the rendered output contains the author name string and a formatted date string
    - Tag: `// Feature: blog-theme-redesign, Property 8: PostHero contains author and date for any post`

  - [x] 6.3 Write property test: PostHero contains all category tags for any post (Property 9)
    - **Property 9: PostHero contains all category tags for any post**
    - **Validates: Requirements 5.4**
    - Generate random posts with 1–5 categories
    - Render `PostHero` and assert the rendered output contains a label for every category in the array
    - Tag: `// Feature: blog-theme-redesign, Property 9: PostHero contains all category tags for any post`

- [x] 7. Footer redesign
  - [x] 7.1 Rewrite `src/Footer/Component.tsx` with always-dark background
    - Replace `bg-black dark:bg-card` with hardcoded `bg-[#1E1E23]`
    - Replace `text-white` with hardcoded `text-[#FAF3E1]`
    - Remove the `<ThemeSelector>` component from the footer (dark mode toggle moves to header)
    - Retain CMS nav links via `footerData.navItems`
    - Retain `<Logo>` link and add a brief tagline or copyright notice
    - Retain `print:hidden`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 8. About page
  - [x] 8.1 Create `src/app/(frontend)/about/page.tsx` as a hardcoded Next.js page
    - Export `metadata` with `title: 'About — deployonfri.day'`
    - Render a bio section: author name, photo via `next/image` with descriptive `alt`, short personal description
    - Render a CV/achievements section: professional highlights, skills, notable projects as a timeline or structured list
    - Render contact/social links
    - Use the `container` class and `prose` typography classes consistent with the rest of the site
    - Use semantic HTML: `<main>`, `<section>`, `<article>` as appropriate
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 9. Giscus integration restyling
  - [x] 9.1 Restyle `src/components/Giscus/index.tsx`
    - Replace the `<Gutter>` wrapper with a `max-w-[48rem] mx-auto` container div aligned with the prose body width
    - Restyle the "Join the Discussion on github" heading using Libre Baskerville `text-xl font-serif`
    - Add `<hr className="border-border my-8" />` divider above the Giscus section
    - Add `pt-12 pb-8` spacing to the Giscus wrapper
    - Preserve the existing `useThemeValue` hook for theme sync, `print:hidden`, and all Giscus repo/category configuration props
    - _Requirements: 5.6_

- [x] 10. Dark mode toggle in header
  - This task is satisfied by the `DarkModeToggle` component created in task 3.3 and its integration in task 3.1.
  - [x] 10.1 Verify `DarkModeToggle` is wired into `HeaderClient` and `ThemeSelector` is removed from all frontend layouts
    - Confirm `ThemeSelector` is no longer imported or rendered in `src/Header/Component.client.tsx`
    - Confirm `ThemeSelector` is no longer rendered in `src/Footer/Component.tsx` (removed in task 7.1)
    - Confirm the `aria-live` announcement region works correctly for all three theme states
    - _Requirements: 6.3, 11.6_

- [x] 11. Checkpoint — Ensure all tests pass
  - Run the full test suite (`pnpm test` or equivalent) and confirm all property-based tests and unit tests pass.
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Homepage wiring — replace page.tsx with HomeFeed
  - [x] 12.1 Replace `src/app/(frontend)/page.tsx` with the `HomeFeed` server component
    - Remove the current delegation to the `[slug]` page template
    - Import and render `<HomeFeed />` as the page body
    - Export appropriate `metadata` for the homepage (title, description, OG tags)
    - Ensure the page uses `export const dynamic = 'force-dynamic'` or appropriate caching strategy consistent with the Payload CMS data freshness requirements
    - _Requirements: 3.1, 3.5, 3.8, 3.9_

  - [x] 12.2 Update `src/app/(frontend)/posts/[slug]/page.tsx` for PostHero and Giscus layout changes
    - Ensure the `<article>` wrapper uses `pt-8 pb-16` (reduced top padding since PostHero now renders the back-link above the image)
    - Confirm `GiscusComments` is rendered inside the `max-w-[48rem] mx-auto` container (aligned with prose body)
    - Confirm `print:hidden` is applied to `GiscusComments` and `RelatedPosts` wrappers
    - _Requirements: 5.2, 5.6, 5.7, 5.8_

- [x] 13. Final checkpoint — Ensure all tests pass
  - Run the full test suite and confirm zero failures.
  - Smoke-check: verify all six CSS custom properties are defined in `:root` with correct HSL values, `[data-theme='dark']` block has correct inverted values, `--radius` is `0.25rem`, footer has `bg-[#1E1E23]` unconditionally, Libre Baskerville is loaded via `next/font` in `layout.tsx`, and `/about` route is reachable.
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use **fast-check** (install as a dev dependency: `pnpm add -D fast-check`)
- Property tests run a minimum of 100 iterations each
- The `FeedMode` state is shared between the Header logotype toggle and `HomeFeedClient` — use a React context or `localStorage` event listener to keep them in sync
- The footer's `bg-[#1E1E23]` is intentionally hardcoded (not a semantic token) so it remains dark in both light and dark modes
- `GeistSans` is removed from `layout.tsx`; `GeistMono` is retained for code blocks
- All images must use `next/image` with a `sizes` attribute (required by Property 12 and Requirement 10.5)
