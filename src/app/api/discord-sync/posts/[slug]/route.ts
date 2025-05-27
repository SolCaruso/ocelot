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

function parseDateSlug(slug: string): Date | null {
  try {
    // Parse MM-DD-YYYY format
    const parts = slug.split("-")
    if (parts.length !== 3) {
      console.log(`Invalid slug format: ${slug} (doesn't have 3 parts)`)
      return null
    }

    const month = Number.parseInt(parts[0], 10)
    const day = Number.parseInt(parts[1], 10)
    const year = Number.parseInt(parts[2], 10)

    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      console.log(`Invalid slug format: ${slug} (contains non-numeric parts)`)
      return null
    }

    const date = new Date(year, month - 1, day)
    if (isNaN(date.getTime())) {
      console.log(`Invalid date created from slug: ${slug}`)
      return null
    }

    console.log(`Successfully parsed slug ${slug} to date: ${date.toISOString()}`)
    return date
  } catch (error) {
    console.error(`Error parsing date slug ${slug}:`, error)
    return null
  }
}

function extractFrontmatterDate(content: string): string | null {
  const match = content.match(/date:\s*["']?(\d{4}-\d{2}-\d{2})["']?/)
  return match ? match[1] : null
}

function parsePostContent(content: string) {
  // Remove frontmatter and extract it
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?/;
  const frontmatterMatch = content.match(frontmatterRegex);
  const frontmatter: Record<string, string> = {};
  let body = content;

  if (frontmatterMatch) {
    const fm = frontmatterMatch[1];
    body = content.replace(frontmatterRegex, "").trim();
    
    // Parse frontmatter lines
    fm.split("\n").forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > -1) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        // Remove quotes from the value
        frontmatter[key] = value.replace(/^["']|["']$/g, "");
      }
    });
  }

  return {
    title: frontmatter.title || "Untitled",
    summary: frontmatter.summary || "",
    bodyMd: body,
    frontmatter
  };
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
    console.log(`Fetched ${messages.length} messages from Discord`)

    // Find the message with matching frontmatter date
    let targetMessage: DiscordMessage | null = null
    let messageIndex = -1
    let frontmatterDateStr: string | null = null

    console.log(`Target date: ${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`)

    for (let i = 0; i < messages.length; i++) {
      const m = messages[i]
      const fmDateStr = extractFrontmatterDate(m.content)

      if (fmDateStr) {
        console.log(`Message ${i} has frontmatter date: ${fmDateStr}`)
        const [year, month, day] = fmDateStr.split("-").map(Number)
        const fmDate = new Date(year, month - 1, day)

        console.log(
          `Comparing: ${fmDate.getFullYear()}-${fmDate.getMonth() + 1}-${fmDate.getDate()} vs ${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`,
        )

        if (
          fmDate.getDate() === targetDate.getDate() &&
          fmDate.getMonth() === targetDate.getMonth() &&
          fmDate.getFullYear() === targetDate.getFullYear()
        ) {
          targetMessage = m
          messageIndex = i
          frontmatterDateStr = fmDateStr
          console.log(`Found matching message at index ${i}, frontmatter date: ${fmDateStr}`)
          break
        }
      } else {
        console.log(`Message ${i} has no frontmatter date`)
      }
    }

    if (!targetMessage) {
      console.log(`No message found for date: ${slug}`)
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Parse message content
    const raw = targetMessage.content.trim()
    const cleanContent = raw.startsWith("```md")
      ? raw
          .replace(/^```md/, "")
          .replace(/```$/, "")
          .trim()
      : raw

    // Use the parsePostContent function to extract title and other metadata
    const parsed = parsePostContent(cleanContent)

    const fallback = FALLBACKS[messageIndex % FALLBACKS.length]
    const imageUrl = targetMessage.attachments[0]?.url ?? `/jpg/${fallback}`

    const result = {
      id: targetMessage.id,
      author: targetMessage.author?.username ?? "",
      date: frontmatterDateStr ?? targetMessage.timestamp,
      title: parsed.title,
      summary: parsed.summary,
      bodyMd: parsed.bodyMd,
      imageUrl,
    }

    console.log(`=== RETURNING RESULT ===`)
    console.log(`Title: ${result.title}`)
    console.log(`Date: ${result.date}`)

    return NextResponse.json(result)
  } catch (err) {
    console.error(`Error processing slug ${slug}:`, err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
