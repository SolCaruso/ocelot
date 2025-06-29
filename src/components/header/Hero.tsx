"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import clsx from "clsx"
import Steam from "@/components/logos/partners/Steam"
import Unity from "@/components/logos/partners/Unity"
import Solana from "@/components/logos/partners/Solana"
import Ocelot from "@/components/logos/partners/Ocelot"
import SteamMobile from "@/components/logos/partners-mobile/Steam"
import UnityMobile from "@/components/logos/partners-mobile/Unity"
import SolanaMobile from "@/components/logos/partners-mobile/Solana"
import OcelotMobile from "@/components/logos/partners-mobile/Ocelot"
import Image from "next/image"
import Divider from "@/components/ui/divider"
import Play from "@/components/ui/icons/Play"

interface HeroProps {
  /** Tailwind classes for responsive sizing, e.g. "h-40 md:h-56 lg:h-72" */
  className?: string
  /** Optional inline height fallback, e.g. "900px" */
  height?: string
  children?: React.ReactNode
  /** Hero configuration object */
  config: {
    videoSrc: string
    logo: {
      src: string
      alt: string
      widthClasses: string
    }
    title: string
    subtitle: string
    characterIllustration: {
      src: string
      alt: string
    }
    partners: {
      showSolana: boolean
    }
    layout: {
      logoPadding: string
      partnerMargin: string
      buttonPosition: string
      buttonSize: string
    }
  }
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
  }
}

