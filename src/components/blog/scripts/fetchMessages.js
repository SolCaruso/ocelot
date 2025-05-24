// src/components/blog/scripts/fetchMessages.js
import { Client, GatewayIntentBits } from 'discord.js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const token     = process.env.DISCORD_TOKEN
const channelId = process.env.CHANNEL_ID

if (!token || !channelId) {
  console.error('❌ Missing DISCORD_TOKEN or CHANNEL_ID in .env')
  process.exit(1)
}

const POSTS_DIR   = path.resolve(process.cwd(), 'posts')
const FETCH_LIMIT = 250
const FALLBACKS   = [
  'post.jpg','post1.jpg','post2.jpg',
  'post3.jpg','post4.jpg','post5.jpg','post6.jpg',
]

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

async function fetchAllMessages(channel, limit) {
  const all = []
  let lastId = null

  while (all.length < limit) {
    const batch = await channel.messages.fetch({
      limit: Math.min(100, limit - all.length),
      before: lastId || undefined,
    })
    if (!batch.size) break
    all.push(...batch.values())
    lastId = batch.last().id
  }
  return all
}

client.once('ready', async () => {
  const channel = /** @type {import('discord.js').TextChannel} */ (
    await client.channels.fetch(channelId)
  )
  const messages = await fetchAllMessages(channel, FETCH_LIMIT)
  const liveIds  = new Set(messages.map((m) => m.id))

  messages.reverse().forEach((msg, i) => {
    const raw = msg.content.trim()
    if (!raw.startsWith('```md')) return

    // — image detection —
    // 1) true file attachments
    const attachment = msg.attachments.first()?.url ?? null
    // 2) embed previews (image or thumbnail)
    const embed = msg.embeds.find((e) => e.image?.url || e.thumbnail?.url)
    const embedUrl = embed?.image?.url || embed?.thumbnail?.url || null
    // 3) fallback rotation
    const fallbackUrl = `/jpg/${FALLBACKS[i % FALLBACKS.length]}`

    // pick the first non-null
    const imageUrl = attachment || embedUrl || fallbackUrl

    // — scrape frontmatter & body —
    const cleaned = raw
      .replace(/^```md/, '')
      .replace(/```$/, '')
      .trim()
    const fmMatch = cleaned.match(/^---\n([\s\S]*?)\n---/)
    if (!fmMatch) return

    const originalFm = fmMatch[1]
    const body       = cleaned.slice(fmMatch[0].length).trim()

    // rebuild frontmatter, drop old image:, add our imageUrl
    const fmLines = originalFm
      .split('\n')
      .filter((l) => !l.startsWith('image:'))
    fmLines.push(`image: "${imageUrl}"`)
    const frontmatter = fmLines.join('\n')

    const mdx = `---\n${frontmatter}\n---\n\n${body}\n`

    const date     = new Date(msg.createdTimestamp).toISOString().split('T')[0]
    const name     = `${date}-${msg.id}.mdx`
    const filepath = path.join(POSTS_DIR, name)

    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, mdx)
    }
  })

  // prune deleted
  fs.readdirSync(POSTS_DIR).forEach((file) => {
    const m = file.match(/^(\d{4}-\d{2}-\d{2})-(\d+)\.mdx$/)
    if (m && !liveIds.has(m[2])) {
      fs.unlinkSync(path.join(POSTS_DIR, file))
    }
  })

  console.log('🔄 Discord → MDX sync complete.')
  process.exit(0)
})

client.login(token)