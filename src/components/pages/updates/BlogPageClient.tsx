"use client"

import { useState, useEffect, useTransition } from "react"
import Link from "next/link"
import BlogImage from "@/components/pages/updates/BlogImage"
import { getPaginatedPosts } from "@/lib/actions"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import SvgComponent from "@/components/ui/corner"

interface BlogPost {
  id: number
  date: string
  title: string
  summary: string
  body: string
  image?: string | null
}

function formatDateUTC(dateString: string): string {
  try {
    const date = new Date(dateString + "T00:00:00Z")
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  } catch {
    return dateString
  }
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-full aspect-[450/530]">
      <Skeleton className="h-[80%] w-full rounded-xl" />
      <div className="space-y-3 px-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-[80%]" />
      </div>
    </div>
  )
}

export default function BlogPageClient({ heroPost, initialPosts }: { heroPost: BlogPost; initialPosts?: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts ?? [])
  const [showFullSummary, setShowFullSummary] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(!(initialPosts && initialPosts.length > 0))
  const [totalPosts, setTotalPosts] = useState<number>(0)
  const [animateIn, setAnimateIn] = useState(false)
  const [hero, setHero] = useState<BlogPost>(heroPost)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    async function loadPosts() {
      setLoading(true)
      setAnimateIn(false)

      startTransition(async () => {
        try {
          const { posts: fetchedPosts, total, error } = await getPaginatedPosts(currentPage)

          if (error) {
            console.error("Error loading posts:", error)
            return
          }

          if (currentPage === 1) {
            setPosts(fetchedPosts.slice(1))
            setHero(fetchedPosts[0])
          } else {
            setPosts(fetchedPosts)
          }

          setTotalPosts(total)
        } catch (error) {
          console.error("Error loading posts:", error)
        } finally {
          setLoading(false)
          setTimeout(() => setAnimateIn(true), 10)
        }
      })
    }

    loadPosts()
  }, [currentPage])

  const postsPerPage = 9
  const totalPages = totalPosts > 0 ? Math.ceil((totalPosts - 1) / postsPerPage) + 1 : 1
  const availablePages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((pageNum) => {
    if (pageNum === 1) return true
    const start = 1 + (pageNum - 1) * postsPerPage
    return start < totalPosts
  })
  const hasNextPage = currentPage < availablePages.length && availablePages.length > 1
  const hasPrevPage = currentPage > 1

  // Use hero.title and hero.summary directly for the hero
  const heroTitle = hero.title || ""
  const heroSummary = hero.summary || ""

  const MAX_TITLE_LENGTH = 26
  const MAX_SUMMARY_LENGTH = 71
  const HERO_TITLE_MAX_LENGTH = 33

  return (
    <section className="relative mx-auto px-4 pb-64 min-h-[1100px] bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
      {/* HERO SECTION: always render instantly */}
      <article className="mb-12 relative h-auto lg:h-[500px] max-w-7xl mx-auto">
        <div className="relative w-full h-64 lg:h-full overflow-hidden">
          <div
            className="relative z-0 w-full h-full"
            style={{
              maskImage: "url('/webp/smoke-mask-2.webp')",
              maskSize: "cover",
              maskPosition: "bottom center",
              maskRepeat: "no-repeat",
              WebkitMaskImage: "url('/webp/smoke-mask-2.webp')",
              WebkitMaskSize: "cover",
              WebkitMaskPosition: "bottom center",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            <div className="w-full h-full transition-opacity duration-200 ease-[var(--ease-in-out-quad)] opacity-100">
              <BlogImage
                src={hero.image ?? null}
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
        <div className="absolute top-32 -left-6 inset-x-4 xl:inset-x-auto xl:right-0 sm:w-[80%] lg:w-1/2 flex-col justify-center items-start p-8 text-white z-20 flex">
          <h1
            className="bg-clip-text text-transparent text-4xl md:text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-2 uppercase"
            style={{
              backgroundImage: "linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)",
            }}
          >
            {heroTitle.length > HERO_TITLE_MAX_LENGTH ? `${heroTitle.slice(0, HERO_TITLE_MAX_LENGTH)}...` : heroTitle}
          </h1>
          <div className="w-full h-px bg-[#B4906D] my-4 max-w-3xl" />
          <p className="text-base mb-4 max-w-3xl">
            {showFullSummary || heroSummary.length <= 123 ? heroSummary : heroSummary.slice(0, 123)}
            {heroSummary.length > 123 && (
              <button
                onClick={() => setShowFullSummary((f) => !f)}
                className="text-[#fbcea0] hover:underline ml-1 inline"
              >
                {showFullSummary ? "...less" : "...more"}
              </button>
            )}
          </p>
          <div className="flex justify-between items-center w-full pt-4 max-w-3xl">
            <Link
              href={`/updates/${hero.date ?? ""}`}
              className="group cursor-pointer relative overflow-hidden px-8 py-3.5 gradient-border-top transition-all duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] opacity-100 translate-y-0 backdrop-blur-sm bg-black/20"
              style={{
                borderStyle: "solid",
                borderWidth: "0 1px 1px 1px",
                borderImage: "linear-gradient(to top, #534C3F, #B4906C) 1",
              }}
            >
              {/* Top Left Corner */}
              <div className="absolute top-0 left-0 z-10 scale-x-[-1] opacity-50">
                <SvgComponent className="w-12 h-12" />
              </div>
              {/* Top Right Corner */}
              <div className="absolute top-0 right-0 z-10 opacity-50">
                <SvgComponent className="w-12 h-12" />
              </div>
              {/* Bottom Left Corner */}
              <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1] opacity-50">
                <SvgComponent className="w-12 h-12" />
              </div>
              {/* Bottom Right Corner */}
              <div className="absolute bottom-0 right-0 z-10 scale-y-[-1] opacity-50">
                <SvgComponent className="w-12 h-12" />
              </div>
              
              <div className="relative">
                <p className="uppercase font-quattrocento text-sm tracking-wide font-semibold text-[#fbcea0] group-hover:text-white text-center">
                  Read More
                </p>
              </div>
            </Link>
            <time className="text-[#fbcea0] font-quattrocento hidden md:block">
              {hero.date && formatDateUTC(hero.date)}
            </time>
          </div>
        </div>
      </article>

      {/* CARDS GRID: show loading only for this part */}
      <div className="max-w-7xl mx-auto relative z-5">
        {loading || isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-62 lg:pt-12 pb-12">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-62 lg:pt-12 pb-12">
            {posts.map((post) => {
              const image = post.image && post.image.trim() !== "" ? post.image : "/jpg/post.jpg"
              return (
                <Link key={post.date} href={`/updates/${post.date}`}>
                  <article
                    className={`
                      group cursor-pointer relative overflow-hidden w-full aspect-[450/530] gradient-border-top transition-all duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                      ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                    `}
                    style={{
                      borderStyle: "solid",
                      borderWidth: "0 1px 1px 1px",
                      borderImage: "linear-gradient(to top, #534C3F, #B4906C) 1",
                      transitionDelay: `${Math.floor(Math.random() * 200)}ms`,
                    }}
                  >
                    {/* Top Left Corner */}
                    <div className="absolute top-0 left-0 z-10 scale-x-[-1]">
                      <SvgComponent className="w-20 h-20" />
                    </div>
                    {/* Top Right Corner */}
                    <div className="absolute top-0 right-0 z-10">
                      <SvgComponent className="w-20 h-20" />
                    </div>
                    <div
                      className="relative w-full h-2/3 bg-black overflow-hidden"
                      style={{
                        maskImage: "url('/webp/smoke-mask-2.webp')",
                        WebkitMaskImage: "url('/webp/smoke-mask-2.webp')",
                        maskPosition: "center top",
                        WebkitMaskPosition: "center top",
                        maskSize: "cover",
                        WebkitMaskSize: "cover",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                      }}
                    >
                      <div className="w-full h-full group-hover:scale-105 transition-all duration-200 ease-[var(--ease-in-out-quad)]">
                        <BlogImage
                          src={image}
                          alt={post.title ?? ""}
                          fill
                          className="object-cover w-full h-full select-none scale-[1.75]"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 group-hover:from-black/30 group-hover:to-black/0 transition-colors duration-200 ease-[var(--ease-in-out-quad)]" />
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white space-y-2">
                      <time className="text-[#fbcea0] font-quattrocento block font-semibold">
                        {post.date && formatDateUTC(post.date)}
                      </time>
                      <h3
                        className="bg-clip-text text-transparent text-3xl md:text-4xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-2 uppercase"
                        style={{
                          backgroundImage: "linear-gradient(135deg, #fff, #fbcea0 39%, #fbcfa0)",
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
              )
            })}
          </div>
        )}

        {/* PAGINATION */}
        {availablePages.length > 0 && (
          <Pagination className="pt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (hasPrevPage && !isPending) {
                      setCurrentPage(currentPage - 1)
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  }}
                  className={!hasPrevPage || isPending ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {availablePages.map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={pageNum === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      if (!isPending) {
                        setCurrentPage(pageNum)
                      }
                    }}
                    className={isPending ? "pointer-events-none opacity-50" : ""}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (hasNextPage && !isPending) {
                      setCurrentPage(currentPage + 1)
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  }}
                  className={!hasNextPage || isPending ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <div
        className="absolute bottom inset-0 bg-[url('/webp/golem.webp')] bg-fixed bg-center bg-cover max-w-7xl min-w-7xl mx-auto"
        style={{
          maskImage: "url('/webp/smoke-mask.webp')",
          maskSize: "contain",
          maskPosition: "bottom center",
          maskRepeat: "no-repeat",
          WebkitMaskImage: "url('/webp/smoke-mask.webp')",
          WebkitMaskSize: "contain",
        }}
      />
    </section>
  )
}
