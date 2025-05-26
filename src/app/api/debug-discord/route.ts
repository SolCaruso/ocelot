import { NextResponse } from "next/server"

const DISCORD_TOKEN = process.env.DISCORD_TOKEN!
const CHANNEL_ID = process.env.CHANNEL_ID!

interface DiscordMessage {
  id: string
  author: { username: string }
  content: string
  attachments: Array<{ url: string }>
  timestamp: string
}

export async function GET() {
  if (!DISCORD_TOKEN || !CHANNEL_ID) {
    return NextResponse.json({ error: "Missing environment variables" }, { status: 500 })
  }

  try {
    const res = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=5`, {
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
        "User-Agent": "DiscordBot (https://ocelot-pearl.vercel.app/, 1.0.0)",
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: `Discord API error: ${res.status}` }, { status: 502 })
    }

    const messages: DiscordMessage[] = await res.json()

    // Return raw Discord data for debugging
    return NextResponse.json({
      count: messages.length,
      messages: messages.map((m) => ({
        id: m.id,
        timestamp: m.timestamp,
        timestampType: typeof m.timestamp,
        parsedDate: new Date(m.timestamp).toISOString(),
        formattedDate: new Date(m.timestamp).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        content: m.content.substring(0, 100) + "...",
      })),
    })
  } catch (error) {
    console.error("Debug error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
