import BlogPageClient from "../../components/updates/BlogPageClient"
import { supabase } from "@/lib/supabase"

interface BlogPost {
  id: number
  date: string
  title: string
  summary: string
  body: string
  image?: string | null
}

const FALLBACKS = ["/jpg/post.jpg", "/jpg/post1.jpg", "/jpg/post2.jpg", "/jpg/post3.jpg"]

async function fetchInitialPosts(): Promise<BlogPost[]> {
  try {
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, date, title, summary, body, image")
      .order("date", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Supabase error:", error)
      return []
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

    return transformedPosts
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export default async function UpdatesPage() {
  const posts = await fetchInitialPosts()
  const heroPost = posts[0]
  const initialPosts = posts.slice(1, 10)

  return <BlogPageClient heroPost={heroPost} initialPosts={initialPosts} />
}