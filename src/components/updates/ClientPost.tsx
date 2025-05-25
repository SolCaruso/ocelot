'use client'

import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import Image from 'next/image'
import ShareButtons from './ShareButtons'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

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
  return (
    <article className="relative max-w-3xl mx-auto px-4 py-8 prose lg:prose-lg dark:prose-invert">
      {/* Breadcrumb & Share */}
      <div className="flex justify-between items-center mb-6">
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
                {title?.split(' ').slice(0, 6).join(' ')}...
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ShareButtons title={title || ''} />
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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }: { href?: string; children?: ReactNode }) => (
              <Link href={href ?? '#'}>{children}</Link>
            ),
            img: ({ src, alt }: { src?: string; alt?: string }) => (
              <Image
                src={src!}
                alt={alt!}
                width={800}
                height={400}
                className="my-4"
              />
            ),
          }}
        >
          {code}
        </ReactMarkdown>
      </div>
    </article>
  )
}