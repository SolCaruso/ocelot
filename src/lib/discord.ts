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
    const parts = slug.split("-")
    if (parts.length !== 3) return null

    const month = Number.parseInt(parts[0], 10)
    const day = Number.parseInt(parts[1], 10)
    const year = Number.parseInt(parts[2], 10)

    if (isNaN(month) || isNaN(day) || isNaN(year)) return null

    const date = new Date(year, month - 1, day)
    if (isNaN(date.getTime())) return null

    return date
  } catch {
    return null
  }
}

function extractFrontmatterDate(content: string): string | null {
  const match = content.match(/date:\s*["']?(\d{4}-\d{2}-\d{2})["']?/)
  return match ? match[1] : null
}

export async function getPostBySlug(slug: string) {
  if (!DISCORD_TOKEN || !CHANNEL_ID) {
    throw new Error("Missing environment variables")
  }

  const targetDate = parseDateSlug(slug)
  if (!targetDate) {
    throw new Error("Invalid date format")
  }

  const res = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=100`, {
    headers: {
      Authorization: `Bot ${DISCORD_TOKEN}`,
      "User-Agent": "DiscordBot (https://ocelot-pearl.vercel.app/, 1.0.0)",
    },
  })

  if (!res.ok) {
    throw new Error(`Discord API error: ${res.status}`)
  }

  const messages: DiscordMessage[] = await res.json()

  let targetMessage: DiscordMessage | null = null
  let messageIndex = -1
  let frontmatterDateStr: string | null = null

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i]
    const fmDateStr = extractFrontmatterDate(m.content)
    if (fmDateStr) {
      const [year, month, day] = fmDateStr.split("-").map(Number)
      const fmDate = new Date(year, month - 1, day)
      if (
        fmDate.getDate() === targetDate.getDate() &&
        fmDate.getMonth() === targetDate.getMonth() &&
        fmDate.getFullYear() === targetDate.getFullYear()
      ) {
        targetMessage = m
        messageIndex = i
        frontmatterDateStr = fmDateStr
        break
      }
    }
  }

  if (!targetMessage) {
    return null
  }

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

  return {
    id: targetMessage.id,
    author: targetMessage.author?.username ?? "",
    date: frontmatterDateStr ?? targetMessage.timestamp,
    title,
    summary,
    bodyMd,
    imageUrl,
  }
}
