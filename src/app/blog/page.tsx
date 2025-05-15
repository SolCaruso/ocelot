import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <section>
      <h1>Blog</h1>
      {posts.map((post) => (
        <article key={post._id}>
          <h2>
            <Link href={post.url}>{post.title}</Link>
          </h2>
          <time dateTime={post.date}>{post.date}</time>
          <p>{post.summary}</p>
        </article>
      ))}
    </section>
  )
}