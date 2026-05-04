# Design Document: blog-theme-redesign

## Overview

This document describes the technical design for the complete visual redesign of **deployonfri.day**, a Payload CMS + Next.js 15 blog. The redesign introduces a mid-century modern aesthetic with a warm color palette, Libre Baskerville typography, a Day/Night feed toggle as the primary navigation concept, and full dark mode support.

The theme layer sits entirely within the existing Next.js frontend route group (`src/app/(frontend)/`) and does not touch the Payload CMS admin panel or data model. All changes are additive or replacement-level modifications to CSS tokens, Tailwind configuration, and React components — no new Payload collections or fields are required.

### Key Design Decisions

- **CSS custom properties + Tailwind semantic tokens**: All brand colors are defined once as HSL CSS variables in `globals.css` and consumed via Tailwind utility classes. No hardcoded hex values in components.
- **`next/font` for Libre Baskerville**: Loaded at the root layout level to avoid FOUT and external font requests.
- **Day/Night toggle is a client-side filter, not a route**: The toggle stores its state in `localStorage` and filters the post list client-side after an initial server render of all posts. This avoids a full page reload on toggle and keeps the URL clean.
- **Dark mode via `[data-theme="dark"]` selector**: The existing `ThemeProvider` pattern is preserved. The footer's fixed dark background is achieved by opting out of the semantic background token on that element.
- **Giscus theme sync**: The existing `useThemeValue` hook already drives Giscus theme. The redesign preserves this and maps to Giscus's `light` / `dark` themes.
- **`@tailwindcss/typography` for prose**: Already installed. The redesign extends the typography plugin config to use Libre Baskerville and the brand color palette.

---

## CSS Token System and Tailwind Configuration

### CSS Custom Properties (`globals.css`)

All brand colors are defined as HSL values in `:root` and `[data-theme='dark']`. The existing token names (`--background`, `--foreground`, `--primary`, etc.) are reused so that all existing components that reference `bg-background`, `text-foreground`, etc. automatically pick up the new palette without changes.

```css
/* Light mode (default) */
:root {
  /* Brand palette */
  --color-cream:   40 86% 93%;    /* #FAF3E1 */
  --color-ink:     240 3% 12%;    /* #1E1E23 */
  --color-green:   142 100% 34%;  /* #00AD38 */
  --color-blue:    224 95% 60%;   /* #3A6CFA */
  --color-orange:  19 100% 50%;   /* #FF5200 */
  --color-amber:   38 100% 56%;   /* #FFA51E */

  /* Semantic tokens */
  --background:         var(--color-cream);   /* #FAF3E1 */
  --foreground:         var(--color-ink);     /* #1E1E23 */

  --card:               40 60% 96%;           /* slightly lighter cream */
  --card-foreground:    var(--color-ink);

  --primary:            var(--color-green);   /* #00AD38 */
  --primary-foreground: 0 0% 100%;

  --accent:             var(--color-blue);    /* #3A6CFA */
  --accent-foreground:  0 0% 100%;

  --secondary:          40 40% 88%;
  --secondary-foreground: var(--color-ink);

  --muted:              40 30% 90%;
  --muted-foreground:   240 3% 40%;

  --destructive:        var(--color-orange);  /* #FF5200 */
  --destructive-foreground: 0 0% 100%;

  --warning:            var(--color-amber);   /* #FFA51E */
  --warning-foreground: var(--color-ink);

  --border:             40 20% 82%;
  --input:              40 20% 82%;
  --ring:               var(--color-green);

  --radius: 0.25rem;  /* 4px — mid-century restrained corners */
}

/* Dark mode */
[data-theme='dark'] {
  --background:         var(--color-ink);     /* #1E1E23 */
  --foreground:         var(--color-cream);   /* #FAF3E1 */

  --card:               240 3% 16%;
  --card-foreground:    var(--color-cream);

  --primary:            var(--color-green);   /* preserved */
  --primary-foreground: 0 0% 100%;

  --accent:             var(--color-blue);    /* preserved */
  --accent-foreground:  0 0% 100%;

  --secondary:          240 3% 20%;
  --secondary-foreground: var(--color-cream);

  --muted:              240 3% 20%;
  --muted-foreground:   240 3% 60%;

  --destructive:        var(--color-orange);  /* preserved */
  --destructive-foreground: 0 0% 100%;

  --warning:            var(--color-amber);   /* preserved */
  --warning-foreground: var(--color-ink);

  --border:             240 3% 22%;
  --input:              240 3% 22%;
  --ring:               var(--color-green);
}
```

