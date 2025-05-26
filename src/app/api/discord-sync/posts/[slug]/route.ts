import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const DISCORD_TOKEN = process.env.DISCORD_TOKEN!
const CHANNEL_ID = process.env.CHANNEL_ID!

const FALLBACKS = ["post.jpg", "post1.jpg", "post2.jpg", "post3.jpg"]

interface DiscordMessage {
  id: string
  author: { username: string }
  content: string
  attachments: Array<{ url: string }>
  timestamp: string
}

function formatDateSlug(timestamp: string): string {
  try {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) {
      return "invalid-date"
    }
    // Format as MM-DD-YYYY
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const year = date.getFullYear()
    return `${month}-${day}-${year}`
  } catch (error) {
    return "invalid-date"
  }
}

function parseDateSlug(slug: string): Date | null {
  try {
    // Parse MM-DD-YYYY format
    const parts = slug.split("-")
    if (parts.length !== 3) return null

    const month = Number.parseInt(parts[0], 10)
    const day = Number.parseInt(parts[1], 10)
    const year = Number.parseInt(parts[2], 10)

    if (isNaN(month) || isNaN(day) || isNaN(year)) return null

    const date = new Date(year, month - 1, day)
    if (isNaN(date.getTime())) return null

    return date
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  console.log(`=== SLUG ROUTE START ===`)
  console.log(`Received date slug: "${slug}"`)

  if (!DISCORD_TOKEN || !CHANNEL_ID) {
    console.error("Missing environment variables")
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
  }

  try {
    // Parse the date slug
    const targetDate = parseDateSlug(slug)
    if (!targetDate) {
      console.log(`Invalid date slug format: ${slug}`)
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 })
    }

    console.log(`Looking for posts on date: ${targetDate.toDateString()}`)

    // Fetch all messages to find the one with matching date
    const res = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=100`, {
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
        "User-Agent": "DiscordBot (https://ocelot-pearl.vercel.app/, 1.0.0)",
      },
    })

    if (!res.ok) {
      console.error(`Discord API error: ${res.status}`)
      return NextResponse.json({ error: `Discord API error: ${res.status}` }, { status: 502 })
    }

    const messages: DiscordMessage[] = await res.json()

    // Find the message with matching date
    let targetMessage: DiscordMessage | null = null
    let messageIndex = -1

    for (let i = 0; i < messages.length; i++) {
      const m = messages[i]
      const messageDate = new Date(m.timestamp)

      // Check if the dates match (same day, month, year)
      if (
        messageDate.getDate() === targetDate.getDate() &&
        messageDate.getMonth() === targetDate.getMonth() &&
        messageDate.getFullYear() === targetDate.getFullYear()
      ) {
        targetMessage = m
        messageIndex = i
        console.log(`Found matching message at index ${i}, timestamp: ${m.timestamp}`)
        break
      }
    }

    if (!targetMessage) {
      console.log(`No message found for date: ${slug}`)
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

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

    console.log(`=== RETURNING RESULT ===`)
    console.log(`Title: ${result.title}`)
    console.log(`Date: ${result.date}`)

    return NextResponse.json(result)
  } catch (error) {
    console.error("=== SLUG ROUTE ERROR ===")
    console.error("Error:", error)
    console.error("Slug:", slug)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
