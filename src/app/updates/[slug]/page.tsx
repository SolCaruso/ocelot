// src/app/updates/[slug]/page.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { notFound } from 'next/navigation'
import PostHero  from '@/components/updates/PostHero'
import { ClientPost } from '@/components/updates/ClientPost'

type DiscordMessage = {
  id: string
  content: string
  attachments: { url: string }[]
  timestamp: string
}

//
// 1) At build time, statically generate one page per message ID:
//
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `https://discord.com/api/v10/channels/${process.env.CHANNEL_ID}/messages?limit=250`,
      { headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` } }
    )

    if (!res.ok) {
      console.error('⚠️ generateStaticParams: Discord API returned', res.status)
      // don’t throw — just generate no pages
      return []
    }

    const msgs = (await res.json()) as { id: string }[]
    return msgs.map((m) => ({ slug: m.id }))
  } catch (err) {
    console.error('⚠️ generateStaticParams failed:', err)
    return []
  }
}

//
// 2) For each slug, re-fetch that single message and render:
//
export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  // pull the one message directly from Discord:
  const res = await fetch(
    `https://discord.com/api/v10/channels/${process.env.CHANNEL_ID}/messages/${slug}`,
    {
      headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
      cache:   'no-store',         // always fresh when user visits
    }
  )
  if (!res.ok) return notFound()
  const m = (await res.json()) as DiscordMessage

  // strip any ```md…``` fences:
  const raw    = m.content.trim()
  const bodyMd = raw.startsWith('```md')
    ? raw.replace(/^```md/, '').replace(/```$/, '').trim()
    : raw

  // extract the first "# heading" as title:
  const lines     = bodyMd.split('\n').map((l) => l.trim())
  const titleLine = lines.find((l) => l.startsWith('# ')) || ''
  const title     = titleLine.replace(/^#\s*/, '') || 'Untitled'

  // next non-empty line = summary
  const summary =
    lines
      .slice(lines.indexOf(titleLine) + 1)
      .find((l) => l && !l.startsWith('```')) || ''

  // attachment or fallback
  const imageUrl = m.attachments[0]?.url ?? '/jpg/post.jpg'

  return (
    <section className="relative mx-auto px-4 pb-64 bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
      <PostHero
        post={{
          image:   imageUrl,
          title,
          summary,
          date:    m.timestamp,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 mt-12 text-white">
        <ClientPost
          code={bodyMd}
          title={title}
          date={m.timestamp}
          showHeader={false}
        />
      </div>
    </section>
  )
}