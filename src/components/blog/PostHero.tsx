// src/components/blog/PostHero.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PostHeroProps {
  post: {
    image: string
    title: string
    summary: string
    date: string
  }
}

export default function PostHero({ post }: PostHeroProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <article className="mb-12 w-screen relative h-auto lg:h-[500px] lg:overflow-hidden max-w-7xl mx-auto">
      {/* Masked Image */}
      <div
        className="relative w-full h-full"
        style={{
          maskImage: "url('/webp/hero-mask.webp')",
          maskSize: "cover",
          maskPosition: "bottom center",
          maskRepeat: "no-repeat",
          WebkitMaskImage: "url('/webp/hero-mask.webp')",
          WebkitMaskSize: "cover",
          WebkitMaskPosition: "bottom center",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div
          className={`relative w-full h-64 lg:h-full overflow-hidden transition-opacity duration-200 ease-[var(--ease-in-out-quad)] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={post.image}             // ← no prefixing here
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover w-full h-full select-none scale-110"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/0" />
        </div>
      </div>

      {/* Text Content */}
      <div className="absolute bottom-0 inset-x-4 xl:inset-x-auto xl:left-24 xl:w-1/2 flex flex-col justify-center items-start p-8 text-white z-10">
        <h1
          className="bg-clip-text text-transparent text-4xl md:text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-2 uppercase"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)',
          }}
        >
          {post.title}
        </h1>

        <time className="text-[#fbcea0] font-quattrocento font-semibold">
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </div>
    </article>
  )
}