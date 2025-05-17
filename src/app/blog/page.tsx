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
  const MAX_TITLE_LENGTH = 26; // adjust this value to set the truncation limit
  const MAX_SUMMARY_LENGTH = 71; // adjust to set the truncation limit for card summaries
  const gridPosts = posts.slice(1);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [showFullSummary, setShowFullSummary] = useState(false);

  // Pagination state and calculations
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(() => {
    if (typeof window === 'undefined') return 9;
    if (window.matchMedia('(min-width: 1024px)').matches) {
      return 9;
    } else if (window.matchMedia('(min-width: 640px)').matches) {
      return 8;
    } else {
      return 5;
    }
  });
  const totalPages = Math.ceil(gridPosts.length / postsPerPage);
  const paginatedPosts = gridPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );
  // Determine sliding window of page numbers (max 3 at a time)
  const maxPageButtons = 3;
  let startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }
  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  useEffect(() => {
    const smQuery = window.matchMedia('(min-width: 640px)');
    const lgQuery = window.matchMedia('(min-width: 1024px)');
    function updatePostsPerPage() {
      if (lgQuery.matches) {
        setPostsPerPage(9);
      } else if (smQuery.matches) {
        setPostsPerPage(8);
      } else {
        setPostsPerPage(5);
      }
    }
    updatePostsPerPage();
    smQuery.addEventListener('change', updatePostsPerPage);
    lgQuery.addEventListener('change', updatePostsPerPage);
    return () => {
      smQuery.removeEventListener('change', updatePostsPerPage);
      lgQuery.removeEventListener('change', updatePostsPerPage);
    };
  }, []);

  return (
    <section className="relative mx-auto px-4 pb-64 min-h-[1100px] bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
      {/* Hero Post */}
      <article className="mb-12 w-screen relative h-auto lg:h-[500px] lg:overflow-hidden max-w-7xl mx-auto">
        {/* Left: Masked Image */}
        <div
          className="relative w-full h-64 lg:h-full overflow-hidden"
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
        <div className="absolute top-32 -left-6 inset-x-4 xl:inset-x-auto xl:right-0 w-[80%] lg:w-1/2 flex-col justify-center items-start p-8 text-white z-10 hidden 2xs:flex">
          <div className="bg-clip-text text-transparent text-4xl md:text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-2 uppercase"
          style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}>
            {heroPost.title}
          </div>
          <div className="w-full h-px bg-[#B4906D] my-4 max-w-3xl" />
          <p className="text-base mb-4 transition-all duration-200 ease-[var(--ease-in-out-quad)] max-w-3xl">
            {showFullSummary || heroPost.summary.length <= 123
              ? heroPost.summary
              : heroPost.summary.slice(0, 123)}
            {heroPost.summary.length > 123 && (
              <>
                {!showFullSummary ? (
                  <>
                    <button
                      onClick={() => setShowFullSummary(true)}
                      className="text-[#fbcea0] transition duration-200 ease-[var(--ease-in-out-quad)] hover:underline ml-1 inline cursor-pointer"
                    >
                      ...more
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowFullSummary(false)}
                      className="text-[#fbcea0] transition duration-200 ease-[var(--ease-in-out-quad)] hover:underline ml-1 inline cursor-pointer"
                    >
                      ...less
                    </button>
                  </>
                )}
              </>
            )}
          </p>
          <div className="flex justify-between items-center w-full pt-4 max-w-3xl">
            <Link
              href={heroPost.url}
              className=" items-center justify-center py-3 px-6 text-[0.75rem] leading-[1rem] font-bold tracking-[0.2px] cursor-pointer border-none rounded-[5px] transition-colors duration-200 ease-in-out bg-[#E6E6E6] hover:bg-[#FFF] shadow-md  text-black uppercase"
            >
              Read more
            </Link>
            <time className="text-[#fbcea0] font-quattrocento font-semibold hidden md:block">
              {new Date(heroPost.date).toLocaleDateString('en-US', {
                month: 'long',
                day:   'numeric',
                year:  'numeric',
              })}
            </time>
          </div>
        </div>
      </article>

      <div className='max-w-7xl mx-auto relative z-5'>
        {/* Grid Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 2xs:pt-72 xs:pt-62 lg:pt-12 pb-12">
          {paginatedPosts.map(post => (
            <Link key={post._id} href={post.url}>
              <article className="group cursor-pointer relative overflow-hidden w-full aspect-[450/530] gradient-border-top transition-shadow duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              style={{
                borderStyle: 'solid',
                borderWidth: '0 1px 1px 1px',                             
                borderImage: 'linear-gradient(to top, #534C3F, #B4906C) 1',
              }}>
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
                  <div
                    className="w-full h-full transition-all duration-200 ease-[var(--ease-in-out-quad)] group-hover:scale-105"
                  >
                    <BlogImage
                      src={post.image!}
                      alt={post.title}
                      fill
                      className="object-cover w-full h-full select-none scale-[1.75]"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 transition-colors duration-200 ease-[var(--ease-in-out-quad)] group-hover:from-black/30 group-hover:to-black/0"></div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 text-white space-y-2 ">
                  <time className="text-[#fbcea0] font-quattrocento block font-semibold">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day:   'numeric',
                      year:  'numeric',
                    })}
                  </time>
                  <h3 className="bg-clip-text text-transparent text-3xl md:text-4xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-2 uppercase"
                    style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 39%, #fbcfa0)' }}>
                      {post.title.length > MAX_TITLE_LENGTH
                        ? `${post.title.slice(0, MAX_TITLE_LENGTH)}...`
                        : post.title}
                  </h3>
                  <p className="text-base">
                    {post.summary.length > MAX_SUMMARY_LENGTH
                      ? `${post.summary.slice(0, MAX_SUMMARY_LENGTH)}...`
                      : post.summary}
                  </p>
                <p className="uppercase font-quattrocento text-base tracking-wide font-semibold mt-6 transition-colors duration-200 ease-[var(--ease-in-out-quad)] text-[#fbcea0] group-hover:text-white flex items-center">
                  Read More
                  <span className="ml-2 opacity-0 transform translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 ease-[var(--ease-in-out-quad)]">
                    →
                  </span>
                </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="pt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(p - 1, 1)); }}
              />
            </PaginationItem>
            {startPage > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === 1}
                    onClick={(e) => { e.preventDefault(); setCurrentPage(1); }}
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
            {visiblePages.map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
                >
                  {page}
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
                    onClick={(e) => { e.preventDefault(); setCurrentPage(totalPages); }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(p + 1, totalPages)); }}
              />
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