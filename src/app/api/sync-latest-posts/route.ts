import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'
import { join } from 'path'

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.SUPABASE_WEBHOOK_SECRET
  const authHeader = req.headers.get('authorization')
  if (WEBHOOK_SECRET && authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, date, title, summary, body, image')
    .order('date', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }

  const FALLBACKS = ["/jpg/post.jpg", "/jpg/post1.jpg", "/jpg/post2.jpg", "/jpg/post3.jpg"]
  const transformedPosts = (posts || []).map((post, idx) => ({
    id: post.id,
    date: post.date,
    title: post.title,
    summary: post.summary,
    body: post.body,
    image: post.image && post.image.trim() !== "" ? post.image : FALLBACKS[idx % FALLBACKS.length],
  }))

  const cachePath = join(process.cwd(), 'public', 'cached-posts.json')
  const cacheData = {
    posts: transformedPosts,
    lastUpdated: new Date().toISOString(),
    count: transformedPosts.length
  }
  writeFileSync(cachePath, JSON.stringify(cacheData, null, 2))

  return NextResponse.json({ success: true, count: transformedPosts.length })
} 