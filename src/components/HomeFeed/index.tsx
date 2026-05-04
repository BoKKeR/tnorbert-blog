import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Post } from '@/payload-types'
import { HomeFeedClient } from './HomeFeedClient'

export async function HomeFeed() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
      publishedAt: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const posts = result.docs as Post[]

  return <HomeFeedClient posts={posts} />
}