### Tailwind Config Changes (`tailwind.config.mjs`)

The following changes are made to the existing config:

1. **Font families**: Replace `GeistSans`/`GeistMono` with `LibreBaskerville` (serif) and keep a monospace stack.
2. **Add `warning` color token**: Already present in the existing config; ensure it maps to `hsl(var(--warning))`.
3. **Typography plugin**: Extend to use Libre Baskerville and brand colors for prose.

```js
// tailwind.config.mjs — relevant additions/changes
theme: {
  extend: {
    fontFamily: {
      serif: ['var(--font-libre-baskerville)', 'Georgia', 'serif'],
      mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      // 'sans' removed — serif is the primary font
    },
    colors: {
      // existing semantic tokens preserved...
      warning: {
        DEFAULT: 'hsl(var(--warning))',
        foreground: 'hsl(var(--warning-foreground))',
      },
    },
    typography: ({ theme }) => ({
      DEFAULT: {
        css: {
          fontFamily: 'var(--font-libre-baskerville), Georgia, serif',
          fontSize: '1.125rem',   // 18px
          lineHeight: '1.75',
          maxWidth: '48rem',
          color: 'hsl(var(--foreground))',
          '--tw-prose-body': 'hsl(var(--foreground))',
          '--tw-prose-headings': 'hsl(var(--foreground))',
          '--tw-prose-links': 'hsl(var(--primary))',
          '--tw-prose-bold': 'hsl(var(--foreground))',
          '--tw-prose-code': 'hsl(var(--destructive))',
          '--tw-prose-pre-bg': 'hsl(var(--card))',
          h1: { fontFamily: 'var(--font-libre-baskerville), Georgia, serif', fontWeight: '700', fontSize: '2.5rem' },
          h2: { fontFamily: 'var(--font-libre-baskerville), Georgia, serif', fontWeight: '600', fontSize: '1.75rem' },
          h3: { fontFamily: 'var(--font-libre-baskerville), Georgia, serif', fontWeight: '600', fontSize: '1.375rem' },
          h4: { fontFamily: 'var(--font-libre-baskerville), Georgia, serif', fontWeight: '600', fontSize: '1.125rem' },
          'code::before': { content: 'none' },
          'code::after': { content: 'none' },
          code: {
            fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
            backgroundColor: 'hsl(var(--card))',
            color: 'hsl(var(--destructive))',
            padding: '0.2em 0.4em',
            borderRadius: '0.25rem',
            fontWeight: '400',
          },
        },
      },
    }),
  },
}
```

---

## Font Loading Strategy

Libre Baskerville is loaded via `next/font/google` in the root layout. This approach:
- Generates a self-hosted `@font-face` at build time (no external requests at runtime)
- Injects the CSS variable server-side, eliminating FOUT
- Uses `display: 'swap'` so text is visible immediately with the fallback serif stack

```tsx
// src/app/(frontend)/layout.tsx
import { Libre_Baskerville } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
})

// In the html element:
// className={cn(libreBaskerville.variable, GeistMono.variable)}
```

`GeistSans` is removed since Libre Baskerville replaces it as the primary font. `GeistMono` is retained for code blocks.

The `body` base style in `globals.css` is updated to use `font-family: var(--font-libre-baskerville), Georgia, serif`.

---

