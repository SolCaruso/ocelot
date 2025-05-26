import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const DISCORD_TOKEN = process.env.DISCORD_TOKEN!
const CHANNEL_ID = process.env.CHANNEL_ID!

// Same fallback array as your posts route
const FALLBACKS = ["post.jpg", "post1.jpg", "post2.jpg", "post3.jpg"]

interface DiscordMessage {
  id: string
  author: { username: string }
  content: string
  attachments: Array<{ url: string }>
  timestamp: string
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Add validation
  if (!DISCORD_TOKEN || !CHANNEL_ID) {
    console.error("Missing environment variables")
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
  }

  try {
    console.log(`Fetching Discord message: ${slug}`)

    // First, we need to get all messages to find the position of this specific message
    const allMessagesRes = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=100`, {
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
        "User-Agent": "DiscordBot (https://ocelot-pearl.vercel.app/, 1.0.0)",
      },
    })

    if (!allMessagesRes.ok) {
      console.error(`Discord API error fetching all messages: ${allMessagesRes.status}`)
      return NextResponse.json({ error: `Discord API error: ${allMessagesRes.status}` }, { status: 502 })
    }

    const allMessages: DiscordMessage[] = await allMessagesRes.json()

    // Find the index of our specific message
    const messageIndex = allMessages.findIndex((msg: DiscordMessage) => msg.id === slug)

    if (messageIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Now fetch the specific message
    const res = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages/${slug}`, {
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
        "User-Agent": "DiscordBot (https://ocelot-pearl.vercel.app/, 1.0.0)",
      },
    })

    console.log(`Discord API response status: ${res.status}`)

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`Discord API error: ${res.status} - ${errorText}`)

      if (res.status === 404) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }

      return NextResponse.json({ error: `Discord API error: ${res.status}` }, { status: 502 })
    }

    const m: DiscordMessage = await res.json()

    // Parse message as in your page
    const raw = m.content.trim()
    const bodyMd = raw.startsWith("```md")
      ? raw
          .replace(/^```md/, "")
          .replace(/```$/, "")
          .trim()
      : raw

    const lines = bodyMd.split("\n").map((l: string) => l.trim())
    const titleLine = lines.find((l: string) => l.startsWith("# ")) || ""
    const title = titleLine.replace(/^#\s*/, "") || "Untitled"
    const summary = lines.slice(lines.indexOf(titleLine) + 1).find((l: string) => !!l && !l.startsWith("```")) || ""

    // Use the same fallback logic as your posts route
    const fallback = FALLBACKS[messageIndex % FALLBACKS.length]
    const imageUrl = m.attachments[0]?.url ?? `/jpg/${fallback}`

    console.log(`Message index: ${messageIndex}, fallback: ${fallback}, final imageUrl: ${imageUrl}`)

    return NextResponse.json({
      id: m.id,
      author: m.author?.username ?? "",
      date: m.timestamp,
      title,
      summary,
      bodyMd,
      imageUrl,
    })
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
