// src/app/updates/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import BlogImage from '@/components/updates/BlogImage'

/** Exactly the shape your API returns for each post */
interface DiscordPost {
  id: string
  slug: string
  author: string
  date: string
  title: string
  summary: string
  bodyMd: string
  imageUrl: string | null
  // you can add `title?`, `summary?`, `slug?` if you normalize them client-side
}

export default function BlogPage() {
  const [posts, setPosts] = useState<DiscordPost[]>([])  
  const [heroLoaded, _setHeroLoaded] = useState(false)
  const [showFullSummary, setShowFullSummary] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(9)

  // Fetch posts whenever the page changes
  useEffect(() => {
    async function load() {
      console.log(`🔄 Fetching posts for page ${currentPage}`)
      try {
        const res = await fetch(`/api/discord-sync/posts?page=${currentPage}`)
        console.log(`⬅️  Response status: ${res.status}`)
        if (!res.ok) {
          throw new Error(`Discord API returned HTTP ${res.status}`)
        }
        const data = await res.json() as { total: number; posts: DiscordPost[] }
        console.log('✅ Received posts:', data.posts)
        setPosts(data.posts)
      } catch (err) {
        console.error('🚨 Error loading posts:', err)
      }
    }
    load()
  }, [currentPage])

  // Adjust posts per page on resize
  useEffect(() => {
    const sm = window.matchMedia('(min-width:640px)')
    const lg = window.matchMedia('(min-width:1024px)')
    const update = () => {
      if (lg.matches) setPostsPerPage(9)
      else if (sm.matches) setPostsPerPage(8)
      else setPostsPerPage(5)
    }
    update()
    sm.addEventListener('change', update)
    lg.addEventListener('change', update)
    return () => {
      sm.removeEventListener('change', update)
      lg.removeEventListener('change', update)
    }
  }, [])

  const heroPost = posts[0] ?? ({} as DiscordPost)
  const gridPosts = posts.slice(1)

  const MAX_TITLE_LENGTH = 26
  const MAX_SUMMARY_LENGTH = 71
  const HERO_TITLE_MAX_LENGTH = 33

  const totalPages = Math.ceil(gridPosts.length / postsPerPage)
  const paginatedPosts = gridPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  )

  // Pagination calculations
  const maxPageButtons = 3
  let startPage = Math.max(1, currentPage - 1)
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1)
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1)
  }
  const visiblePages = []
  for (let i = startPage; i <= endPage; i++) visiblePages.push(i)

  // Pull title & summary out of markdown
  const lines = (heroPost.bodyMd || '').split('\n').map((l) => l.trim())
  const titleLine = lines.find((l) => l.startsWith('# ')) || ''
  const heroTitle = titleLine.replace(/^#\s*/, '') || ''
  const heroSummary =
    lines
      .slice(lines.indexOf(titleLine) + 1)
      .find((l) => !!l && !l.startsWith('```')) || ''

  return (
    <section className="relative mx-auto px-4 pb-64 min-h-[1100px] bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
      {/* HERO */}
      <article className="mb-12 relative h-auto lg:h-[500px] max-w-7xl mx-auto">
        <div className="relative w-full h-64 lg:h-full overflow-hidden">
          <div
            className="relative z-0 w-full h-full"
            style={{
              maskImage: "url('/webp/smoke-mask-2.webp')",
              maskSize: 'cover',
              maskPosition: 'bottom center',
              maskRepeat: 'no-repeat',
              WebkitMaskImage: "url('/webp/smoke-mask-2.webp')",
              WebkitMaskSize: 'cover',
              WebkitMaskPosition: 'bottom center',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <div className={`w-full h-full transition-opacity duration-200 ease-[var(--ease-in-out-quad)] ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <BlogImage
                src={heroPost.imageUrl ?? null}
                alt={heroTitle}
                fill
                className="object-cover w-full h-full select-none"
                draggable={false}
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-l from-black/50 to-black/0 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/0" />
            </div>
          </div>
        </div>
        <div className="absolute top-32 -left-6 inset-x-4 xl:inset-x-auto xl:right-0 w-[80%] lg:w-1/2 flex-col justify-center items-start p-8 text-white z-20 hidden 2xs:flex">
          <h1
            className="bg-clip-text text-transparent text-4xl md:text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-2 uppercase"
            style={{
              backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)',
            }}
          >
            {heroTitle.length > HERO_TITLE_MAX_LENGTH
              ? `${heroTitle.slice(0, HERO_TITLE_MAX_LENGTH)}...`
              : heroTitle}
          </h1>
          <div className="w-full h-px bg-[#B4906D] my-4 max-w-3xl" />
          <p className="text-base mb-4 max-w-3xl">
            {showFullSummary || heroSummary.length <= 123
              ? heroSummary
              : heroSummary.slice(0, 123)}
            {heroSummary.length > 123 && (
              <button
                onClick={() => setShowFullSummary((f) => !f)}
                className="text-[#fbcea0] hover:underline ml-1 inline"
              >
                {showFullSummary ? '...less' : '...more'}
              </button>
            )}
          </p>
          <div className="flex justify-between items-center w-full pt-4 max-w-3xl">
            <Link
              href={`/updates/${heroPost.id ?? ''}`}
              className="py-3 px-6 text-[0.75rem] leading-[1rem] font-bold tracking-[0.2px] rounded-[5px] bg-[#E6E6E6] hover:bg-[#FFF] shadow-md text-black uppercase transition-colors"
            >
              Read more
            </Link>
            <time className="text-[#fbcea0] font-quattrocento hidden md:block">
              {heroPost.date &&
                new Date(heroPost.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
            </time>
          </div>
        </div>
      </article>

      {/* GRID */}
      <div className="max-w-7xl mx-auto relative z-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 2xs:pt-72 xs:pt-62 lg:pt-12 pb-12">
          {paginatedPosts.map((post) => (
            <Link key={post.id} href={`/updates/${post.id}`}>
              <article
                className="group cursor-pointer relative overflow-hidden w-full aspect-[450/530] gradient-border-top transition-shadow duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                style={{
                  borderStyle: 'solid',
                  borderWidth: '0 1px 1px 1px',
                  borderImage: 'linear-gradient(to top, #534C3F, #B4906C) 1',
                }}
              >
                <div
                  className="relative w-full h-2/3 bg-black overflow-hidden"
                  style={{
                    maskImage: "url('/webp/smoke-mask-2.webp')",
                    WebkitMaskImage: "url('/webp/smoke-mask-2.webp')",
                    maskPosition: 'center top',
                    WebkitMaskPosition: 'center top',
                    maskSize: 'cover',
                    WebkitMaskSize: 'cover',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                  }}
                >
                  <div className="w-full h-full group-hover:scale-105 transition-all duration-200 ease-[var(--ease-in-out-quad)]">
                    <BlogImage
                      src={post.imageUrl ?? null}
                      alt={post.title ?? ''}
                      fill
                      className="object-cover w-full h-full select-none scale-[1.75]"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 group-hover:from-black/30 group-hover:to-black/0 transition-colors duration-200 ease-[var(--ease-in-out-quad)]" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 text-white space-y-2">
                  <time className="text-[#fbcea0] font-quattrocento block font-semibold">
                    {post.date &&
                      new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                  </time>
                  <h3
                    className="bg-clip-text text-transparent text-3xl md:text-4xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-2 uppercase"
                    style={{
                      backgroundImage:
                        'linear-gradient(135deg, #fff, #fbcea0 39%, #fbcfa0)',
                    }}
                  >
                    {post.title &&
                      (post.title.length > MAX_TITLE_LENGTH
                        ? `${post.title.slice(0, MAX_TITLE_LENGTH)}...`
                        : post.title)}
                  </h3>
                  <p className="text-base">
                    {post.summary &&
                      (post.summary.length > MAX_SUMMARY_LENGTH
                        ? `${post.summary.slice(0, MAX_SUMMARY_LENGTH)}...`
                        : post.summary)}
                  </p>
                  <p className="uppercase font-quattrocento text-base tracking-wide font-semibold mt-6 text-[#fbcea0] group-hover:text-white flex items-center transition-colors duration-200 ease-[var(--ease-in-out-quad)]">
                    Read More
                    <span className="ml-2 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]">
                      →
                    </span>
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <Pagination className="pt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage((p) => Math.max(p - 1, 1))
                }}
              />
            </PaginationItem>
            {startPage > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === 1}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(1)
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {startPage > 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}
            {visiblePages.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(p)
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === totalPages}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(totalPages)
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage((p) =>
                    Math.min(p + 1, totalPages),
                  )
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div
        className="absolute bottom inset-0 bg-[url('/webp/golem-bg.webp')] bg-fixed bg-center bg-cover max-w-7xl min-w-7xl mx-auto"
        style={{
          maskImage: "url('/webp/smoke-mask.webp')",
          maskSize: "contain",
          maskPosition: "bottom center",
          maskRepeat: "no-repeat",
          WebkitMaskImage: "url('/webp/smoke-mask.webp')",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "bottom center",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    </section>
  )
}