## Dark Mode Implementation

The existing dark mode infrastructure is preserved and extended:

1. **`InitTheme` script** (`src/providers/Theme/InitTheme/index.tsx`): Runs `beforeInteractive`, reads `localStorage`, and sets `data-theme` on `<html>` before first paint. No changes needed.

2. **`ThemeProvider`** (`src/providers/Theme/index.tsx`): Manages theme state in React context. No changes needed.

3. **`ThemeSelector` → `DarkModeToggle`**: The existing `Select`-based `ThemeSelector` in the footer is replaced with a compact icon button in the header. The button cycles through `light → dark → auto` and calls `setTheme` from the existing context.

4. **CSS selector**: `darkMode: ['selector', '[data-theme="dark"]']` in Tailwind config is preserved. All dark mode variants (`dark:bg-...`, `dark:text-...`) continue to work.

5. **Footer exception**: The footer uses hardcoded `bg-[#1E1E23] text-[#FAF3E1]` classes rather than semantic tokens. This ensures the footer is always dark regardless of the active theme, as specified.

6. **Giscus theme sync**: The existing `useThemeValue` hook reads `data-theme` from `<html>` and passes `'light'` or `'dark'` to the Giscus `theme` prop. No changes needed.

7. **Accessibility announcement**: A visually hidden `aria-live="polite"` region is added to the `DarkModeToggle` component. When the theme changes, it updates with text like "Dark mode enabled" or "Light mode enabled".

---

## Giscus Integration Design

Giscus is already integrated at `src/components/Giscus/index.tsx` using `@giscus/react` (already in `package.json`). The redesign makes the following adjustments:

- **Positioning**: Giscus is rendered inside the `max-w-[48rem] mx-auto` prose container, aligned with the article body width.
- **Heading**: The "Join the Discussion on github" heading is restyled using the Typography_Scale (Libre Baskerville, `text-xl`).
- **Theme mapping**: The existing `useThemeValue` hook already returns `'light'` or `'dark'`. The Giscus `theme` prop receives this value directly. No changes to the hook.
- **Print hiding**: The `print:hidden` class is already applied to the Giscus wrapper. Preserved.
- **Spacing**: `pt-12 pb-8` above the Giscus section, with a ruled divider (`<hr className="border-border my-8" />`) separating it from the article body.

The Giscus repo/category configuration (`repo`, `repoId`, `category`, `categoryId`) is unchanged.

---

## Architecture

The theme layer fits into the existing structure as follows:

```
src/
├── app/(frontend)/
│   ├── globals.css              ← CSS token definitions (MODIFIED)
│   ├── layout.tsx               ← Font loading, html class (MODIFIED)
│   ├── page.tsx                 ← Homepage — now renders HomeFeed (MODIFIED)
│   ├── about/
│   │   └── page.tsx             ← New hardcoded About page (NEW)
│   └── posts/[slug]/
│       └── page.tsx             ← Post page (minor modifications)
├── components/
│   ├── Card/index.tsx           ← PostCard redesign (MODIFIED)
│   ├── HomeFeed/                ← New component wrapping feed + toggle (NEW)
│   │   └── index.tsx
│   └── Giscus/index.tsx         ← Preserved, theme sync already works
├── Footer/Component.tsx         ← Footer redesign (MODIFIED)
├── Header/
│   ├── Component.tsx            ← Server shell (unchanged)
│   └── Component.client.tsx     ← Header redesign + logotype toggle (MODIFIED)
├── heros/PostHero/index.tsx     ← PostHero redesign (MODIFIED)
└── providers/
    └── Theme/                   ← Preserved as-is
tailwind.config.mjs              ← Token + font extension (MODIFIED)
```

### Data Flow Diagram

