// components/blog/ClientPost.tsx
'use client'

import React from 'react'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import BlogImage from '@/components/updates/BlogImage'
import ShareButtons from './ShareButtons'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// extend your overrides
const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  img: (props) => <BlogImage {...props} />
}

export function ClientPost({
  code,
  title,
  date,
  showHeader = true,
}: {
  code: string
  title?: string
  date?: string
  showHeader?: boolean
}) {
  const MDXContent = useMDXComponent(code)

  return (
    <article className="relative max-w-3xl mx-auto px-4 py-8 prose lg:prose-lg dark:prose-invert">

      {/* Top Row: Breadcrumb on left, Share on right */}
      <div className="flex justify-between items-center mb-6">
        {/* Breadcrumb on Left */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/updates">Updates</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {title?.split(" ").slice(0, 6).join(" ")}...
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Share Button on Right */}
        <div className="z-20">
          <ShareButtons title={title ?? ""} />
        </div>
      </div>

      {showHeader && (
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <time
            dateTime={date}
            className="block text-sm uppercase text-gray-500 dark:text-gray-400"
          >
            {date &&
              new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
          </time>
        </header>
      )}

      <div className="prose dark:prose-invert">
        <MDXContent components={mdxComponents} />
      </div>

    </article>
  )
}