import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const formatURL = (url) => {
  if (!url) return undefined
  return url.startsWith('http') ? url : `https://${url}`
}

const NEXT_PUBLIC_SERVER_URL = formatURL(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  ? formatURL(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig)