```mermaid
graph TD
    A[Next.js Server] -->|Fetches all posts depth=1| B[HomeFeed Server Component]
    B -->|Passes full post list as props| C[HomeFeed Client Component]
    C -->|Reads localStorage 'deployonfri-feed-mode'| D{3-State Toggle in Header}
    D -->|both default| E[No filter — all posts shown]
    D -->|friday| F[Filter: Friday categories only]
    D -->|saturday| G[Filter: Saturday categories only]
    E --> H[Paginated PostCard list]
    F --> H
    G --> H
    H -->|Click| I[/posts/slug]
```

The homepage (`/`) currently delegates to the `[slug]` page template. This will be replaced with a dedicated `HomeFeed` server component that fetches posts directly from Payload and passes them to a client component for toggle-based filtering.

---

## Components and Interfaces

### DayNightToggle (integrated into Header logotype)

The toggle is no longer a standalone component. It lives inside `src/Header/Component.client.tsx` as part of the site logotype. The site name renders as:

> Deploy on **Friday** / **Saturday**

where "Friday" and "Saturday" are independently clickable/tappable words that act as toggle segments.

**Visual states**:
- `both` (default): both "Friday" and "Saturday" are highlighted at full opacity
- `friday`: "Friday" is highlighted; "Saturday" is dimmed
- `saturday`: "Saturday" is highlighted; "Friday" is dimmed

**Interaction rules**:
- Clicking a dimmed word activates only that word (switches to that single mode)
- Clicking an already-active single word while the other is inactive resets to `both`

**Accessibility**: Each word is a `<button>` with `aria-pressed` reflecting its active state, and an `aria-label` describing the action (e.g., `"Show Friday posts only"` / `"Show all posts"`).

---

### HomeFeed

A server component that fetches posts and passes them to the client-side feed.

```tsx
// src/components/HomeFeed/index.tsx

// Server component — fetches posts
export async function HomeFeed() {
  const posts = await fetchAllPosts() // depth=1, limit=100, sorted by publishedAt desc
  return <HomeFeedClient posts={posts} />
}

// Client component — handles toggle state and pagination
// src/components/HomeFeed/HomeFeedClient.tsx
'use client'

interface HomeFeedClientProps {
  posts: Post[]
}
```

**Filtering logic**:
- `both`: no category filter applied — all posts are shown
- `friday`: only posts whose `categories` array contains at least one slug in `FRIDAY_CATEGORY_SLUGS`
- `saturday`: only posts whose `categories` array contains at least one slug in `SATURDAY_CATEGORY_SLUGS`

**Category mapping**: Friday posts are those whose `categories` array contains any category with a `slug` matching the configured Friday slugs (e.g., `kubernetes`, `typescript`, `oauth2`, `self-hosting`, `devops`). Saturday posts match Saturday slugs (e.g., `electronics`, `personal`, `hobby`). The mapping is defined in a single config constant:

```ts
// src/components/HomeFeed/feedConfig.ts
export const FRIDAY_CATEGORY_SLUGS = ['kubernetes', 'typescript', 'oauth2', 'self-hosting', 'devops', 'programming']
export const SATURDAY_CATEGORY_SLUGS = ['electronics', 'personal', 'hobby', 'projects']
```

**Pagination**: Client-side. The filtered list is sliced to 10 items per page. Page state is held in React `useState`.

---

### PostCard

Redesigned card component replacing the current `src/components/Card/index.tsx`.

```tsx
interface PostCardProps {
  doc: CardPostData  // existing type: Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'heroImage'>
  relationTo: 'posts'
}
```

**Layout** (single column, compact):
```
┌─────────────────────────────────┐
│  Hero image (16:9 aspect ratio) │
├─────────────────────────────────┤
│  [Tag] [Tag]          Date      │
│  Title (h2, serif, linked)      │
│  Excerpt (max 160 chars…)       │
└─────────────────────────────────┘
```

**Hover state**: `box-shadow: 0 2px 8px rgba(0,0,0,0.12)` and border color transitions to `--primary`. No layout shift (shadow is inset or the card has a transparent border by default).

**Placeholder image**: When `heroImage` is absent, a `div` with `bg-primary/20` and the site logotype centered.

