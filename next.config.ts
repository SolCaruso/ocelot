// next.config.ts
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'ejktdpjnbhbgmavwltvb.supabase.co',
    ],
  },
  turbopack: {},
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig