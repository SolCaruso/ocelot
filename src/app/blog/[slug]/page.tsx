// src/app/blog/[slug]/page.tsx
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { ClientPost } from '@/components/blog/ClientPost'

// 1. still async so Next can statically generate
export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function PostPage(props: any) {
  const { params } = props;
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug)
  if (!post) notFound()

  return (
    <ClientPost
      code={post.body.code}
      title={post.title}
      date={post.date}
    />
  )
}