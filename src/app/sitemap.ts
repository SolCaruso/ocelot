import { MetadataRoute } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'

interface BlogPost {
  id: number
  date: string
  title: string
  summary: string
  body: string
  image?: string | null
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://guildsaga.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/lab`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Dynamic blog posts
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const cachePath = join(process.cwd(), 'public', 'cached-posts.json')
    const cacheData = JSON.parse(readFileSync(cachePath, 'utf-8'))
    const posts: BlogPost[] = cacheData.posts || []
    
    blogPosts = posts.map((post) => ({
      url: `${baseUrl}/updates/${post.date}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error("Error reading cached blog posts for sitemap:", error)
  }

  return [...staticPages, ...blogPosts]
}