---

### Header

Redesigned `src/Header/Component.client.tsx`.

**Structure**:
```
┌──────────────────────────────────────────────────────────────────┐
│  Deploy on Friday/Saturday    [/]  [/about]  [🌙]  [☰ mobile]  │
└──────────────────────────────────────────────────────────────────┘
```

The logotype "Deploy on **Friday**/**Saturday**" is rendered with "Friday" and "Saturday" as interactive toggle segments (see DayNightToggle section above). The `FeedMode` state is managed here and passed down to `HomeFeedClient`.

- Sticky (`position: sticky; top: 0; z-index: 50`)
- On scroll: adds `backdrop-blur-sm bg-background/90 border-b border-border` via a scroll event listener
- Mobile: hamburger button toggles a slide-down nav drawer
- Dark mode toggle: replaces the existing `ThemeSelector` dropdown with a single icon button (sun/moon) that cycles light → dark → auto

**Interface**:
```tsx
// Component.client.tsx
'use client'
interface HeaderClientProps {
  data: Header  // Payload Header global type
}
```

---

### Footer

Redesigned `src/Footer/Component.tsx`.

- Background: always `bg-[#1E1E23]` (hardcoded, not a semantic token) — this is intentional per the design spec
- Text: always `text-[#FAF3E1]`
- Contains: site name, tagline/copyright, CMS nav links, optional social links
- `print:hidden` preserved

---

### PostHero

Redesigned `src/heros/PostHero/index.tsx`.

- Hero image: full-width, `aspect-video` (16:9) container, `object-cover`
- Title and metadata rendered **below** the image (not overlaid) for readability on mobile and to avoid contrast issues with arbitrary hero images
- Category tags rendered as pill badges above the title
- Author + date rendered below the title
- "Back to feed" link (`← All posts`) rendered as the first element

**Layout**:
```
← All posts

[Tag] [Tag]

# Post Title

By Author · Friday, 14 June 2025

[Hero Image — full width, 16:9]
```

---

### AboutPage

New hardcoded page at `src/app/(frontend)/about/page.tsx`.

```tsx
// No Payload CMS calls — static content
export default function AboutPage() { ... }
export const metadata: Metadata = { title: 'About — deployonfri.day' }
```

**Sections**:
1. Bio: author photo (`next/image`), name, short description
2. CV/Achievements: timeline or list of professional highlights, skills, notable projects
3. Contact/social links

Uses the same `container` class and typography tokens as the rest of the site.

---

## Data Models

No new Payload CMS collections or fields are required. The existing `Post` type already has:
- `title: string`
- `slug: string`
- `categories: Category[]` (with `title` and `slug`)
- `meta.description: string` (used as excerpt)
- `meta.image: Media` (used as hero image on cards)
- `heroImage: Media`
- `publishedAt: string`
- `populatedAuthors: Author[]`
- `content: LexicalRichText`
- `relatedPosts: Post[]`

The `HomeFeed` component requires `publishedAt` and `heroImage` to be included in the select query. The existing `posts/page.tsx` query will be updated to include these fields.

### Feed Mode State

```ts
// Stored in localStorage under key 'deployonfri-feed-mode'
type FeedMode = 'friday' | 'saturday' | 'both'
const DEFAULT_MODE: FeedMode = 'both'
```

The `HomeFeedClient` reads this on mount and writes it on toggle. The initial server render passes all posts; the client filters immediately after hydration. The default `'both'` mode shows all posts, so the server render and the initial client render are identical — no flash of filtered content.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Friday mode shows only Friday posts

*For any* collection of posts with mixed Friday and Saturday category slugs, when the feed is in **Friday_Mode** (single-mode, not `both`), every displayed post must have at least one category whose slug is in `FRIDAY_CATEGORY_SLUGS`, and no post with only Saturday-category slugs should appear.

**Validates: Requirements 3.2**

---

