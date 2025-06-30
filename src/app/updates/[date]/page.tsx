import { notFound } from "next/navigation"
import PostHero from "@/components/pages/updates/PostHero"
import { ClientPost } from "@/components/pages/updates/ClientPost"
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

function formatDateUTC(dateString: string): string {
  try {
    // Parse as UTC, not local time
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(Date.UTC(year, month - 1, day))
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  } catch {
    return dateString
  }
}

const FALLBACKS = ["/jpg/post.jpg", "/jpg/post1.jpg", "/jpg/post2.jpg", "/jpg/post3.jpg"]

export default async function Page({ params }: { params: { date: string } }) {
  const { date } = params

  try {
    // Read cached posts from JSON
    const cachePath = join(process.cwd(), 'public', 'cached-posts.json')
    const cacheData = JSON.parse(readFileSync(cachePath, 'utf-8'))
    const posts: BlogPost[] = cacheData.posts || []

    // Find the post by date
    const post = posts.find((p: BlogPost) => p.date === date)
    if (!post) {
      return notFound()
    }

    // Fallback image logic
    let image = post.image && post.image.trim() !== "" ? post.image : null
    if (!image) {
      // Find the index of the current post
      const postIndex = posts.findIndex((p: BlogPost) => p.date === date)
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
            date: formatDateUTC(post.date),
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
