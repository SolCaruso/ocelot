// src/app/updates/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PostHero from '@/components/updates/PostHero'
import { ClientPost } from '@/components/updates/ClientPost'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

type Post = {
  id: string
  author: string
  date: string
  title: string
  summary: string
  bodyMd: string
  imageUrl: string
}

// Remove generateStaticParams since we're going dynamic
// export async function generateStaticParams() { ... }

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    // Use your API route - remove cache: 'no-store' since we're already dynamic
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
    
    const res = await fetch(`${baseUrl}/api/discord-sync/posts/${slug}`)

    if (!res.ok) {
      console.error(`[slug:${slug}] API fetch failed, status:`, res.status)
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
          <ClientPost 
            code={post.bodyMd} 
            title={post.title} 
            date={post.date} 
            showHeader={false} 
          />
        </div>
      </section>
    )
  } catch (err) {
    console.error(`[slug:${slug}] fetch threw:`, err)
    return notFound()
  }
}