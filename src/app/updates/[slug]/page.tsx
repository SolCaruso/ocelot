import { notFound } from "next/navigation"
import PostHero from "@/components/updates/PostHero"
import { ClientPost } from "@/components/updates/ClientPost"

// Revalidate every 5 minutes
export const revalidate = 300

type Post = {
  id: string
  author: string
  date: string
  title: string
  summary: string
  bodyMd: string
  imageUrl: string
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    // Use the API route which now has the correct fallback logic
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    const res = await fetch(`${baseUrl}/api/discord-sync/posts/${slug}`, {
      cache: "no-store", // Ensure fresh data
    })

    console.log(`API response status: ${res.status}`)

    if (!res.ok) {
      console.error(`API error: ${res.status}`)
      return notFound()
    }

    const post: Post = await res.json()

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
          <ClientPost code={post.bodyMd} title={post.title} date={post.date} summary={post.summary} />
        </div>
      </section>
    )
  } catch (err) {
    console.error(`Fetch error for slug ${slug}:`, err)
    return notFound()
  }
}
