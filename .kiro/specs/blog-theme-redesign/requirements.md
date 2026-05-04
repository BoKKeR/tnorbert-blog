# Requirements Document

## Introduction

This document defines the requirements for a complete visual redesign and theme overhaul of **deployonfri.day**, a Payload CMS-powered blog built on Next.js. The site is authored by a developer who publishes technical posts on Fridays (Kubernetes, OAuth2, TypeScript, self-hosting) and hobby posts on Saturdays (electronics, personal projects). The redesign targets a mid-century modern aesthetic — warm, readable, and approachable — using a defined color palette. The homepage acts as the primary blog feed, comments are powered by Utterances (via Giscus), and an About Me / CV page showcases the author's achievements.

---

## Glossary

- **Site**: The deployonfri.day Next.js/Payload CMS blog application
- **Theme_System**: The CSS custom property and Tailwind configuration layer that controls all visual tokens (colors, typography, spacing, radius)
- **Homepage_Feed**: The root `/` route that renders a paginated list of post cards
- **Post_Card**: A UI component that displays a post's hero image, title, category tag, and excerpt on the feed
- **Post_Page**: The full article view rendered at `/posts/[slug]`
- **About_Page**: A hardcoded Next.js page at `/about` presenting the author's bio and CV
- **Header**: The site-wide navigation bar rendered at the top of every page
- **Footer**: The site-wide footer rendered at the bottom of every page
- **Color_Palette**: The six brand colors: `#FAF3E1` (warm cream, primary background), `#1E1E23` (near-black, primary text), `#00AD38` (green, primary accent), `#3A6CFA` (blue, secondary accent), `#FF5200` (orange-red, highlight), `#FFA51E` (amber, highlight)
- **Typography_Scale**: The set of font families, sizes, weights, and line-heights applied across the Site
- **Utterances**: The GitHub-issues-based comment system integrated via the Giscus React component
- **Dark_Mode**: An alternate theme variant activated by user preference or system setting
- **Post_Hero**: The full-width header image and metadata block displayed at the top of a Post_Page
- **Excerpt**: A short plain-text summary of a post, sourced from `meta.description`
- **Category_Tag**: A styled label indicating the post's category (e.g., "Kubernetes", "TypeScript", "Electronics")
- **Day_Night_Toggle**: A prominent homepage UI control that switches the feed between "Deploy on Friday" (work/technical posts) and "Deploy on Saturday" (hobby/personal posts), representing the primary navigation concept for the feed
- **Friday_Mode**: The feed state showing only work and technical posts (Kubernetes, OAuth2, TypeScript, self-hosting, etc.)
- **Saturday_Mode**: The feed state showing only hobby and personal project posts (electronics, personal projects, etc.)

---

## Requirements

### Requirement 1: Color Palette and CSS Token System

**User Story:** As a site visitor, I want the site to use a warm, cohesive color palette, so that the reading experience feels inviting and visually distinct from generic tech blogs.

#### Acceptance Criteria

1. THE Theme_System SHALL define CSS custom properties for all six Color_Palette values and map them to Tailwind semantic tokens (`--background`, `--foreground`, `--primary`, `--accent`, `--destructive`, `--muted`, and their foreground counterparts).
2. THE Theme_System SHALL set `#FAF3E1` as the default light-mode background (`--background`) and `#1E1E23` as the default light-mode foreground (`--foreground`).
3. THE Theme_System SHALL set `#00AD38` as the primary accent color (`--primary`) and `#3A6CFA` as the secondary accent color (`--accent`).
4. THE Theme_System SHALL set `#FF5200` as the destructive/highlight color (`--destructive`) and `#FFA51E` as the warning/amber highlight color (`--warning`).
5. WHEN the user activates Dark_Mode, THE Theme_System SHALL switch the background to `#1E1E23` and the foreground to `#FAF3E1`, preserving all accent colors.
6. THE Theme_System SHALL expose all color tokens as Tailwind utility classes so that all components can reference them without hardcoded hex values.

---

### Requirement 2: Typography System

**User Story:** As a site visitor, I want clear, readable typography with a mid-century modern character, so that long-form technical articles are comfortable to read.

#### Acceptance Criteria

