"use server"

import { supabase } from "@/lib/supabase"

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
