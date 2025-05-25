// src/app/updates/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PostHero from '@/components/updates/PostHero'
import { ClientPost } from '@/components/updates/ClientPost'

type DiscordMessage = {
  id: string
  content: string
  attachments: { url: string }[]
  timestamp: string
}

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `https://discord.com/api/v10/channels/${process.env.CHANNEL_ID}/messages?limit=250`,
      { headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` } }
    )
    if (!res.ok) return []
    const msgs = (await res.json()) as { id: string }[]
    return msgs.map((m) => ({ slug: m.id }))
  } catch {
    return []
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // await the params promise to get your slug
  const { slug } = await params

  const res = await fetch(
    `https://discord.com/api/v10/channels/${process.env.CHANNEL_ID}/messages/${slug}`,
    {
      headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
      cache: 'no-store',
    }
  )
  if (!res.ok) return notFound()
  const m = (await res.json()) as DiscordMessage

  // Strip ```md fences
  const raw = m.content.trim()
  const bodyMd = raw.startsWith('```md')
    ? raw.replace(/^```md/, '').replace(/```$/, '').trim()
    : raw

  // Pull title & summary
  const lines = bodyMd.split('\n').map((l) => l.trim())
  const titleLine = lines.find((l) => l.startsWith('# ')) || ''
  const title = titleLine.replace(/^#\s*/, '') || 'Untitled'
  const summary =
    lines
      .slice(lines.indexOf(titleLine) + 1)
      .find((l) => !!l && !l.startsWith('```')) || ''

  // Image or fallback
  const imageUrl = m.attachments[0]?.url ?? '/jpg/post.jpg'

  return (
    <section className="relative mx-auto px-4 pb-64 bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
      <PostHero
        post={{
          image: imageUrl,
          title,
          summary,
          date: m.timestamp,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 mt-12 text-white">
        <ClientPost code={bodyMd} title={title} date={m.timestamp} showHeader={false} />
      </div>
    </section>
  )
}