1. THE Typography_Scale SHALL use Libre Baskerville as the primary serif font for both body text and headings, with a minimum body size of 18px and a line-height of at least 1.7 on Post_Page content.
2. THE Typography_Scale SHALL apply Libre Baskerville to all headings (`h1`–`h3`) to maintain typographic consistency with the mid-century editorial character of the font.
3. THE Typography_Scale SHALL define a monospace font for inline code and code blocks, distinct from the body font.
4. THE Site SHALL load Libre Baskerville using Next.js font optimization (`next/font`) to avoid layout shift and external font requests.
5. WHEN a Post_Page is rendered, THE Typography_Scale SHALL apply a maximum prose width of 72 characters (approximately `48rem`) to the article body to maintain optimal line length.
6. THE Typography_Scale SHALL define heading sizes using a modular scale with at least four distinct levels (`h1`, `h2`, `h3`, `h4`).

---

### Requirement 3: Homepage as Blog Feed with Day/Night Toggle

**User Story:** As a site visitor, I want the homepage to prominently distinguish between work posts and hobby posts via a day/night toggle, so that I can immediately navigate to the type of content I'm interested in.

#### Acceptance Criteria

1. THE Homepage_Feed SHALL display a prominent Day_Night_Toggle at the top of the feed, visually styled as a large day/night or work/hobby switch.
2. WHEN the Day_Night_Toggle is in Friday_Mode, THE Homepage_Feed SHALL display only work and technical Post_Cards (e.g., Kubernetes, OAuth2, TypeScript, self-hosting).
3. WHEN the Day_Night_Toggle is in Saturday_Mode, THE Homepage_Feed SHALL display only hobby and personal project Post_Cards (e.g., electronics, personal projects).
4. THE Day_Night_Toggle SHALL be the primary navigation concept for the feed, not a secondary filter — it SHALL be rendered as a visually dominant element above the post list.
5. THE Homepage_Feed SHALL display a single-column list of Post_Cards ordered by `publishedAt` descending (newest first) within the active mode.
6. WHEN a Post_Card is rendered, THE Homepage_Feed SHALL display the post's hero image, title, Category_Tag(s), publication date, and Excerpt.
7. THE Homepage_Feed SHALL NOT render the full article body on the homepage — only the Excerpt.
8. WHEN a visitor clicks a Post_Card, THE Homepage_Feed SHALL navigate the visitor to the corresponding Post_Page at `/posts/[slug]`.
9. THE Homepage_Feed SHALL support pagination, displaying a maximum of 10 posts per page within the active mode.
10. WHEN fewer than 10 posts exist in the active mode, THE Homepage_Feed SHALL display all available posts without a pagination control.

---

### Requirement 4: Post Card Component

**User Story:** As a site visitor, I want each post preview to be visually appealing and information-dense, so that I can assess a post's relevance at a glance.

#### Acceptance Criteria

1. THE Post_Card SHALL display the hero image in a fixed-aspect-ratio container (16:9) above the text content.
2. IF a post has no hero image, THEN THE Post_Card SHALL display a styled placeholder using the Color_Palette's primary accent color.
3. THE Post_Card SHALL display the post title as a linked heading using the Typography_Scale's heading style.
4. THE Post_Card SHALL display the Excerpt truncated to a maximum of 160 characters, appending an ellipsis when truncated.
5. THE Post_Card SHALL display the publication date formatted as a human-readable string (e.g., "Friday, 14 June 2025").
6. THE Post_Card SHALL display at least one Category_Tag styled as a pill badge using the Color_Palette accent colors.
7. WHEN a visitor hovers over a Post_Card, THE Post_Card SHALL apply a visible focus/hover state (e.g., subtle shadow or border color change) without layout shift.

---

### Requirement 5: Post Page Layout

**User Story:** As a reader, I want a focused, distraction-free article layout, so that I can read long-form technical content comfortably.

#### Acceptance Criteria

1. THE Post_Page SHALL render the Post_Hero at the top, displaying the hero image full-width with the post title and metadata overlaid or immediately below.
2. THE Post_Page SHALL render the article body using the Typography_Scale's prose styles with the `@tailwindcss/typography` plugin.
3. THE Post_Page SHALL display the author name and publication date in the Post_Hero area.
4. THE Post_Page SHALL display Category_Tag(s) in the Post_Hero area.
5. WHEN a Post_Page is rendered, THE Post_Page SHALL include a "Back to feed" navigation link returning the visitor to the Homepage_Feed.
6. THE Post_Page SHALL render the Utterances comment section below the article body using the Giscus component.
7. THE Post_Page SHALL render related posts (if available) below the comment section.
8. WHEN a visitor prints a Post_Page, THE Post_Page SHALL hide the Header, Footer, comment section, and related posts, preserving only the article content.

---

### Requirement 6: Header Component

**User Story:** As a site visitor, I want a clear, minimal navigation header, so that I can move between the feed, about page, and other sections without confusion.

#### Acceptance Criteria

