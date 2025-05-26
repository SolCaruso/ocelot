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

  console.log(`=== SLUG ROUTE DEBUG ===`)
  console.log(`Received slug: "${slug}"`)

  // Add validation
  if (!DISCORD_TOKEN || !CHANNEL_ID) {
    console.error("Missing environment variables")
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
  }

  try {
    // Try to fetch the message directly by ID first
    console.log(`Trying to fetch Discord message directly by ID: ${slug}`)

    const directRes = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages/${slug}`, {
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
        "User-Agent": "DiscordBot (https://ocelot-pearl.vercel.app/, 1.0.0)",
      },
    })

    if (directRes.ok) {
      const message: DiscordMessage = await directRes.json()
      console.log(`Found message directly by ID. Timestamp: ${message.timestamp}`)

      // Parse message content
      const raw = message.content.trim()
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

      // For fallback image, we need to find the index
      const allMessagesRes = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=100`, {
        headers: {
          Authorization: `Bot ${DISCORD_TOKEN}`,
          "User-Agent": "DiscordBot (https://ocelot-pearl.vercel.app/, 1.0.0)",
        },
      })

      let messageIndex = 0
      if (allMessagesRes.ok) {
        const allMessages: DiscordMessage[] = await allMessagesRes.json()
        messageIndex = allMessages.findIndex((m) => m.id === slug)
        if (messageIndex === -1) messageIndex = 0
      }

      const fallback = FALLBACKS[messageIndex % FALLBACKS.length]
      const imageUrl = message.attachments[0]?.url ?? `/jpg/${fallback}`

      const result = {
        id: message.id,
        author: message.author?.username ?? "",
        date: message.timestamp,
        title,
        summary,
        bodyMd,
        imageUrl,
      }

      console.log(`Returning post with timestamp: ${result.date}`)
      return NextResponse.json(result)
    }

    // If direct fetch failed, fall back to searching through all messages
    console.log(`Direct fetch failed, searching through all messages...`)

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

    // Find the message that matches the slug (could be ID or generated slug)
    let targetMessage: DiscordMessage | null = null
    let messageIndex = -1

    for (let i = 0; i < allMessages.length; i++) {
      const m = allMessages[i]

      // Check if this message matches by ID
      if (m.id === slug) {
        targetMessage = m
        messageIndex = i
        break
      }

      // Also check by generated slug
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

      let messageSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")

      messageSlug = messageSlug.replace(/^-+|-+$/g, "")

      if (!messageSlug) {
        messageSlug = m.id
      }

      if (messageSlug === slug) {
        targetMessage = m
        messageIndex = i
        break
      }
    }

    if (!targetMessage) {
      console.log(`No message found for slug: ${slug}`)
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    console.log(`Found message at index ${messageIndex}, timestamp: ${targetMessage.timestamp}`)

    // Parse message content
    const raw = targetMessage.content.trim()
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

    const fallback = FALLBACKS[messageIndex % FALLBACKS.length]
    const imageUrl = targetMessage.attachments[0]?.url ?? `/jpg/${fallback}`

    const result = {
      id: targetMessage.id,
      author: targetMessage.author?.username ?? "",
      date: targetMessage.timestamp,
      title,
      summary,
      bodyMd,
      imageUrl,
    }

    console.log(`Returning post with timestamp: ${result.date}`)
    return NextResponse.json(result)
  } catch (error) {
    console.error("=== ERROR DETAILS ===")
    console.error("Error fetching post:", error)
    console.error("Slug that caused error:", slug)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
