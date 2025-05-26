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

const DISCORD_TOKEN = process.env.DISCORD_TOKEN!
const CHANNEL_ID = process.env.CHANNEL_ID!

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    // Fetch directly from Discord API instead of internal API
    const res = await fetch(
      `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages/${slug}`,
      {
        headers: { 
          Authorization: `Bot ${DISCORD_TOKEN}`,
          'User-Agent': 'DiscordBot (https://ocelot-pearl.vercel.app, 1.0.0)'
        },
      }
    )

    console.log(`Discord API response status: ${res.status}`)

    if (!res.ok) {
      console.error(`Discord API error: ${res.status}`)
      return notFound()
    }

    const m = await res.json()

    // Parse message content
    const raw = m.content.trim()
    const bodyMd = raw.startsWith('```md')
      ? raw.replace(/^```md/, '').replace(/```$/, '').trim()
      : raw

    const lines = bodyMd.split('\n').map((l: string) => l.trim())
    const titleLine = lines.find((l: string) => l.startsWith('# ')) || ''
    const title = titleLine.replace(/^#\s*/, '') || 'Untitled'
    const summary =
      lines
        .slice(lines.indexOf(titleLine) + 1)
        .find((l: string) => !!l && !l.startsWith('```')) || ''

    const imageUrl = m.attachments[0]?.url ?? '/jpg/post.jpg'

    const post: Post = {
      id: m.id,
      author: m.author?.username ?? '',
      date: m.timestamp,
      title,
      summary,
      bodyMd,
      imageUrl,
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