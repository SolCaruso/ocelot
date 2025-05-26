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

    // Debug: Log first few timestamps
    console.log("=== TIMESTAMP DEBUG ===")
    messages.slice(0, 3).forEach((m, i) => {
      console.log(`Message ${i}:`)
      console.log(`  - ID: ${m.id}`)
      console.log(`  - Raw timestamp: "${m.timestamp}"`)
      console.log(`  - Timestamp type: ${typeof m.timestamp}`)
      console.log(`  - Parsed date: ${new Date(m.timestamp).toISOString()}`)
      console.log(
        `  - Formatted: ${new Date(m.timestamp).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`,
      )
    })

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

      // Create URL-friendly slug from title
      let slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")

      // Remove leading/trailing dashes
      slug = slug.replace(/^-+|-+$/g, "")

      // If slug is empty, use message ID
      if (!slug) {
        slug = m.id
      }

      const fallback = FALLBACKS[index % FALLBACKS.length]
      const imageUrl = m.attachments[0]?.url ?? `/jpg/${fallback}`

      return {
        id: m.id,
        slug,
        author: m.author?.username ?? "",
        date: m.timestamp, // Keep the original Discord timestamp
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
      console.log(`=== FINAL RESULT DEBUG ===`)
      console.log(`First post:`)
      console.log(`  - Title: "${paginatedPosts[0].title}"`)
      console.log(`  - Date: "${paginatedPosts[0].date}"`)
      console.log(`  - Date type: ${typeof paginatedPosts[0].date}`)
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
