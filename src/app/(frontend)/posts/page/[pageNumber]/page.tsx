import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
  searchParams: Promise<{ category?: string }>
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const searchParams = await searchParamsPromise
  const categoryFilter = searchParams.category
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  // Build where condition based on category filter
  const whereCondition: any = {}

  if (categoryFilter) {
    // Normalize category name (capitalize first letter)
    const normalizedCategory = categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1).toLowerCase()

    // Fetch the category by title to get its ID
    const categories = await payload.find({
      collection: 'categories',
      where: {
        title: {
          equals: normalizedCategory,
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
    page: sanitizedPageNumber,
    overrideAccess: false,
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
        {posts?.page && posts?.totalPages > 1 && (
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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Deploy on Friday Posts Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
