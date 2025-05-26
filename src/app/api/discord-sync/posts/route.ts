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
      console.error("Invalid date for slug:", timestamp)
      return "invalid-date"
    }
    // Format as MM-DD-YYYY
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const year = date.getFullYear()
    return `${month}-${day}-${year}`
  } catch (error) {
    console.error("Error formatting date slug:", error, timestamp)
    return "invalid-date"
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1", 10)

  // Add validation
  if (!DISCORD_TOKEN || !CHANNEL_ID) {
    console.error("Missing environment variables")
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
  }

  try {
    console.log(`Fetching Discord messages for page ${page}`)

    const res = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=100`, {
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
        "User-Agent": "DiscordBot (https://ocelot-pearl.vercel.app/, 1.0.0)",
      },
    })

    console.log(`Discord API response status: ${res.status}`)

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`Discord API error: ${res.status} - ${errorText}`)
      return NextResponse.json({ error: `Discord API error: ${res.status}` }, { status: 502 })
    }

    const messages: DiscordMessage[] = await res.json()
    console.log(`Fetched ${messages.length} messages from Discord`)

    // Process messages
    const posts = messages.map((m, index) => {
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

      // Create date-based slug
      const dateSlug = formatDateSlug(m.timestamp)

      const fallback = FALLBACKS[index % FALLBACKS.length]
      const imageUrl = m.attachments[0]?.url ?? `/jpg/${fallback}`

      console.log(`Message ${index}: timestamp="${m.timestamp}", dateSlug="${dateSlug}", title="${title}"`)

      return {
        id: m.id,
        slug: dateSlug,
        author: m.author?.username ?? "",
        date: m.timestamp,
        title,
        summary,
        bodyMd,
        imageUrl,
      }
    })

    // Pagination logic
    const postsPerPage = page === 1 ? 10 : 9
    const startIndex = page === 1 ? 0 : 10 + (page - 2) * 9
    const endIndex = startIndex + postsPerPage
    const paginatedPosts = posts.slice(startIndex, endIndex)

    console.log(`Returning ${paginatedPosts.length} posts for page ${page}`)
    if (paginatedPosts.length > 0) {
      console.log(`First post: dateSlug="${paginatedPosts[0].slug}", date="${paginatedPosts[0].date}"`)
    }

    return NextResponse.json({
      total: posts.length,
      posts: paginatedPosts,
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
