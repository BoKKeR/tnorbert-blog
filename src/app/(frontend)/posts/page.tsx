import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page(props: { searchParams: Promise<{ category?: string }> }) {
  const payload = await getPayload({ config: configPromise })
  const searchParams = await props.searchParams
  const categoryFilter = searchParams.category

  // Build where condition based on category filter
  const whereCondition: any = {}

  if (categoryFilter) {
    // Fetch the category by title to get its ID
    const categories = await payload.find({
      collection: 'categories',
      where: {
        title: {
          equals: categoryFilter,
        },
      },
      limit: 1,
    })

    if (categories.docs.length > 0) {
      whereCondition.categories = {
        in: [categories.docs[0].id],
      }
    }
  }

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    ...(Object.keys(whereCondition).length > 0 ? { where: whereCondition } : {}),
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{categoryFilter ? `${categoryFilter} Posts` : 'Posts'}</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination
            page={posts.page}
            totalPages={posts.totalPages}
            categoryFilter={categoryFilter}
          />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Deploy on Friday Posts`,
  }
}
