'use client'

import React, { useState } from 'react'
import type { Post } from '@/payload-types'
import { Card } from '@/components/Card'

const POSTS_PER_PAGE = 10

interface HomeFeedClientProps {
  posts: Post[]
}

function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return dateB - dateA
  })
}

export function HomeFeedClient({ posts }: HomeFeedClientProps) {
  const [page, setPage] = useState(1)
  const sorted = sortPostsByDate(posts)
  const totalPages = Math.ceil(sorted.length / POSTS_PER_PAGE)
  const paginated = sorted.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  return (
    <div className="w-full">
      {sorted.length === 0 ? (
        <p className="text-muted-foreground text-center py-16 text-lg">
          No posts yet — check back soon.
        </p>
      ) : (
        <>
          <div className="flex flex-col">
            {paginated.map((post, index) => (
              <React.Fragment key={post.id}>
                {index > 0 && <hr className="border-border my-10" />}
                <Card doc={post} relationTo="posts" showCategories />
              </React.Fragment>
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Feed pagination" className="flex items-center justify-center gap-4 mt-12">
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