1. THE Header SHALL display the site name "deployonfri.day" as a styled logotype linking to the Homepage_Feed.
2. THE Header SHALL include navigation links to at minimum: the Homepage_Feed (`/`) and the About_Page (`/about`).
3. THE Header SHALL include a Dark_Mode toggle control.
4. WHEN the viewport width is below 768px, THE Header SHALL collapse navigation links into a mobile-friendly menu (hamburger or equivalent).
5. THE Header SHALL remain visible at the top of the viewport during scrolling (sticky positioning).
6. WHEN the page is scrolled past the top, THE Header SHALL apply a subtle background fill or shadow to maintain legibility against page content.

---

### Requirement 7: Footer Component

**User Story:** As a site visitor, I want a footer with relevant links and attribution, so that I can find secondary navigation and understand the site's identity.

#### Acceptance Criteria

1. THE Footer SHALL display the site name and a brief tagline or copyright notice.
2. THE Footer SHALL include navigation links managed via the Payload CMS Footer global.
3. THE Footer SHALL use the Color_Palette's near-black (`#1E1E23`) as its background in both light and dark modes.
4. THE Footer SHALL display social or external links (e.g., GitHub) if configured in the CMS.
5. THE Footer SHALL NOT display in print mode.

---

### Requirement 8: About Me / CV Page

**User Story:** As a potential collaborator or employer, I want to read about the author's background and achievements, so that I can assess their expertise and contact them.

#### Acceptance Criteria

1. THE About_Page SHALL be accessible at the `/about` URL slug.
2. THE About_Page SHALL display a bio section with the author's name, photo (if provided), and a short personal description.
3. THE About_Page SHALL display a CV / achievements section listing professional highlights, skills, or notable projects.
4. THE About_Page SHALL be implemented as a hardcoded Next.js page and does not require CMS editability.
5. THE About_Page SHALL use the same Typography_Scale and Color_Palette as the rest of the Site.

---

### Requirement 9: Mid-Century Modern Design Language

**User Story:** As a site visitor, I want the visual design to feel warm and characterful rather than generic and corporate, so that the blog has a memorable identity.

#### Acceptance Criteria

1. THE Site SHALL use rounded corners with a border-radius of 4px or less on interactive elements (cards, buttons, badges) to reflect a restrained, mid-century aesthetic rather than a pill-heavy modern UI.
2. THE Site SHALL NOT use drop shadows heavier than `0 2px 8px rgba(0,0,0,0.12)` on any component.
3. THE Site SHALL use the Color_Palette's warm cream (`#FAF3E1`) as the page background in light mode to avoid harsh white contrast.
4. THE Site SHALL apply decorative typographic elements (e.g., large drop caps, ruled dividers, or section ornaments) to reinforce the mid-century editorial style, where supported by the CMS content model.
5. WHEN interactive elements (links, buttons, tags) are rendered, THE Site SHALL use color transitions from the Color_Palette rather than generic grey hover states.

---

### Requirement 10: Responsive Layout

**User Story:** As a visitor reading on a mobile device, I want the site to be fully usable on small screens, so that I can read articles on the go.

#### Acceptance Criteria

1. THE Site SHALL render correctly at viewport widths of 320px, 768px, and 1280px without horizontal overflow.
2. THE Homepage_Feed SHALL use a single-column list layout at all viewport widths.
3. THE Post_Page SHALL maintain the 48rem prose width constraint on large screens and expand to full width minus padding on small screens.
4. THE Header SHALL adapt to mobile viewports per Requirement 6, Criterion 4.
5. WHEN images are rendered, THE Site SHALL use Next.js `<Image>` with responsive `sizes` attributes to serve appropriately sized images at each breakpoint.

---

### Requirement 11: Accessibility

**User Story:** As a visitor using assistive technology, I want the site to be navigable and readable, so that I am not excluded from the content.

#### Acceptance Criteria

1. THE Site SHALL achieve a minimum contrast ratio of 4.5:1 for all body text against its background, as defined by WCAG 2.1 AA.
2. THE Site SHALL achieve a minimum contrast ratio of 3:1 for all large text (≥18px bold or ≥24px regular) against its background.
3. THE Site SHALL provide descriptive `alt` text for all meaningful images via the Payload CMS media alt field.
4. THE Header navigation SHALL be keyboard-navigable with visible focus indicators.
5. THE Site SHALL use semantic HTML elements (`<article>`, `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>`) throughout all page templates.
6. WHEN a Dark_Mode toggle is activated, THE Site SHALL announce the theme change to screen readers via an `aria-live` region or equivalent.

