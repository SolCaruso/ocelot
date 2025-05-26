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

interface DiscordPost {
  id: string
  slug: string
  author: string
  date: string
  title: string
  summary: string
  bodyMd: string
  imageUrl: string | null
}

export default function BlogPage() {
  const [posts, setPosts] = useState<DiscordPost[]>([])  
  const [showFullSummary, setShowFullSummary] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pagesWithContent, setPagesWithContent] = useState<Set<number>>(new Set([]))
  const [lastPageFound, setLastPageFound] = useState<number | null>(null)
  const [checkedForNextPage, setCheckedForNextPage] = useState(false)

  // Check if next page exists when on page 1
  useEffect(() => {
    async function checkNextPage() {
      if (currentPage === 1 && !checkedForNextPage && posts.length === 10) {
        try {
          console.log('Checking if page 2 exists...')
          const res = await fetch(`/api/discord-sync/posts?page=2`)
          if (res.ok) {
            const data = await res.json() as { total: number; posts: DiscordPost[] }
            if (data.posts.length > 0) {
              setPagesWithContent(prev => new Set([...prev, 2]))
              // Check if page 2 is the last page
              const expectedPosts = 9
              if (data.posts.length < expectedPosts) {
                setLastPageFound(2)
              } else {
                // Check if page 3 exists
                const res3 = await fetch(`/api/discord-sync/posts?page=3`)
                if (res3.ok) {
                  const data3 = await res3.json() as { total: number; posts: DiscordPost[] }
                  if (data3.posts.length > 0) {
                    setPagesWithContent(prev => new Set([...prev, 3]))
                    setLastPageFound(3)
                  } else {
                    setLastPageFound(2)
                  }
                } else {
                  setLastPageFound(2)
                }
              }
            } else {
              setLastPageFound(1)
            }
          }
          setCheckedForNextPage(true)
        } catch (err) {
          console.error('Error checking next page:', err)
          setCheckedForNextPage(true)
        }
      }
    }
    
    if (posts.length > 0) {
      checkNextPage()
    }
  }, [posts, currentPage, checkedForNextPage])

  // Fetch posts for current page
  useEffect(() => {
    async function loadPosts() {
      setLoading(true)
      try {
        console.log(`Fetching posts for page ${currentPage}`)
        const res = await fetch(`/api/discord-sync/posts?page=${currentPage}`)
        if (!res.ok) {
          throw new Error(`Discord API returned HTTP ${res.status}`)
        }
        const data = await res.json() as { total: number; posts: DiscordPost[] }
        console.log('Posts loaded:', data.posts.length)
        
        if (data.posts.length > 0) {
          setPosts(data.posts)
          
          // Mark this page as having content
          setPagesWithContent(prev => new Set([...prev, currentPage]))
          
          // Check if this is the last page
          const expectedPosts = currentPage === 1 ? 10 : 9
          if (data.posts.length < expectedPosts) {
            // This is the last page
            setLastPageFound(currentPage)
          }
        } else {
          // No posts returned, previous page was the last
          setLastPageFound(currentPage - 1)
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
          }
        }
        
      } catch (err) {
        console.error('Error loading posts:', err)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [currentPage])

  const heroPost = posts[0] ?? ({} as DiscordPost)
  const gridPosts = posts.slice(1)

  const MAX_TITLE_LENGTH = 26
  const MAX_SUMMARY_LENGTH = 71
  const HERO_TITLE_MAX_LENGTH = 33

  // Generate available page numbers
  const availablePages = Array.from(pagesWithContent).sort((a, b) => a - b)
  
  // Determine if next page is available
  const hasNextPage = lastPageFound !== null && currentPage < lastPageFound

  // Handle next page click with additional check
  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('Next clicked:', { currentPage, lastPageFound, hasNextPage })
    
    if (hasNextPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Parse hero post content
  const lines = (heroPost.bodyMd || '').split('\n').map((l) => l.trim())
  const titleLine = lines.find((l) => l.startsWith('# ')) || ''
  const heroTitle = titleLine.replace(/^#\s*/, '') || ''
  const heroSummary =
    lines
      .slice(lines.indexOf(titleLine) + 1)
      .find((l) => !!l && !l.startsWith('```')) || ''

  if (loading) {
    return (
      <section className="relative mx-auto px-4 pb-64 min-h-[1100px] bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-white text-xl">Loading posts...</div>
        </div>
      </section>
    )
  }

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
            <div className="w-full h-full transition-opacity duration-200 ease-[var(--ease-in-out-quad)] opacity-100">
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
          {gridPosts.map((post) => (
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

        {/* PAGINATION */}
        {availablePages.length > 0 && (
          <Pagination key={`${currentPage}-${lastPageFound}`} className="pt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {availablePages.map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={pageNum === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(pageNum)
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={handleNextClick}
                  className={!hasNextPage ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
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