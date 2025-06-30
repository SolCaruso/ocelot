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