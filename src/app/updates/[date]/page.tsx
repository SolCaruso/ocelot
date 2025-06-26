import { notFound } from "next/navigation"
import PostHero from "@/components/updates/PostHero"
import { ClientPost } from "@/components/updates/ClientPost"
import { supabase } from "@/lib/supabase"

const FALLBACKS = ["/jpg/post.jpg", "/jpg/post1.jpg", "/jpg/post2.jpg", "/jpg/post3.jpg"]

export default async function Page({ params }: { params: { date: string } }) {
  const { date } = params

  try {
    // First, get the post data
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("id, date, title, summary, body, image")
      .eq("date", date)
      .single()

    if (error || !post) {
      console.error("Supabase error:", error)
      return notFound()
    }

    // If the post has no image, we need to determine which fallback to use
    let image = post.image && post.image.trim() !== "" ? post.image : null

    if (!image) {
      // Get all posts ordered by date to find this post's index
      const { data: allPosts, error: allPostsError } = await supabase
        .from("blog_posts")
        .select("id, date")
        .order("date", { ascending: false })

      if (!allPostsError && allPosts) {
        // Find the index of the current post
        const postIndex = allPosts.findIndex((p) => p.date === date)
        if (postIndex !== -1) {
          // Use the same fallback logic as the cards
          image = FALLBACKS[postIndex % FALLBACKS.length]
        } else {
          // Fallback to first image if not found
          image = FALLBACKS[0]
        }
      } else {
        // Fallback to first image if query fails
        image = FALLBACKS[0]
      }
    }

    return (
      <section className="relative mx-auto px-4 pb-64 bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
        <PostHero
          post={{
            image,
            title: post.title,
            summary: post.summary,
            date: post.date,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 mt-12 text-white">
          <ClientPost code={post.body} title={post.title} date={post.date} />
        </div>
      </section>
    )
  } catch (error) {
    console.error("Error fetching post:", error)
    return notFound()
  }
}
