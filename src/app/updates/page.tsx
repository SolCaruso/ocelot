import type { Metadata } from "next"
import BlogPageClient from "@/components/pages/updates/BlogPageClient"
import { readFileSync } from "fs"
import { join } from "path"

interface BlogPost {
  id: number
  date: string
  title: string
  summary: string
  body: string
  image?: string | null
}

export const metadata: Metadata = {
  title: "Updates & News",
  description: "Stay updated with the latest news, announcements, and development updates for Guild Saga games. Follow our journey in tactical RPG development.",
  keywords: ["Guild Saga updates", "game news", "development updates", "tactical RPG news", "gaming announcements", "blog"],
  openGraph: {
    title: "Guild Saga Updates & News",
    description: "Stay updated with the latest news, announcements, and development updates for Guild Saga games.",
    images: [
      {
        url: '/webp/post.webp',
        width: 1200,
        height: 630,
        alt: 'Guild Saga Updates',
      },
    ],
  },
  twitter: {
    title: "Guild Saga Updates & News",
    description: "Stay updated with the latest news, announcements, and development updates for Guild Saga games.",
    images: ['/webp/post.webp'],
  },
  alternates: {
    canonical: '/updates',
  },
}

export default async function UpdatesPage() {
  let allPosts: BlogPost[] = []
  try {
    const cachePath = join(process.cwd(), 'public', 'cached-posts.json')
    const cacheData = JSON.parse(readFileSync(cachePath, 'utf-8'))
    allPosts = cacheData.posts || []
  } catch (error) {
    console.error("Error reading cached blog posts:", error)
    allPosts = []
  }

  return <BlogPageClient allPosts={allPosts} />
}