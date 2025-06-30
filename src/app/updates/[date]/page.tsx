import { notFound } from "next/navigation"
import PostHero from "@/components/pages/updates/PostHero"
import { ClientPost } from "@/components/pages/updates/ClientPost"
import { readFileSync } from "fs"
import { join } from "path"

const FALLBACKS = ["/jpg/post.jpg", "/jpg/post1.jpg", "/jpg/post2.jpg", "/jpg/post3.jpg"]

export default async function Page({ params }: { params: { date: string } }) {
  const { date } = params

  try {
    // Read cached posts from JSON
    const cachePath = join(process.cwd(), 'public', 'cached-posts.json')
    const cacheData = JSON.parse(readFileSync(cachePath, 'utf-8'))
    const posts = cacheData.posts || []

    // Find the post by date
    const post = posts.find((p: any) => p.date === date)
    if (!post) {
      return notFound()
    }

    // Fallback image logic
    let image = post.image && post.image.trim() !== "" ? post.image : null
    if (!image) {
      // Find the index of the current post
      const postIndex = posts.findIndex((p: any) => p.date === date)
      if (postIndex !== -1) {
        image = FALLBACKS[postIndex % FALLBACKS.length]
      } else {
        image = FALLBACKS[0]
      }
    }

    return (
      <section className="relative mx-auto px-4 pb-64 bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
        <PostHero
          post={{
            image,
            title: post.title,
            summary: post.summary,
            date: post.date,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 mt-12 text-white">
          <ClientPost code={post.body} title={post.title} date={post.date} />
        </div>
      </section>
    )
  } catch (error) {
    console.error("Error reading cached post:", error)
    return notFound()
  }
}
