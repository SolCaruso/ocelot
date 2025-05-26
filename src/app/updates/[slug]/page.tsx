import { notFound } from "next/navigation"
import PostHero from "@/components/updates/PostHero"
import { ClientPost } from "@/components/updates/ClientPost"
import { getPostBySlug } from "@/lib/discord"
import fs from "fs/promises"
import path from "path"

// Revalidate every 5 minutes
export const revalidate = 300

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let post = null

  // Try to load from latestPosts.json first
  try {
    const filePath = path.join(process.cwd(), "public", "latestPosts.json")
    const file = await fs.readFile(filePath, "utf-8")
    const posts = JSON.parse(file)
    post = posts.find((p: any) => p.slug === slug)
  } catch (err) {
    // Ignore and fall back to API
  }

  // Fallback to API fetch if not found in JSON
  if (!post) {
    try {
      post = await getPostBySlug(slug)
    } catch (err) {
      console.error(`Error fetching post for slug ${slug}:`, err)
      return notFound()
    }
  }

  if (!post) {
    return notFound()
  }

  return (
    <section className="relative mx-auto px-4 pb-64 bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
      <PostHero
        post={{
          image: post.imageUrl,
          title: post.title,
          summary: post.summary,
          date: post.date,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 mt-12 text-white">
        <ClientPost code={post.bodyMd} title={post.title} date={post.date} />
      </div>
    </section>
  )
}