### Property 2: Saturday mode shows only Saturday posts

*For any* collection of posts with mixed Friday and Saturday category slugs, when the feed is in **Saturday_Mode** (single-mode, not `both`), every displayed post must have at least one category whose slug is in `SATURDAY_CATEGORY_SLUGS`, and no post with only Friday-category slugs should appear.

**Validates: Requirements 3.3**

---

### Property 3: Both mode shows all posts

*For any* collection of posts, when the feed is in **both** mode (the default), every post in the collection must appear in the rendered feed output — no post is filtered out regardless of its category slugs.

**Validates: Requirements 3.1, 3.2, 3.3**

---

### Property 4: Feed is sorted newest-first

*For any* collection of posts with varying `publishedAt` timestamps, the filtered and rendered post list must be ordered such that for every adjacent pair of posts `(a, b)`, `a.publishedAt >= b.publishedAt`.

**Validates: Requirements 3.5**

---

### Property 5: PostCard renders all required fields

*For any* post with a non-null `title`, `publishedAt`, at least one `category`, and a `meta.description`, the rendered `PostCard` output must contain the title text, the formatted date string, at least one category tag label, and the excerpt text.

**Validates: Requirements 3.6, 4.3, 4.5, 4.6**

---

### Property 6: Excerpt is always truncated to 160 characters

*For any* `meta.description` string of any length, the excerpt displayed in a `PostCard` must be at most 160 characters long. If the original string exceeds 160 characters, the displayed text must end with an ellipsis character.

**Validates: Requirements 4.4**

---

### Property 7: Feed pagination never exceeds 10 posts per page

*For any* filtered post list of any length, the number of `PostCard` elements rendered on a single page must be at most 10.

**Validates: Requirements 3.9**

---

### Property 8: PostHero contains author and date for any post

*For any* post with non-null `populatedAuthors` and `publishedAt`, the rendered `PostHero` must contain the author name string and the formatted publication date string.

**Validates: Requirements 5.3**

---

### Property 9: PostHero contains all category tags for any post

*For any* post with a non-empty `categories` array, the rendered `PostHero` must contain a label for every category in the array.

**Validates: Requirements 5.4**

---

### Property 10: Body text contrast ratio meets WCAG AA

*For any* foreground/background color pair drawn from the brand palette that is used for body text, the computed WCAG contrast ratio must be at least 4.5:1.

**Validates: Requirements 11.1**

---

### Property 11: Large text contrast ratio meets WCAG AA

*For any* foreground/background color pair drawn from the brand palette that is used for large text (≥18px regular or ≥14px bold), the computed WCAG contrast ratio must be at least 3:1.

**Validates: Requirements 11.2**

---

### Property 12: All rendered images use next/image with a sizes prop

*For any* image rendered within a `PostCard`, `PostHero`, or `AboutPage`, the underlying DOM element must be a Next.js `<Image>` component output (i.e., uses `srcset`) and must have a non-empty `sizes` attribute.

**Validates: Requirements 10.5**

---

## Error Handling

### Missing hero image on PostCard
When `meta.image` is null or undefined, `PostCard` renders a placeholder `div` with `bg-primary/20` and a centered site logo. No broken image icon is shown.

### Missing excerpt
When `meta.description` is null or empty, the excerpt area is omitted entirely from the card. The card remains valid and clickable.

### Feed mode with no matching posts
When the active feed mode has zero matching posts, the feed renders a mode-specific empty state message:
- Friday mode: *"No Friday posts yet — check back soon."*
- Saturday mode: *"No Saturday posts yet — check back soon."*
- Both mode: *"No posts yet — check back soon."*

### Giscus load failure
Giscus loads in an iframe. If it fails to load (network error, GitHub outage), the surrounding container collapses gracefully. No error boundary is needed since Giscus is isolated in an iframe.

### Font load failure
`next/font` with `display: 'swap'` is used. If Libre Baskerville fails to load, the browser falls back to the generic `serif` stack. The layout does not shift because `next/font` injects the `@font-face` rule server-side.

