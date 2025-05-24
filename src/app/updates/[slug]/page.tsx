// src/app/updates/[slug]/page.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getPosts } from '@/lib/getPosts'
import { notFound } from 'next/navigation'
import PostHero from '@/components/updates/PostHero'
import { ClientPost } from '@/components/updates/ClientPost'

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

// @ts-ignore
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const posts = getPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <section className="relative mx-auto px-4 pb-64 bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
      <PostHero
        post={{
          image: post.image!,   // assert non-null so TS is happy
          title: post.title,
          summary: post.summary,
          date: post.date,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 mt-12 text-white">
        <ClientPost
          code={post.body.code}
          title={post.title}
          date={post.date}
          showHeader={false}
        />
      </div>
    </section>
  )
}