import { notFound } from "next/navigation"
import PostHero from "@/components/updates/PostHero"
import { ClientPost } from "@/components/updates/ClientPost"
import { getPostBySlug } from "@/lib/discord"

// Revalidate every 5 minutes
export const revalidate = 300

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    const post = await getPostBySlug(slug)

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
  } catch (err) {
    console.error(`Error fetching post for slug ${slug}:`, err)
    return notFound()
  }
}
