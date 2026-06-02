# Image Lightbox — Design Spec

**Date:** 2026-06-02  
**Status:** Approved

## Overview

Add a click-to-expand lightbox to MediaBlock images embedded in post bodies. Clicking an image opens a full-screen dark overlay with the image, its Payload caption, a position counter, and prev/next navigation between all images in the post.

## Scope

- **Triggers:** MediaBlock images in post bodies only (`src/blocks/MediaBlock/Component.tsx`)
- **Excluded:** Hero images, card thumbnails, pages, homelab page
- **Navigation:** Prev/next arrows cycle through all MediaBlock images in the current post (wrapping around)
- **Caption:** Rendered from the Payload media object's `caption` field (Lexical `SerializedEditorState`); hidden if absent
- **Counter:** "2 / 4" style; hidden when there is only one image

## Architecture

`LightboxProvider` (new client component) wraps the article content in the server-rendered post page. Each `MediaBlock` registers its image data into the context on mount and calls `open(index)` on click. The `LightboxDialog` lives inside the provider and renders via the native `<dialog>` element.

```
page.tsx (Server Component)
└─ <LightboxProvider>          ← NEW client component
   └─ <article>
      ├─ <PostHero>            (unchanged)
      └─ <RichText>            (unchanged)
         └─ <MediaBlock>       ← MODIFIED: 'use client', register + onClick
            └─ <ImageMedia>    (unchanged)
   └─ <LightboxDialog>         ← NEW: <dialog> portal, rendered by Provider
```

## Files

| File | Change |
|------|--------|
| `src/components/Lightbox/index.tsx` | NEW — context, provider, hook, dialog UI |
| `src/blocks/MediaBlock/Component.tsx` | MODIFY — add `'use client'`, register on mount, click handler |
| `src/app/(frontend)/posts/[slug]/page.tsx` | MODIFY — wrap article content with `<LightboxProvider>` |

## Component Details

### `src/components/Lightbox/index.tsx`

Exports:
- `LightboxContext` — React context
- `LightboxProvider` — client component; wraps children, owns state, renders dialog
- `useLightbox` — hook for MediaBlock to register and open

**State model:**
```typescript
type LightboxImage = {
  src: string
  alt: string
  caption?: SerializedEditorState | null
  width?: number
  height?: number
}

// Provider state
images: LightboxImage[]          // ordered by DOM mount order
currentIndex: number | null      // null = closed
```

**Registration:** `register(image: LightboxImage)` adds to the images array and returns a cleanup function that removes it on unmount. Uses a `useRef` registry to avoid stale closure issues; only `currentIndex` and `images.length` are in `useState` to minimise re-renders.

**`LightboxDialog`** renders inside the provider as a `<dialog>` element:
- Dark overlay: `rgba(0, 0, 0, 0.93)` full-screen
- Image: plain `<img>` tag with `max-width: 90vw; max-height: 70vh; object-fit: contain` — the lightbox already holds the full-res URL and dimensions from Payload, so `next/image` optimisation is not needed here
- Caption: `<RichText>` component (reuses existing); hidden if `caption` is null
- Counter: `"{current + 1} / {total}"` string; hidden when `total === 1`
- Arrows: circular icon buttons (‹ ›), wrap-around
- Close button: ✕ top-right corner
- Keyboard: `Escape` closes, `ArrowLeft`/`ArrowRight` navigates
- Click on overlay backdrop closes the dialog
- `dialog.showModal()` / `dialog.close()` for native focus trapping and scroll lock

### `src/blocks/MediaBlock/Component.tsx`

- Add `'use client'` directive
- Import `useLightbox`
- On mount (`useEffect`): call `register({ src, alt, caption, width, height })`, store returned index ref, call cleanup on unmount
- Wrap the `<Media>` element in a `<button>` (for accessibility) with `onClick={() => open(index)}` and `cursor-pointer` styling
- Add `title="Click to enlarge"` on the button for discoverability

### `src/app/(frontend)/posts/[slug]/page.tsx`

Wrap the article content section with `<LightboxProvider>`. The provider is a client component but can accept server-rendered children (standard Next.js pattern).

## UX Behaviour

| Interaction | Result |
|-------------|--------|
| Click image | Opens lightbox at that image's index |
| Click overlay / ✕ / Esc | Closes lightbox |
| ← / → keyboard | Previous / next image (wrapping) |
| Arrow buttons | Previous / next image (wrapping) |
| Single image in post | Counter hidden; arrows hidden |
| Image has no caption | Caption line hidden |
| Tab key | Cycles through close and arrow buttons (native `<dialog>` focus trap) |

## Animation

- Overlay: CSS `opacity` fade-in (150ms ease-out) via `@keyframes` or Tailwind `transition`
- No scale/slide — keeps it simple and fast

## Edge Cases

- **Zero images registered:** Provider renders no dialog; safe no-op
- **React Strict Mode double-mount:** Registration uses a ref-based array with proper cleanup; double-register/unregister is safe
- **Image load error:** `next/image` handles this; no special lightbox handling needed
- **Very tall images:** `max-height: 70vh` ensures the caption and counter always remain visible below
