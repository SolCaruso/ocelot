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
import SmokeLogo from "@/components/ui/smoke-logo"
import "./SmokeFX.css"

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
      showSteam?: boolean
    }
    layout: {
      logoPadding: string
      partnerMargin: string
      buttonPosition: string
      buttonSize: string
      buttonTop: string
      showButton?: boolean
      showTrailer?: boolean
      characterSize?: string
    }
    shadows: {
      topGradient: string
      bottomGradient: string
      overlay: string
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
          <div className={`absolute inset-0 z-10 ${config.shadows.topGradient} pointer-events-none hidden md:block`} />
          <div className={`absolute inset-0 z-15 ${config.shadows.overlay} pointer-events-none`} />
        </div>

        <div className={`absolute inset-x-0 top-0 bottom-0 transform-gpu z-20 flex flex-col items-center justify-center md:justify-start text-center ${config.layout.logoPadding} ${config.logo.src.includes('lab.webp') || config.logo.src.includes('lab.webm') ? 'translate-y-8 md:translate-y-12' : ''}`}>
          {/* Logo */}
          {config.logo.src.includes('vw.webp') ? (
            <SmokeLogo
              src={config.logo.src}
              alt={config.logo.alt}
              widthClasses={config.logo.widthClasses}
            />
          ) : config.logo.src.includes('lab.webm') ? (
            <div className={`mx-auto md:mb-2 ${config.logo.widthClasses} select-none relative flex flex-col items-center`}>
              {/* Video logo */}
              <video
                src={config.logo.src}
                className="w-full h-auto animate-glitch-main"
                autoPlay
                muted
                playsInline
                draggable={false}
              />
              {/* Blue glitch layer */}
              <video
                src={config.logo.src}
                className="w-full h-auto absolute top-0 left-0 animate-glitch-blue"
                autoPlay
                muted
                playsInline
                draggable={false}
              />
              {/* Green glitch layer */}
              <video
                src={config.logo.src}
                className="w-full h-auto absolute top-0 left-0 animate-glitch-green"
                autoPlay
                muted
                playsInline
                draggable={false}
              />
            </div>
          ) : config.logo.src.includes('lab.webp') ? (
            <div className={`mx-auto md:mb-2 ${config.logo.widthClasses} select-none relative`}>
              {/* Main logo */}
              <Image
                src={config.logo.src}
                alt={config.logo.alt}
                className="w-full h-auto animate-glitch-main"
                width={1920}
                height={1080}
                draggable={false}
              />
              {/* Blue glitch layer */}
              <Image
                src={config.logo.src}
                alt=""
                className="w-full h-auto absolute top-0 left-0 animate-glitch-blue"
                width={1920}
                height={1080}
                draggable={false}
              />
              {/* Green glitch layer */}
              <Image
                src={config.logo.src}
                alt=""
                className="w-full h-auto absolute top-0 left-0 animate-glitch-green"
                width={1920}
                height={1080}
                draggable={false}
              />
            </div>
          ) : (
            <Image
              src={config.logo.src}
              alt={config.logo.alt}
              className={`mx-auto h-auto mb-2 ${config.logo.widthClasses} select-none animate-slide-up-gentle`}
              width={1920}
              height={1080}
              draggable={false}
            />
          )}

          {/* Subtitle for lab.webm - positioned absolutely */}
          {config.subtitle && config.logo.src.includes('lab.webm') && (
            <h3
              className="my-0 py-0 leading-none lg:mt-6 font-bold text-[#B9B9B9] md:text-lg text-center filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap absolute left-1/2 -translate-x-1/2 z-20 top-[calc(50%+8rem)] md:top-[calc(50%+10rem)]"
            >
              {config.subtitle}
            </h3>
          )}

          {/* Text */}
          {(config.title || config.subtitle) && !config.logo.src.includes('lab.webm') && (
            config.title ? (
              <div className={`${config.logo.src.includes('lab.webp') ? 'space-y-0' : 'space-y-4 md:space-y-6'} text-center ${config.logo.src.includes('lab.webp') ? 'h-8 md:h-10' : ''} ${config.logo.src.includes('lab.webp') ? 'mb-2 md:mb-2' : 'mb-8 md:mb-12'}`} style={{ contain: 'layout' }}>
                <div className="relative inline-block animate-slide-up-gentle opacity-0 transform-gpu" style={{ animationDelay: "0.2s" }}>
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
                  <h3
                    className={`font-bold text-[#B9B9B9] md:text-lg text-center filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap
                      ${config.logo.src.includes('lab.webp') ? 'absolute top-0 left-1/2 transform -translate-x-1/2' : ''}
                      ${config.logo.src.includes('lab.webm') ? 'mt-0 mb-0 pt-0 pb-0 leading-none' : ''}
                    `}
                    style={config.logo.src.includes('lab.webm') ? { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, lineHeight: 1 } : {}}
                  >
                    {config.subtitle}
                  </h3>
                )}
              </div>
            ) : (
              config.subtitle && (
                <h3
                  className={`font-bold text-[#B9B9B9] md:text-lg text-center filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap
                    ${config.logo.src.includes('lab.webp') ? 'absolute top-0 left-1/2 transform -translate-x-1/2' : ''}
                    ${config.logo.src.includes('lab.webm') ? 'mt-0 mb-0 pt-0 pb-0 leading-none' : ''}
                  `}
                  style={config.logo.src.includes('lab.webm') ? { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, lineHeight: 1 } : {}}
                >
                  {config.subtitle}
                </h3>
              )
            )
          )}
        </div>

        {/* Button - positioned separately to avoid layout shifts */}
        {config.layout.showButton !== false && (
          <div className={`absolute inset-x-0 transform-gpu z-20 flex items-center hue-rotate-[200deg] justify-center ${config.layout.buttonPosition}`} style={{ top: config.layout.buttonTop }}>
            <a
              href="https://store.steampowered.com/app/2184350/Guild_Saga_Vanished_Worlds/"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-2 font-oldFenris bg-black hover:bg-[#18160d] opacity-80 hover:opacity-100 cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)] ${config.layout.buttonSize}`}
              style={{
                border: "10px solid transparent",
                borderImage: 'url("/webp/temp-btn.webp") 20 round',
              }}
            >
              BUY NOW
            </a>
          </div>
        )}

        <div className={`absolute inset-x-0 bottom-0 ${config.layout.partnerMargin} flex items-center justify-center opacity-50`}>
          {/* Partner logos */}
          {config.partners.showSteam !== false && (
            <div>
              <Steam className="h-18 w-auto hidden lg:block" />
              <SteamMobile className="h-14 w-auto lg:hidden" />
            </div>
          )}
          {config.logo.src.includes('lab.webm') ? (
            <>
              {config.partners.showSolana && (
                <div>
                  <Solana className="h-20 w-auto hidden lg:block" />
                  <SolanaMobile className="h-14 w-auto lg:hidden" />
                </div>
              )}
              <div>
                <Ocelot className="h-20 w-auto mb-4 hidden lg:block" />
                <OcelotMobile className="h-14 w-auto mb-4 lg:hidden" />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Character illustration - moved to bottom of hero */}
      <div className={`absolute bottom-0 z-50 2xl:block hidden select-none animate-slide-in-transform pointer-events-none ${config.layout.showTrailer === false ? '-right-6 3xl:-right-2' : '-right-12'} ${config.layout.showTrailer === false ? '' : 'opacity-30 3xl:opacity-100'}`}>
        <Image
          src={config.characterIllustration.src}
          alt={config.characterIllustration.alt}
          width={1506}
          height={2000}
          className={`object-contain ${config.layout.characterSize || `w-[500px] ${config.layout.showTrailer === false ? '4xl:w-[600px]' : '4xl:w-[700px]'}`}`}
          draggable={false}
        />
      </div>

      {/* Divider - positioned based on trailer visibility */}
      {config.layout.showTrailer === false ? (
        <div className="relative z-40">
          <Divider />
        </div>
      ) : null}

      {/* Trailer section with elliptical mask - conditional */}
      {config.layout.showTrailer !== false && (
        <>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#232325] to-transparent" />

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
                    {config.logo.src.includes('vw.webp') ? (
                      // Smoke effect version for vw page
                      <h3
                        className="smoke text-4xl md:text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-4 tracking-[0.02em]"
                        id="fantasy-tactics-smoke"
                      >
                        <div>
                          <span>F</span><span>A</span><span>N</span><span>T</span><span>A</span><span>S</span><span>Y</span><span>&nbsp;</span><span>T</span><span>A</span><span>C</span><span>T</span><span>I</span><span>C</span><span>S</span>
                        </div>
                      </h3>
                    ) : (
                      // Static version for all other pages
                      <h3
                        className="bg-clip-text text-transparent text-4xl md:text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-4 tracking-[0.04em] whitespace-nowrap"
                        style={{ backgroundImage: "linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)" }}
                      >
                        FANTASY TACTICS
                      </h3>
                    )}
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

          {/* Divider - for pages with trailer */}
          <div className="relative z-40">
            <Divider />
          </div>
        </>
      )}

      {children}
    </div>
  )
}

export default Hero