### Dark mode flash
The existing `InitTheme` inline script runs `beforeInteractive` and sets `data-theme` on `<html>` before paint. The `html { opacity: 0 }` / `html[data-theme] { opacity: initial }` pattern in `globals.css` prevents a flash of unstyled content. This is preserved unchanged.

---

## Testing Strategy

### Unit Tests (example-based)

Focus on specific behaviors and edge cases:

- `PostCard` renders placeholder when `heroImage` is absent
- `PostCard` renders all required fields for a complete post fixture
- `Header` renders mobile menu button at narrow viewport
- `Header` renders dark mode toggle
- `Header` adds scroll shadow class after scroll event
- `Header` logotype toggle: clicking "Friday" when in `both` mode switches to `friday`
- `Header` logotype toggle: clicking "Saturday" when in `both` mode switches to `saturday`
- `Header` logotype toggle: clicking the active word when in single mode resets to `both`
- `Header` logotype toggle: both words are highlighted in `both` mode; only the active word is highlighted in single modes
- `HomeFeed` renders empty state for each of the three modes when no posts match
- `AboutPage` renders bio and CV sections
- `PostPage` renders "Back to feed" link
- `PostPage` renders `GiscusComments` after article body
- Dark mode toggle announces change via `aria-live` region

### Property-Based Tests

Uses **fast-check** (already compatible with the TypeScript/Node stack; add as a dev dependency).

Each property test runs a minimum of **100 iterations**.

Tag format: `// Feature: blog-theme-redesign, Property N: <property text>`

| Property | Generator inputs | Assertion |
|---|---|---|
| P1: Friday filter | Random post arrays with mixed category slugs | All results have ≥1 Friday slug (single-mode only) |
| P2: Saturday filter | Random post arrays with mixed category slugs | All results have ≥1 Saturday slug (single-mode only) |
| P3: Both mode shows all posts | Random post arrays of any category composition | All input posts appear in the rendered output |
| P4: Feed sort order | Random post arrays with arbitrary `publishedAt` dates | Adjacent pairs satisfy `a.date >= b.date` |
| P5: PostCard completeness | Random posts with valid required fields | Rendered output contains title, date, tag, excerpt |
| P6: Excerpt truncation | Arbitrary strings of any length | Rendered excerpt ≤ 160 chars; ends with `…` if truncated |
| P7: Pagination limit | Random post arrays of length 1–100 | Rendered page contains ≤ 10 cards |
| P8: PostHero author+date | Random posts with author and date | Rendered hero contains author name and date string |
| P9: PostHero categories | Random posts with 1–5 categories | Rendered hero contains all category titles |
| P10: Body contrast | All light/dark foreground+background pairs | WCAG contrast ≥ 4.5:1 |
| P11: Large text contrast | All light/dark foreground+background pairs | WCAG contrast ≥ 3:1 |
| P12: Image sizes prop | Random image resource objects | Rendered `<img>` has non-empty `sizes` attribute |

### Integration Tests

- Footer renders CMS nav items when provided (1–3 examples with mock Payload data)
- `Media` component passes `alt` prop from Payload media `alt` field

### Smoke Tests / Visual Review

- All six CSS custom properties are defined in `:root` with correct HSL values
- `[data-theme='dark']` block has correct inverted background/foreground values
- `--radius` is set to `0.25rem` (4px)
- Footer has `bg-[#1E1E23]` class unconditionally
- `print:hidden` is applied to Header, Footer, GiscusComments, RelatedPosts
- Libre Baskerville is loaded via `next/font` in `layout.tsx`
- `/about` route returns 200
- Sticky positioning class is applied to header
- Focus-visible CSS classes are applied to nav links
- Visual review at 320px, 768px, 1280px viewports for horizontal overflow
- Visual review of hover states using palette color transitions
- Visual review of mid-century decorative elements
