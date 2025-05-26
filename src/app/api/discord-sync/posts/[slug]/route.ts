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
    console.log(`Fetching Discord messages to find slug: ${slug}`)

    // First, we need to get all messages to find the one that matches the slug
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

    // Find the message that matches the slug
    let targetMessage: DiscordMessage | null = null
    let messageIndex = -1

    for (let i = 0; i < allMessages.length; i++) {
      const m = allMessages[i]

      // Parse the message to get the title and create slug
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

      // Create URL-friendly slug from title
      let messageSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")

      // Remove leading/trailing dashes
      messageSlug = messageSlug.replace(/^-+|-+$/g, "")

      // If slug is empty, use message ID
      if (!messageSlug) {
        messageSlug = m.id
      }

      console.log(`Checking message ${i}: 
        - Title: "${title}"
        - Generated slug: "${messageSlug}"
        - Message ID: "${m.id}"
        - Raw timestamp: "${m.timestamp}"`)

      // Check if this message matches the requested slug (by slug or by ID)
      if (messageSlug === slug || m.id === slug) {
        targetMessage = m
        messageIndex = i
        break
      }
    }

    if (!targetMessage) {
      console.log(`No message found for slug: ${slug}`)
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    console.log(`Found message at index ${messageIndex}`)
    console.log(`Target message timestamp: "${targetMessage.timestamp}" (type: ${typeof targetMessage.timestamp})`)

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

    // Use the same fallback logic as your posts route
    const fallback = FALLBACKS[messageIndex % FALLBACKS.length]
    const imageUrl = targetMessage.attachments[0]?.url ?? `/jpg/${fallback}`

    const result = {
      id: targetMessage.id,
      author: targetMessage.author?.username ?? "",
      date: targetMessage.timestamp, // Keep the original Discord timestamp
      title,
      summary,
      bodyMd,
      imageUrl,
    }

    console.log(`Returning post with date: "${result.date}" (type: ${typeof result.date})`)

    return NextResponse.json(result)
  } catch (error) {
    console.error("=== ERROR DETAILS ===")
    console.error("Error fetching post:", error)
    console.error("Slug that caused error:", slug)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
