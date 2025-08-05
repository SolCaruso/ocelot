import React from "react"
import clsx from "clsx"
import Steam from "@/components/logos/partners/Steam"
import Solana from "@/components/logos/partners/Solana"
import Ocelot from "@/components/logos/partners/Ocelot"
import SteamMobile from "@/components/logos/partners-mobile/Steam"
import SolanaMobile from "@/components/logos/partners-mobile/Solana"
import OcelotMobile from "@/components/logos/partners-mobile/Ocelot"
import Divider from "@/components/ui/divider"
import HeroClient from "./HeroClient"
import HeroVideo from "./HeroVideo"
import HeroVideoLab from "./HeroVideoLab"
import HeroCharacter from "./HeroCharacter"
import HeroCharacterLab from "./HeroCharacterLab"
import HeroLogoMain from "./HeroLogoMain"
import HeroLogoLab from "./HeroLogoLab"
import "./SmokeFX.css"
import leatherTextureAvif from '@/assets/avif/leather-texture.avif'
import leatherTextureWebp from '@/assets/webp/leather-texture.webp'
import smokeWebp from '@/assets/webp/smoke.webp'

interface HeroProps {
  /** Tailwind classes for responsive sizing, e.g. "h-40 md:h-56 lg:h-72" */
  className?: string
  /** Optional inline height fallback, e.g. "900px" */
  height?: string
  children?: React.ReactNode
  /** Hero configuration object */
  config: {
    videoSrc: string
    posterSrc?: string
    logo: {
      src?: string
      mobileSrc?: string
      alt?: string
      widthClasses: string
    }
    title: string
    subtitle: string
    characterIllustration?: {
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

const Hero: React.FC<HeroProps> = ({ className, height, children, config }) => {

  return (
    <div 
      className="w-full relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url("${smokeWebp.src}")`,
      }}
    >
      {/* Video Hero Section with circular mask */}
      <div
        className={clsx("w-full relative z-10 overflow-hidden max-w-8xl mx-auto", className)}
        style={height ? { height } : undefined}
      >
        <div className="[mask-image:radial-gradient(circle_at_center,_white_40%,_transparent_85%)] [mask-repeat:no-repeat] [mask-position:center] relative w-full h-full">
          {config.videoSrc.includes('lab-hero') ? (
            <HeroVideoLab 
              videoSrc={config.videoSrc}
              posterSrc={config.posterSrc}
            />
          ) : (
            <HeroVideo 
              videoSrc={config.videoSrc}
              posterSrc={config.posterSrc}
            />
          )}

          {/* Masks/Shaders */}
          <div className={`absolute inset-0 z-10 ${config.shadows.topGradient} pointer-events-none hidden md:block`} />
          <div className={`absolute inset-0 z-15 ${config.shadows.overlay} pointer-events-none`} />
          
          {/* Smoke mask overlay */}
          <div 
            className="absolute inset-0 z-5 pointer-events-none"
            style={{
              maskImage: "url('/avif/smoke-mask.avif'), url('/webp/smoke-mask.webp')",
              maskSize: "cover",
              maskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskImage: "url('/avif/smoke-mask.avif'), url('/webp/smoke-mask.webp')",
              WebkitMaskSize: "cover",
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
            }}
          />
        </div>

        <div className={`absolute inset-x-0 top-0 bottom-0 transform-gpu z-20 flex flex-col items-center justify-center md:justify-start text-center ${config.layout.logoPadding} ${config.videoSrc.includes('lab-hero') ? 'translate-y-8 md:translate-y-12' : ''}`}>
          {/* Logo */}
          {config.videoSrc.includes('lab-hero') ? (
            <HeroLogoLab widthClasses={config.logo.widthClasses} />
          ) : (
            <HeroLogoMain widthClasses={config.logo.widthClasses} />
          )}

          {/* Subtitle for lab page - positioned absolutely */}
          {config.subtitle && config.videoSrc.includes('lab-hero') && (
            <h3
              className="my-0 py-0 leading-none lg:mt-6 font-bold text-[#B9B9B9] md:text-lg text-center filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap absolute left-1/2 -translate-x-1/2 z-20 top-[calc(50%+8rem)] md:top-[calc(50%+10rem)]"
            >
              {config.subtitle}
            </h3>
          )}

          {/* Text */}
          {(config.title || config.subtitle) && !config.videoSrc.includes('lab-hero') && (
            config.title ? (
              <div className={`${config.videoSrc.includes('lab-hero') ? 'space-y-0' : 'space-y-4 md:space-y-6'} text-center ${config.videoSrc.includes('lab-hero') ? 'h-8 md:h-10' : ''} ${config.videoSrc.includes('lab-hero') ? 'mb-2 md:mb-2' : 'mb-8 md:mb-12'}`} style={{ contain: 'layout' }}>
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
                      ${config.videoSrc.includes('lab-hero') ? 'absolute top-0 left-1/2 transform -translate-x-1/2' : ''}
                      ${config.videoSrc.includes('lab-hero') ? 'mt-0 mb-0 pt-0 pb-0 leading-none' : ''}
                    `}
                    style={config.videoSrc.includes('lab-hero') ? { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, lineHeight: 1 } : {}}
                  >
                    {config.subtitle}
                  </h3>
                )}
              </div>
            ) : (
              config.subtitle && (
                <h3
                  className={`font-bold text-[#B9B9B9] md:text-lg text-center filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap
                    ${config.videoSrc.includes('lab-hero') ? 'absolute top-0 left-1/2 transform -translate-x-1/2' : ''}
                    ${config.videoSrc.includes('lab-hero') ? 'mt-0 mb-0 pt-0 pb-0 leading-none' : ''}
                  `}
                  style={config.videoSrc.includes('lab-hero') ? { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, lineHeight: 1 } : {}}
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
          {config.videoSrc.includes('lab-hero') ? (
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

      {/* Character illustration - server rendered with assets */}
      {config.videoSrc.includes('lab-hero') ? (
        <HeroCharacterLab 
          characterSize={config.layout.characterSize}
          showTrailer={config.layout.showTrailer}
        />
      ) : (
        <HeroCharacter 
          characterSize={config.layout.characterSize}
          showTrailer={config.layout.showTrailer}
        />
      )}

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
                  backgroundImage: `url("${leatherTextureAvif.src}"), url("${leatherTextureWebp.src}")`,
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

          {/* Client component for interactive elements */}
          <HeroClient />

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
