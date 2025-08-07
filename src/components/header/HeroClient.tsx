"use client"

import { useState, useEffect, useRef } from 'react'
import Play from "@/components/ui/icons/Play"
import Image from "next/image"
import thumbAvif from '@/assets/avif/thumb.avif'
import thumbWebp from '@/assets/webp/thumb.webp'

interface HeroClientProps {
  onPlay?: () => void
}

export default function HeroClient({ onPlay }: HeroClientProps) {
  const [playing, setPlaying] = useState(false)
  const playerRef = useRef<YT.Player | null>(null)

  useEffect(() => {
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: "feH6zZBT1g8",
        playerVars: {
          rel: 0,
          modestbranding: 1,
          controls: 0,
          disablekb: 1,
        },
        events: {
          onReady: (e: { target: YT.Player }) => {
            if (playing) {
              e.target.playVideo()
            }
          },
        },
      })
    }
  }, [playing])

  useEffect(() => {
    if (playing && playerRef.current?.playVideo) {
      playerRef.current.playVideo()
    }
  }, [playing])

  // Smoke effect for FANTASY TACTICS text
  useEffect(() => {
    const smokeElement = document.getElementById('fantasy-tactics-smoke')
    if (smokeElement) {
      // Trigger smoke effect when element comes into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.5 })
      
      observer.observe(smokeElement)
    }
  }, [])

  const handlePlay = () => {
    setPlaying(true)
    onPlay?.()
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo()
    }
  }

  return (
    <>
      {/* Video and text block - moved outside mask */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="relative h-full flex items-end">
          <div className="w-full sm:max-w-7xl mx-auto px-6 pb-24 pointer-events-auto">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
              {/* Video placeholder */}
              <div
                className="aspect-[16/9] w-full max-w-[440px] sm:max-w-[540px] md:max-w-[640px] h-auto bg-gs-bg relative filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] border-[1.5px] border-[#282828] md:opacity-80 hover:opacity-100 transition-opacity duration-200 ease-[var(--ease-in-out-quad)] cursor-pointer"
                onClick={handlePlay}
              >
                {!playing ? (
                  <>
                    <picture>
                      <source srcSet={thumbAvif.src} type="image/avif" />
                      <Image
                        src={thumbWebp}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 540px, 640px"
                        draggable={false}
                        priority
                        fetchPriority="high"
                        placeholder="blur"
                        quality={15}
                      />
                    </picture>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28">
                      <Play className="w-full h-full" />
                    </div>
                  </>
                ) : (
                  <iframe
                    id="yt-player"
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/feH6zZBT1g8?enablejsapi=1&autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Text block */}
              <div className="md:ml-8 flex-1 text-center lg:text-left max-w-xl min-w-[20rem]">
                {/* Simple text for screens under xl */}
                <h2 
                  className="xl:hidden text-4xl md:text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-4 tracking-[0.02em] text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)" }}
                >
                  FANTASY TACTICS
                </h2>
                {/* Smoke effect for xl+ screens */}
                <h2
                  className="max-xl:hidden smoke text-4xl md:text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-4 tracking-[0.02em]"
                  id="fantasy-tactics-smoke"
                >
                  <div>
                    <span>F</span><span>A</span><span>N</span><span>T</span><span>A</span><span>S</span><span>Y</span><span>&nbsp;</span><span>T</span><span>A</span><span>C</span><span>T</span><span>I</span><span>C</span><span>S</span>
                  </div>
                </h2>
                <p className="mt-4 text-stone-50 md:text-xl font-quattrocento filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] ">
                  Tactical, isometric turn-based combat draws inspiration from the classic RPGs of old, offering both
                  depth and strategy.
                </p>
                <p className="mt-4 md:text-xl text-stone-50 font-quattrocento filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
                  As you recruit and assemble a diverse party, each member&apos;s unique abilities become crucial to your
                  success on the battlefield.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
  }
} 