// next.config.ts
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.discordapp.com',
      'media.discordapp.net',
      'docs.guildsaga.com'
    ],
  },
  webpack(config: any, options: any) {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
    }
    return config
  },
}

export default nextConfig