// src/components/ClientPost.tsx
'use client'

import React from 'react'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

// define your MDX overrides
const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  // …any other overrides…
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
    <article className="prose mx-auto">
      <h1>{title}</h1>
      <time dateTime={date}>{date}</time>
      <MDXContent components={mdxComponents} />
    </article>
  )
}