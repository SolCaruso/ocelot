import type { Metadata } from "next"
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

const FALLBACKS = ["/avif/post.avif", "/avif/post1.avif", "/avif/post2.avif", "/avif/post3.avif"]

export async function generateMetadata({ params }: { params: { date: string } }): Promise<Metadata> {
  const { date } = params

  try {
    const cachePath = join(process.cwd(), 'public', 'cached-posts.json')
    const cacheData = JSON.parse(readFileSync(cachePath, 'utf-8'))
    const posts: BlogPost[] = cacheData.posts || []
    const post = posts.find((p: BlogPost) => p.date === date)

    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found.",
      }
    }

    // Fallback image logic
    let image = post.image && post.image.trim() !== "" ? post.image : null
    if (!image) {
      const postIndex = posts.findIndex((p: BlogPost) => p.date === date)
      if (postIndex !== -1) {
        image = FALLBACKS[postIndex % FALLBACKS.length]
      } else {
        image = FALLBACKS[0]
      }
    }

    return {
      title: post.title,
      description: post.summary,
      keywords: ["Guild Saga", "game development", "tactical RPG", "blog post", post.title.toLowerCase()],
      openGraph: {
        title: post.title,
        description: post.summary,
        images: [
          {
            url: image || '/webp/post.webp',
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        type: 'article',
        publishedTime: post.date,
      },
      twitter: {
        title: post.title,
        description: post.summary,
        images: [image || '/webp/post.webp'],
        card: 'summary_large_image',
      },
      alternates: {
        canonical: `/updates/${date}`,
      },
    }
  } catch (error) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }
}

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
