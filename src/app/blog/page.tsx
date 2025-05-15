'use client'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import BlogImage from '@/components/blog/BlogImage'
import { useState, useEffect } from 'react'

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  // split out hero and grid posts
  const heroPost = posts[0];
  const gridPosts = posts.slice(1);
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  return (
    <section className="relative mx-auto px-4 pb-64 min-h-[1100px] bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover">
      <div className='max-w-7xl mx-auto relative z-5'>

        {/* Hero Post */}
        <article className="mb-12 flex flex-col lg:flex-row w-full h-64 lg:h-[500px]">
          {/* Left: Masked Image */}
          <div
            className="relative w-full lg:w-3/4 h-full overflow-hidden"
            style={{
              maskImage: "url('/webp/smoke-mask-2.webp')",
              maskSize: "contain",
              maskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskImage: "url('/webp/smoke-mask-2.webp')",
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            <div
              className={`w-full h-full transition-opacity duration-200 ease-[var(--ease-in-out-quad)] ${
                heroLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <BlogImage
                src={heroPost.image!}
                alt={heroPost.title}
                fill
                className="object-cover w-full h-full select-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/0"></div>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="absolute top-42 right-0 w-full lg:w-1/2 flex flex-col justify-center items-start p-8 text-white">
            <div className="text-5xl font-bold mb-4">
              {heroPost.title}
            </div>
            <time className="text-gray-300 mb-6">
              {new Date(heroPost.date).toLocaleDateString('en-US')}
            </time>
            <Link
              href={heroPost.url}
              className=" items-center justify-center py-3 px-6 text-[0.75rem] leading-[1rem] font-bold tracking-[0.2px] cursor-pointer border-none rounded-[5px] transition-colors duration-200 ease-in-out bg-[#E6E6E6] hover:bg-[#FFF] shadow-md  text-black uppercase md:block hidden"
            >
              Read more
            </Link>
          </div>
        </article>

        {/* Grid Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-22 pb-12">
          {gridPosts.slice(0, 9).map(post => (
            <article key={post._id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              {post.image && (
                <BlogImage
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={post.url} className="text-gray-900 dark:text-gray-100 hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <time className="text-gray-500 text-sm block mb-2">
                  {new Date(post.date).toLocaleDateString('en-US')}
                </time>
                <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
                  {post.summary}
                </p>
                <Link href={post.url} className="text-indigo-600 hover:underline">
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="pt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

      </div>
      {/* Golem bg */}
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