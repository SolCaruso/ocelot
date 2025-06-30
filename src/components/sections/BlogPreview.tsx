'use client'

import Link from "next/link"
import BlogImage from "@/components/pages/updates/BlogImage"
import SvgComponent from "@/components/ui/corner"
import Frame from "@/components/ui/frame"
import { useEffect, useState } from "react"
import { getPaginatedPosts } from "@/lib/actions"

export interface BlogPost {
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

const MAX_TITLE_LENGTH = 26
const MAX_SUMMARY_LENGTH = 71
const HERO_TITLE_MAX_LENGTH = 33

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      const { posts: fetchedPosts, error } = await getPaginatedPosts(1)
      if (!error && fetchedPosts && fetchedPosts.length > 0) {
        setPosts(fetchedPosts.slice(0, 4))
      } else {
        setPosts([])
      }
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="relative mx-auto px-4 pb-24 max-w-7xl">
        <div className="grid grid-cols-3 gap-8 pb-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-full aspect-[450/530] bg-black/20 rounded-xl animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  if (!posts || posts.length === 0) return null
  const hero = posts[0]
  const cards = posts.slice(1, 4)
  const heroTitle = hero.title || ""
  const heroSummary = hero.summary || ""

  return (
    <section className="relative mx-auto pb-24 max-w-7xl">

    {/* Divider with Frame accent */}
    <div className="relative w-full flex items-center justify-center ">
      {/* Gradient divider with mask */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px w-full z-0"
        style={{
          background: "linear-gradient(90deg, transparent, #fbcea0 20%, #fbcea0 80%, transparent)",
          maskImage: "radial-gradient(ellipse 336px 12px at center, transparent 0%, transparent 60%, black 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 336px 12px at center, transparent 0%, transparent 60%, black 80%)",
        }}
      />
      {/* Frame accent, centered */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-80">
        <Frame className="scale-50" />
      </div>
    </div>

      {/* HERO SECTION */}
      <article className="mb-12 relative h-[400px] md:h-[500px] max-w-7xl mx-auto">
        <div className="relative w-full h-full overflow-hidden">
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
              <div className="absolute inset-0 z-10 bg-gradient-to-l xl:from-black/50 sm:from-black/80 from-black/90 to-black/0 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b xl:from-black/30 sm:from-black/50 from-black/70 to-black/0" />
            </div>
          </div>
        </div>
        <div className="absolute top-18 xs:top-22 md:top-32 inset-x-auto xl:right-0 w-full md:w-2/3 lg:w-1/2 flex-col justify-center items-start sm:p-8 text-white z-20 flex px-8">
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
            {heroSummary.length <= 123 ? heroSummary : heroSummary.slice(0, 123) + "..."}
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

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 pb-12 px-8">
        {cards.map((post, index) => {
          const image = post.image && post.image.trim() !== "" ? post.image : "/jpg/post.jpg"
          return (
            <Link key={post.date} href={`/updates/${post.date}`} className={`${
              index === 0 ? "block" : // First card always visible
              index === 1 ? "hidden md:block" : // Second card visible on md and up
              index === 2 ? "hidden xl:block" : // Third card visible on xl and up
              "hidden" // Fourth card always hidden
            }`}>
              <article
                className={`
                  group cursor-pointer relative overflow-hidden w-full aspect-[450/530] gradient-border-top transition-all duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                  opacity-100 translate-y-0
                `}
                style={{
                  borderStyle: "solid",
                  borderWidth: "0 1px 1px 1px",
                  borderImage: "linear-gradient(to top, #534C3F, #B4906C) 1",
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

      {/* SEE ALL Button */}
      <div className="flex justify-start px-8">
        <Link
          href="/updates"
          className="group cursor-pointer relative overflow-hidden px-16 py-4 gradient-border-top transition-all duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] opacity-100 translate-y-0 backdrop-blur-sm bg-black/20"
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
            <p className="uppercase font-quattrocento text-base tracking-wide font-semibold text-[#fbcea0] group-hover:text-white text-center">
              See All
            </p>
            <span className="absolute left-full ml-2 top-0 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 ease-[var(--ease-in-out-quad)] text-[#fbcea0] group-hover:text-white">
              →
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
