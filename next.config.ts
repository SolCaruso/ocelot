// next.config.ts
import path from 'path'
import { withContentlayer } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.discordapp.com',
      'media.discordapp.net'
    ],
  },
  webpack(config: any, options: any) {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      'contentlayer/generated': path.resolve(
        process.cwd(),
        '.contentlayer/generated'
      ),
    }
    return config
  },
}

export default withContentlayer(nextConfig)
