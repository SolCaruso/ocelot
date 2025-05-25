// src/app/api/discord-sync/posts/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const DISCORD_TOKEN = process.env.DISCORD_TOKEN!
const CHANNEL_ID    = process.env.CHANNEL_ID!

// ← Add your fallback filenames here
const FALLBACKS = [
  'post.jpg','post1.jpg','post2.jpg',
  'post3.jpg'
]

interface DiscordMessage {
  id: string
  author: { username: string }
  content: string
  attachments: Array<{ url: string }>
  timestamp: string
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page      = parseInt(searchParams.get('page') || '1', 10)
    const perPage   = page === 1 ? 10 : 9
    const fetchLimit= page === 1 ? 10 : 10 + (page - 1) * 9

    // Fetch raw messages
    const res = await fetch(
      `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=${fetchLimit}`,
      { headers: { Authorization: `Bot ${DISCORD_TOKEN}` } }
    )
    if (!res.ok) {
      console.error(`Discord API error: ${res.status}`)
      return NextResponse.json(
        { error: `Discord API error: ${res.status}` },
        { status: 502 }
      )
    }

    const msgs: DiscordMessage[] = await res.json()

    // total count and slicing window
    const total  = msgs.length
    const offset = page === 1 ? 0 : 10 + (page - 2) * 9
    const window = msgs.slice(offset, offset + perPage)

    // Map into your shape, with a deterministic fallback per index
    const posts = window.map((m, i) => {
      // Strip Markdown fences
      const raw    = m.content.trim()
      const bodyMd = raw.startsWith('```md')
        ? raw.replace(/^```md/, '').replace(/```$/, '').trim()
        : raw

      // Extract title from "# heading"
      const lines     = bodyMd.split('\n').map((l) => l.trim())
      const titleLine = lines.find((l) => l.startsWith('# ')) || ''
      const title     = titleLine.replace(/^# /, '') || 'Untitled'

      // Next non-empty line = summary
      let summary = ''
      if (titleLine) {
        const idx = lines.indexOf(titleLine)
        summary   = lines.slice(idx + 1).find((l) => !!l && !l.startsWith('```')) || ''
      }

      // Determine a fixed fallback based on absolute position
      const fallback = FALLBACKS[(offset + i) % FALLBACKS.length]
      const imageUrl = m.attachments[0]?.url ?? `/jpg/${fallback}`

      return {
        id:       m.id,
        slug:     m.id,                 // so your links can use `slug`
        author:   m.author.username,
        date:     m.timestamp,
        title,
        summary,
        bodyMd,
        imageUrl,
      }
    })

    return NextResponse.json({ total, posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}