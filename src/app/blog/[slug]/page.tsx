// src/app/blog/[slug]/page.tsx
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import PostHero from '@/components/blog/PostHero'
import { ClientPost } from '@/components/blog/ClientPost'

interface PostPageProps {
  params: {
    slug: string
  }
}

// Generate all static routes
export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug)
  if (!post) notFound()

  return (
    <section className="relative mx-auto px-4 pb-64 bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
      {/* Hero Post */}
      <PostHero
        post={{
          image: post.image!,
          title: post.title,
          summary: post.summary,
          date: post.date,
        }}
      />

      {/* Body Content */}
      <div className="max-w-7xl mx-auto px-4 mt-12 text-white …">
      <ClientPost
      code={post.body.code}
      showHeader={false}
      />
      </div>
    </section>
  )
}