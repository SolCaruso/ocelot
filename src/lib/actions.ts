"use server"

import { supabase } from "@/lib/supabase"
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

const FALLBACKS = ["/jpg/post.jpg", "/jpg/post1.jpg", "/jpg/post2.jpg", "/jpg/post3.jpg"]

export async function getPaginatedPosts(currentPage: number) {
  try {
    // Get total count first
    const { count } = await supabase.from("blog_posts").select("*", { count: "exact", head: true })

    const totalPosts = count || 0

    // Calculate pagination
    let skip = 0
    let limit = 10
    if (currentPage === 1) {
      skip = 0
      limit = 10
    } else {
      skip = 10 + (currentPage - 2) * 9
      limit = 9
    }

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, date, title, summary, body, image")
      .order("date", { ascending: false })
      .range(skip, skip + limit - 1)

    if (error) {
      console.error("Supabase error:", error)
      return { posts: [], total: 0, error: "Failed to fetch posts" }
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

    return {
      posts: transformedPosts,
      total: totalPosts,
      error: null,
    }
  } catch (error) {
    console.error("Error fetching posts:", error)
    return { posts: [], total: 0, error: "Failed to fetch posts" }
  }
}

// Function to fetch and cache the 10 most recent blog posts
export async function fetchAndCacheRecentPosts() {
  try {
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, date, title, summary, body, image")
      .order("date", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Supabase error:", error)
      return { success: false, error: "Failed to fetch posts" }
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
    
    console.log(`✅ Cached ${transformedPosts.length} recent posts to public/cached-posts.json`)
    return { success: true, posts: transformedPosts }
  } catch (error) {
    console.error("Error caching posts:", error)
    return { success: false, error: "Failed to cache posts" }
  }
}

// Function to get cached posts (for client-side use)
export async function getCachedPosts() {
  try {
    const cachePath = join(process.cwd(), 'public', 'cached-posts.json')
    
    if (!existsSync(cachePath)) {
      // If cache doesn't exist, fetch and create it
      const result = await fetchAndCacheRecentPosts()
      if (!result.success) {
        return { posts: [], error: result.error }
      }
      return { posts: result.posts, error: null }
    }

    const cacheData = JSON.parse(readFileSync(cachePath, 'utf-8'))
    return { posts: cacheData.posts, error: null }
  } catch (error) {
    console.error("Error reading cached posts:", error)
    return { posts: [], error: "Failed to read cached posts" }
  }
}

// Function to get cached posts for client components
export async function getRecentPostsForClient() {
  try {
    const response = await fetch('/cached-posts.json', {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch cached posts')
    }
    
    const data = await response.json()
    return { posts: data.posts, error: null }
  } catch (error) {
    console.error("Error fetching cached posts:", error)
    return { posts: [], error: "Failed to fetch cached posts" }
  }
}




