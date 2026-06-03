import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const siteUrl = getServerSideURL()

  const { docs: posts } = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    sort: '-publishedAt',
  })

  const lastBuildDate =
    posts[0]?.publishedAt ? new Date(posts[0].publishedAt).toUTCString() : new Date().toUTCString()

  const items = posts
    .filter((p) => p.slug && p.publishedAt)
    .map((p) => {
      const url = `${siteUrl}/posts/${p.slug}`
      const title = escapeXml(p.title ?? '')
      const description = p.meta?.description ? escapeXml(p.meta.description) : ''
      const pubDate = new Date(p.publishedAt!).toUTCString()
      const author = p.populatedAuthors?.[0]?.name
        ? escapeXml(p.populatedAuthors[0].name)
        : ''

      return [
        '    <item>',
        `      <title>${title}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        description ? `      <description>${description}</description>` : '',
        author ? `      <author>${author}</author>` : '',
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>deployonfri.day</title>
    <link>${siteUrl}</link>
    <description>A personal tech blog by Norbert Takács</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
