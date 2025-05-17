// components/blog/ClientPost.tsx
'use client'

import React from 'react'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import BlogImage from '@/components/blog/BlogImage'      

// extend your overrides
const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  img: (props) => <BlogImage {...props} />        // ← map <img> → BlogImage
}

export function ClientPost({
  code,
  title,
  date,
}: {
  code: string
  title: string
  date: string
}) {
  const MDXContent = useMDXComponent(code)

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 prose lg:prose-lg dark:prose-invert h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <time
          dateTime={date}
          className="block text-sm uppercase text-gray-500 dark:text-gray-400"
        >
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>
      <div className="prose dark:prose-invert">
        <MDXContent components={mdxComponents} />

      </div>
    </article>
  )
}