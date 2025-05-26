// src/app/updates/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PostHero from '@/components/updates/PostHero'
import { ClientPost } from '@/components/updates/ClientPost'

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

function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://ocelot-pearl.vercel.app' // Your actual domain
  }
  return 'http://localhost:3000'
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    const baseUrl = getBaseUrl()
    const apiUrl = `${baseUrl}/api/discord-sync/posts/${slug}`
    
    console.log(`Fetching from: ${apiUrl}`)
    
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log(`API response status: ${res.status}`)

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`API error: ${res.status} - ${errorText}`)
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
    console.error(`Fetch error for slug ${slug}:`, err)
    return notFound()
  }
}