'use client'

import React, { useState } from 'react'
import type { Post } from '@/payload-types'
import { Card } from '@/components/Card'
import { useFeedMode } from './FeedModeContext'
import { FRIDAY_CATEGORY_SLUGS, SATURDAY_CATEGORY_SLUGS } from './feedConfig'
import type { FeedMode } from './feedConfig'

const POSTS_PER_PAGE = 10

interface HomeFeedClientProps {
  posts: Post[]
}

function getPostCategorySlugs(post: Post): string[] {
  if (!post.categories || !Array.isArray(post.categories)) return []
  return post.categories.flatMap((cat) => {
    if (typeof cat === 'object' && cat !== null && 'slug' in cat) {
      return [cat.slug as string]
    }
    return []
  })
}

function filterPosts(posts: Post[], mode: FeedMode): Post[] {
  if (mode === 'both') return posts

  const targetSlugs = mode === 'friday' ? FRIDAY_CATEGORY_SLUGS : SATURDAY_CATEGORY_SLUGS

  return posts.filter((post) => {
    const slugs = getPostCategorySlugs(post)
    return slugs.some((slug) => targetSlugs.includes(slug))
  })
}

function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return dateB - dateA
  })
}

function getEmptyStateMessage(mode: FeedMode): string {
  if (mode === 'friday') return 'No Friday posts yet — check back soon.'
  if (mode === 'saturday') return 'No Saturday posts yet — check back soon.'
  return 'No posts yet — check back soon.'
}

export function HomeFeedClient({ posts }: HomeFeedClientProps) {
  const { feedMode } = useFeedMode()
  const [page, setPage] = useState(1)

  // Reset to page 1 when feed mode changes
  React.useEffect(() => {
    setPage(1)
  }, [feedMode])

  const filtered = filterPosts(posts, feedMode)
  const sorted = sortPostsByDate(filtered)

  const totalPages = Math.ceil(sorted.length / POSTS_PER_PAGE)
  const startIndex = (page - 1) * POSTS_PER_PAGE
  const paginated = sorted.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return (
    <div className="w-full">
      {sorted.length === 0 ? (
        <p className="text-muted-foreground text-center py-16 text-lg">
          {getEmptyStateMessage(feedMode)}
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {paginated.map((post) => (
              <Card
                key={post.id}
                doc={post}
                relationTo="posts"
                showCategories
              />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Feed pagination"
              className="flex items-center justify-center gap-4 mt-12"
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="px-4 py-2 border border-border rounded text-sm font-serif hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>

              <span className="text-sm text-muted-foreground font-serif">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="px-4 py-2 border border-border rounded text-sm font-serif hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  )
}