const Hero: React.FC<HeroProps> = ({ className, height, children, config }) => {
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

  const handlePlay = () => {
    setPlaying(true)
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo()
    }
  }

  return (
    <div className="w-full relative bg-[url('/webp/smoke.webp')] bg-cover bg-center bg-fixed">
      {/* Video Hero Section with circular mask */}
      <div
        className={clsx("w-full relative z-10 overflow-hidden max-w-8xl mx-auto", className)}
        style={height ? { height } : undefined}
      >
        <div className="[mask-image:radial-gradient(circle_at_center,_white_40%,_transparent_85%)] [mask-repeat:no-repeat] [mask-position:center] relative w-full h-full">
          <video
            src={config.videoSrc}
            className="w-full h-full object-cover z-0 scale-x-[-1]"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Masks/Shaders */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/[36%] via-black/0 to-black/[36%] pointer-events-none hidden md:block" />
          <div className="absolute inset-0 z-15 bg-black/[30%] pointer-events-none" />
        </div>

        <div className={`absolute inset-x-0 top-0 bottom-0 transform-gpu z-20 flex flex-col items-center justify-center md:justify-start text-center ${config.layout.logoPadding}`}>
          {/* Logo */}
          <Image
            src={config.logo.src}
            alt={config.logo.alt}
            className={`mx-auto h-auto mb-4 ${config.logo.widthClasses} select-none animate-slide-up-gentle`}
            width={1920}
            height={1080}
            draggable={false}
          />

          {/* Text */}
          {config.title && (
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 text-center">
              <div className="relative inline-block animate-slide-up-gentle opacity-0" style={{ animationDelay: "0.2s" }}>
                {/* Beneath, stationary text */}
                <h2 className="text-[#E0A970] text-3xl sm:text-4xl lg:text-5xl font-oldFenris layer-blur whitespace-pre-line">
                  {config.title}
                </h2>
                {/* Overlaying text */}
                <h2 className="absolute inset-0 text-[#E7E7E7] text-3xl sm:text-4xl lg:text-5xl font-oldFenris text-shadow-xs whitespace-pre-line">
                  {config.title}
                </h2>
              </div>
              {config.subtitle && (
                <h3 className="font-semibold text-[#B9B9B9] md:text-lg text-center filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  {config.subtitle}
                </h3>
              )}
            </div>
          )}

          {/* Button */}
          <a
            href="https://store.steampowered.com/app/2184350/Guild_Saga_Vanished_Worlds/"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-2 font-oldFenris bg-black hover:bg-[#18160d] opacity-80 hover:opacity-100 cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)] ${config.layout.buttonSize} ${config.layout.buttonPosition}`}
            style={{
              border: "10px solid transparent",
              borderImage: 'url("/webp/temp-btn.webp") 20 round',
            }}
          >
            BUY NOW
          </a>
        </div>

        <div className={`absolute inset-x-0 bottom-0 ${config.layout.partnerMargin} flex items-center justify-center opacity-50`}>
          {/* Partner logos */}
          <div>
            <Steam className="h-18 w-auto hidden lg:block" />
            <SteamMobile className="h-14 w-auto lg:hidden" />
          </div>
          <div>
            <Unity className="h-20 ml-6 w-auto hidden lg:block" />
            <UnityMobile className="h-14 w-auto lg:hidden" />
          </div>
          <div>
            <Ocelot className="h-20 w-auto mb-4 hidden lg:block" />
            <OcelotMobile className="h-14 w-auto mb-4 lg:hidden" />
          </div>
          {config.partners.showSolana && (
            <div>
              <Solana className="h-20 w-auto hidden lg:block" />
              <SolanaMobile className="h-14 w-auto lg:hidden" />
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#232325] to-transparent" />

      {/* Trailer section with elliptical mask */}
      <div className="3xl:[mask-image:radial-gradient(ellipse_40%_100%_at_center,_white_45%,_transparent_85%)] 2xl:[mask-image:radial-gradient(ellipse_60%_100%_at_center,_white_45%,_transparent_85%)] [mask-image:radial-gradient(ellipse_80%_100%_at_center,_white_45%,_transparent_85%)] 2xl:[mask-repeat:no-repeat] 2xl:[mask-position:center] relative w-full">
        {/* Smoke gradient overlay - now masked */}
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-black/30 to-black/0 pointer-events-none" />

        {/* --- TRAILER SECTION START --- */}
        <section className="relative overflow-x-clip">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/webp/leather-texture.webp")',
              backgroundRepeat: "repeat",
              boxShadow:
                "inset 0px 1px 0px rgba(0,0,0,0.24), inset 0px 2px 0px rgba(255,255,255,0.06), inset 0px -1px 0px rgba(0,0,0,0.24), inset 0px -2px 0px rgba(255,255,255,0.06)",
            }}
          />

          {/* Separate radial gradient overlay that will be masked */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(farthest-corner at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 80%)",
            }}
          />

          {/* Empty space to maintain layout height */}
          <div className="relative sm:max-w-7xl mx-auto px-6 py-38 xs:py-32 sm:py-28 md:py-38 lg:py-24">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
              {/* Placeholder for video space */}
              <div className="aspect-[16/9] w-full max-w-[440px] sm:max-w-[540px] md:max-w-[640px] h-auto opacity-0 pointer-events-none" />
              {/* Placeholder for text space */}
              <div className="md:ml-8 flex-1 max-w-xl min-w-[20rem] opacity-0 pointer-events-none">
                <div className="h-32" />
              </div>
            </div>
          </div>
          
        </section>
        {/* --- TRAILER SECTION END --- */}
        <div className="w-full h-px bg-[#232325]" />
      </div>

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
                    <Image
                      src="/webp/thumb.webp"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                      width={640}
                      height={360}
                      draggable={false}
                    />
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
                <h3
                  className="bg-clip-text text-transparent text-4xl md:text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-4"
                  style={{ backgroundImage: "linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)" }}
                >
                  FANTASY TACTICS
                </h3>
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

      {/* Undine illustration - outside mask */}
      <div className="absolute -right-12 bottom-0 z-50 2xl:block hidden opacity-30 3xl:opacity-100 select-none animate-slide-in-transform pointer-events-none">
        <Image
          src={config.characterIllustration.src}
          alt={config.characterIllustration.alt}
          width={1506}
          height={2000}
          className="object-contain w-[500px] 4xl:w-[700px]"
          draggable={false}
        />
      </div>

      {/* Divider - outside mask */}
      <div className="relative z-40">
        <Divider />
      </div>

      {children}
    </div>
  )
}

export default Hero
