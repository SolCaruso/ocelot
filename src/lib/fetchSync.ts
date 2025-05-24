// src/lib/fetchSync.ts
import { Client, GatewayIntentBits, TextChannel, Collection, Message } from 'discord.js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const POSTS_DIR   = path.resolve(process.cwd(), 'posts')
const FETCH_LIMIT = 250
const FALLBACKS   = [
  'post.jpg','post1.jpg','post2.jpg',
  'post3.jpg','post4.jpg','post5.jpg','post6.jpg',
]

// Fetch up to `limit` messages in batches of 100
export async function fetchAllMessages(
  channel: TextChannel,
  limit: number
): Promise<Message[]> {
  const all: Message[] = []
  let lastId: string | null = null

  while (all.length < limit) {
    const batch: Collection<string, Message> = await channel.messages.fetch({
      limit: Math.min(100, limit - all.length),
      before: lastId ?? undefined,
    })
    if (batch.size === 0) break

    all.push(...batch.values())
    lastId = batch.last()!.id
  }

  return all
}

export async function fetchAndSync() {
  const token     = process.env.DISCORD_TOKEN!
  const channelId = process.env.CHANNEL_ID!

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  })
  await client.login(token)

  const channel = (await client.channels.fetch(channelId)) as TextChannel
  const messages = await fetchAllMessages(channel, FETCH_LIMIT)
  const liveIds  = new Set(messages.map((m) => m.id))

  // TODO: insert your MDX parsing + file-write logic here (without process.exit)

  // Prune deleted posts
  fs.readdirSync(POSTS_DIR).forEach((file) => {
    const match = file.match(/^(\d{4}-\d{2}-\d{2})-(\d+)\.mdx$/)
    if (match && !liveIds.has(match[2])) {
      fs.unlinkSync(path.join(POSTS_DIR, file))
    }
  })

  await client.destroy()
  console.log('🔄 Discord → MDX sync complete at', new Date().toISOString())
}