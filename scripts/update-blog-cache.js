#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
const { writeFileSync } = require('fs')
const { join } = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const FALLBACKS = ["/jpg/post.jpg", "/jpg/post1.jpg", "/jpg/post2.jpg", "/jpg/post3.jpg"]

async function updateBlogCache() {
  try {
    console.log('🔄 Fetching recent blog posts from Supabase...')
    
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, date, title, summary, body, image")
      .order("date", { ascending: false })
      .limit(10)

    if (error) {
      console.error("❌ Supabase error:", error)
      process.exit(1)
    }

    // Assign fallback images if image is missing/null/empty
    const transformedPosts = (posts || []).map((post, idx) => ({
      id: post.id,
      date: post.date,
      title: post.title,
      summary: post.summary,
      body: post.body,
      image: post.image && post.image.trim() !== "" ? post.image : FALLBACKS[idx % FALLBACKS.length],
    }))

    // Save to JSON file in the public directory
    const cachePath = join(process.cwd(), 'public', 'cached-posts.json')
    const cacheData = {
      posts: transformedPosts,
      lastUpdated: new Date().toISOString(),
      count: transformedPosts.length
    }

    writeFileSync(cachePath, JSON.stringify(cacheData, null, 2))
    
    console.log(`✅ Successfully cached ${transformedPosts.length} recent posts`)
    console.log(`📁 Cache saved to: ${cachePath}`)
    console.log(`🕒 Last updated: ${cacheData.lastUpdated}`)
    
    // Show the titles of cached posts
    console.log('\n📝 Cached posts:')
    transformedPosts.forEach((post, index) => {
      console.log(`  ${index + 1}. ${post.title}`)
    })
    
  } catch (error) {
    console.error("❌ Error updating blog cache:", error)
    process.exit(1)
  }
}

// Run the update
updateBlogCache() 