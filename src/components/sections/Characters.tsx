"use client"

import { useState, useEffect } from "react"
import React from "react"
import Image from "next/image"
import { Container } from "../ui/container"
import SvgComponent from "../ui/corner"
import { Droplet, Anchor, Mountain, Leaf, Shield, Crown, Sword, Clock, Skull, Zap, Coins, Moon, Sparkles, Flower2, Circle, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"
import type { Character } from "@/types/character"
import useEmblaCarousel from "embla-carousel-react"

const iconMap: Record<string, LucideIcon> = {
  Droplet,
  Anchor,
  Mountain,
  Leaf,
  Shield,
  Crown,
  Sword,
  Clock,
  Skull,
  Zap,
  Coins,    
  Moon,     
  Sparkles,  
  Flower2,   
  Circle,   
};

interface CharactersProps {
  characters: Character[]
  backgroundClasses?: string
}

export default function Characters({ characters, backgroundClasses }: CharactersProps) {
  // Duplicate characters to 9 for layout/testing
  const filledCharacters = React.useMemo(() => {
    if (characters.length >= 9) return characters
    const result = [...characters]
    while (result.length < 9) {
      result.push(characters[result.length % characters.length])
    }
    return result
  }, [characters])

  const [selectedCharacter, setSelectedCharacter] = useState(0)
  const [previousCharacter, setPreviousCharacter] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [expandedBackstory, setExpandedBackstory] = useState<number | null>(null);

  useEffect(() => {
    setExpandedBackstory(null);
  }, [selectedCharacter]);

  // Desktop vertical carousel
  const [desktopEmblaRef, desktopEmblaApi] = useEmblaCarousel({
    axis: "y",
    align: "center",
    loop: true,
    containScroll: "trimSnaps",
    dragFree: false,
  })

  // Mobile horizontal carousel with infinite loop
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({
    axis: "x",
    align: "center",
    loop: true,
    containScroll: "trimSnaps",
    dragFree: false,
    slidesToScroll: 1,
  })

  useEffect(() => {
    setMounted(true)
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkIsDesktop()
    window.addEventListener("resize", checkIsDesktop)
    return () => window.removeEventListener("resize", checkIsDesktop)
  }, [])

  // Handle desktop carousel
  useEffect(() => {
    if (!desktopEmblaApi || !isDesktop) return

    const onSelect = () => {
      // Only update on click, not on scroll
    }

    desktopEmblaApi.on("select", onSelect)
    return () => {
      desktopEmblaApi.off("select", onSelect)
    }
  }, [desktopEmblaApi, isDesktop])

  // Handle mobile carousel
  useEffect(() => {
    if (!mobileEmblaApi || isDesktop) return

    const onSelect = () => {
      // Only update on click, not on scroll
    }

    mobileEmblaApi.on("select", onSelect)
    return () => {
      mobileEmblaApi.off("select", onSelect)
    }
  }, [mobileEmblaApi, isDesktop])

  const handleCharacterChange = (index: number) => {
    if (index === selectedCharacter) return

    setPreviousCharacter(selectedCharacter)
    setSelectedCharacter(index)

    // Scroll appropriate carousel to match
    if (isDesktop && desktopEmblaApi) {
      desktopEmblaApi.scrollTo(index)
    } else if (!isDesktop && mobileEmblaApi) {
      mobileEmblaApi.scrollTo(index)
    }
  }

  const animationDirection = selectedCharacter > previousCharacter ? "forward" : "backward"

  const getAnimationVariants = () => {
    if (!mounted) {
      return {
        initial: { opacity: 1, x: 0, y: 0 },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 1, x: 0, y: 0 },
      }
    }

    if (isDesktop) {
      let initial, exit
      if (selectedCharacter === 0) {
        initial = { opacity: 0, y: -30 }
      } else if (selectedCharacter === 2) {
        initial = { opacity: 0, y: 30 }
      } else {
        if (previousCharacter === 0) {
          initial = { opacity: 0, y: 30 }
        } else {
          initial = { opacity: 0, y: -30 }
        }
      }

      if (previousCharacter === 0) {
        exit = { opacity: 0, y: -30 }
      } else if (previousCharacter === 2) {
        exit = { opacity: 0, y: 30 }
      } else {
        if (selectedCharacter === 0) {
          exit = { opacity: 0, y: 30 }
        } else {
          exit = { opacity: 0, y: -30 }
        }
      }

      return {
        initial,
        animate: { opacity: 1, y: 0 },
        exit,
      }
    } else {
      return {
        initial: animationDirection === "forward" ? { opacity: 0, x: 30 } : { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        exit: animationDirection === "forward" ? { opacity: 0, x: 30 } : { opacity: 0, x: -30 },
      }
    }
  }

  const variants = getAnimationVariants()
  const currentCharacter = filledCharacters[selectedCharacter]
  if (!mounted) return null;
  if (!currentCharacter) return null

  const maxBackstoryLength = 300;

  return (
    <div className="relative w-full overflow-hidden pb-24 pt-18 lg:py-42 px-8">
      <Container className="relative flex flex-col items-center justify-center min-h-[700px]">
        <div className="relative w-full flex flex-col lg:flex-row items-start justify-between gap-0">
          {/* Left: Character Info */}
          <div className="flex-1 max-w-md pt-8 lg:pt-24 flex flex-col justify-between h-auto lg:h-auto relative z-20 w-full">
            <div className={`${backgroundClasses}`}>
              <p className="text-[#fbcea0] text-xs md:text-sm font-medium tracking-widest mb-4 font-oldFenris drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] uppercase">
                {currentCharacter.title}
              </p>
              <h1
                className="text-4xl md:text-6xl font-medium mb-4 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-oldFenris text-transparent bg-clip-text text-pretty"
                style={{ backgroundImage: "linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)" }}
              >
                {currentCharacter.name}
              </h1>
              <div className="w-32 md:w-56 h-px bg-gradient-to-r from-[#fbcea0] to-transparent mb-6" />
              <div className="mt-4 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={expandedBackstory === selectedCharacter ? 'expanded' : 'collapsed'}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="text-stone-50 md:text-xl font-quattrocento filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
                      {currentCharacter.backstory.length > maxBackstoryLength && currentCharacter.name === "THEVYRE, M.T." ? (
                        expandedBackstory === selectedCharacter ? (
                          <>
                            {currentCharacter.backstory}
                            <button className="text-[#fbcea0] underline ml-1" onClick={() => setExpandedBackstory(null)}>
                              less
                            </button>
                          </>
                        ) : (
                          <>
                            {currentCharacter.backstory.slice(0, maxBackstoryLength)}... 
                            <button className="text-[#fbcea0] underline ml-1" onClick={() => setExpandedBackstory(selectedCharacter)}>
                              more
                            </button>
                          </>
                        )
                      ) : (
                        currentCharacter.backstory
                      )}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Character Stats */}
            <div className="backdrop-blur-sm border border-[#fbcea0]/30 rounded-lg p-4 md:p-6 mt-8 relative hidden xl:block">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 z-10 scale-x-[-1]">
                <SvgComponent className="w-16 h-16" />
              </div>
              <div className="absolute top-0 right-0 z-10">
                <SvgComponent className="w-16 h-16" />
              </div>
              <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1]">
                <SvgComponent className="w-16 h-16" />
              </div>
              <div className="absolute bottom-0 right-0 z-10 scale-y-[-1]">
                <SvgComponent className="w-16 h-16" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {iconMap[currentCharacter.classIcon as string] &&
                        React.createElement(iconMap[currentCharacter.classIcon as string], {
                          size: 32,
                          color: "#fbcea0",
                          strokeWidth: 1,
                        })}
                    </div>
                    <div>
                      <p className="text-[#fbcea0] text-xs uppercase tracking-wider font-oldFenris">Class:</p>
                      <p className="text-stone-50 text-lg font-quattrocento text-pretty">{currentCharacter.class}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#fbcea0] text-xs uppercase tracking-wider mb-1 font-oldFenris">
                      Skill Proficiencies:
                    </p>
                    <p className="text-stone-50 text-sm font-quattrocento text-pretty">
                      {currentCharacter.skills.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {iconMap[currentCharacter.raceIcon as string] &&
                        React.createElement(iconMap[currentCharacter.raceIcon as string], {
                          size: 32,
                          color: "#fbcea0",
                          strokeWidth: 1,
                        })}
                    </div>
                    <div>
                      <p className="text-[#fbcea0] text-xs uppercase tracking-wider font-oldFenris">Race:</p>
                      <p className="text-stone-50 text-lg font-quattrocento text-pretty">{currentCharacter.race}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#fbcea0] text-xs uppercase tracking-wider mb-1 font-oldFenris">Languages:</p>
                    <p className="text-stone-50 text-sm font-quattrocento text-pretty">
                      {currentCharacter.languages.join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#fbcea0] text-xs uppercase tracking-wider mb-1 font-oldFenris">Background:</p>
                    <p className="text-stone-50 text-sm font-quattrocento text-pretty">{currentCharacter.background}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Main Character Image with Background Accent */}
          <div className="flex-1 flex justify-center items-start relative w-full mb-8 lg:mb-0">
            {/* Background Accent Image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] z-0 pointer-events-none select-none" style={{ userSelect: 'none' }}>
              <Image
                src={currentCharacter.backgroundImage || "/placeholder.svg"}
                alt="Background Accent"
                fill
                className="object-contain opacity-80 select-none"
                priority
                draggable={false}
                sizes="(max-width: 768px) 600px, 900px"
                style={{ userSelect: 'none' }}
              />
            </div>

            {/* Main Character Image */}
            <div className="relative w-[350px] h-[450px] md:w-[520px] md:h-[650px] z-10 drop-shadow-2xl select-none" style={{ userSelect: 'none' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentCharacter.id}-${previousCharacter}-${selectedCharacter}`}
                  initial={variants.initial}
                  animate={variants.animate}
                  exit={variants.exit}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute inset-0 select-none"
                  style={{ userSelect: 'none' }}
                >
                  <Image
                    src={currentCharacter.image || "/placeholder.svg"}
                    alt={currentCharacter.name}
                    fill
                    className="object-contain rounded-lg select-none"
                    priority
                    draggable={false}
                    sizes="(max-width: 768px) 350px, 520px"
                    style={{ userSelect: 'none' }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Thumbnails */}
          <div className="w-full lg:w-32 flex flex-row lg:flex-col items-center gap-4">
            {/* Desktop: Vertical Embla Carousel (md and above) */}
            {isDesktop && (
              <div className="w-full max-w-xs">
                <div
                  className="relative w-full h-[712px] overflow-hidden"
                  style={{
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                  }}
                >
                  <div ref={desktopEmblaRef} className="overflow-hidden h-full">
                    <div className="flex flex-col h-full">
                      {filledCharacters.map((character, index) => {
                        const isSelected = selectedCharacter === index

                        return (
                          <div key={`desktop-${character.id}-${index}`} className="flex-none h-[160px] mb-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCharacterChange(index)
                              }}
                              className={
                                `group cursor-pointer relative overflow-hidden w-full h-full transition-all duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]` +
                                (isSelected ? " shadow-none" : " gradient-border-top")
                              }
                              style={{
                                borderStyle: "solid",
                                borderWidth: isSelected ? "1px" : "0 1px 1px 1px",
                                borderImage: isSelected
                                  ? "linear-gradient(to top, #fbcea0, #fbcfa0) 1"
                                  : "linear-gradient(to top, #534C3F, #B4906C) 1",
                              }}
                            >
                              {/* Bottom Left Corner */}
                              <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1]">
                                <SvgComponent className="w-12 h-12 md:w-16 md:h-16" />
                              </div>
                              {/* Bottom Right Corner */}
                              <div className="absolute bottom-0 right-0 z-10 scale-y-[-1]">
                                <SvgComponent className="w-12 h-12 md:w-16 md:h-16" />
                              </div>
                              <div
                                className="relative w-full h-full bg-black overflow-hidden"
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
                                  className={`w-full h-full transition-all duration-200 ease-[var(--ease-in-out-quad)] ${isSelected ? "scale-105" : "group-hover:scale-105"}`}
                                >
                                  <Image
                                    src={character.thumbnail || "/placeholder.svg"}
                                    alt={character.name}
                                    fill
                                    className="object-cover w-full h-full select-none scale-[1.75]"
                                    draggable={false}
                                    sizes="160px"
                                    style={{ userSelect: 'none' }}
                                  />
                                  <div
                                    className={`absolute inset-0 transition-colors duration-200 ease-[var(--ease-in-out-quad)] ${isSelected ? "bg-gradient-to-t from-black/30 to-black/0" : "bg-gradient-to-t from-black/70 to-black/10 group-hover:from-black/30 group-hover:to-black/0"}`}
                                  />
                                </div>
                              </div>
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile: Horizontal Embla Carousel with Infinite Loop (under md) */}
            {!isDesktop && (
              <div className="w-full">
                <div
                  className="w-full"
                  style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                  }}
                >
                  <div ref={mobileEmblaRef} className="overflow-hidden">
                    <div className="flex gap-4 pt-4">
                      {filledCharacters.map((character, index) => {
                        const isSelected = selectedCharacter === index
                        const isFirst = index === 0;
                        const isLast = index === filledCharacters.length - 1;
                        return (
                          <div
                            key={`mobile-${character.id}-${index}`}
                            className={`flex-none w-28 h-36${isFirst ? ' pl-2' : ''}${isLast ? ' pr-2' : ''}`}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCharacterChange(index)
                              }}
                              className={
                                `group cursor-pointer relative overflow-hidden w-full h-full transition-all duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]` +
                                (isSelected ? " shadow-none" : " gradient-border-top")
                              }
                              style={{
                                borderStyle: "solid",
                                borderWidth: isSelected ? "1px" : "0 1px 1px 1px",
                                borderImage: isSelected
                                  ? "linear-gradient(to top, #fbcea0, #fbcfa0) 1"
                                  : "linear-gradient(to top, #534C3F, #B4906C) 1",
                              }}
                            >
                              {/* Bottom Left Corner */}
                              <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1]">
                                <SvgComponent className="w-12 h-12" />
                              </div>
                              {/* Bottom Right Corner */}
                              <div className="absolute bottom-0 right-0 z-10 scale-y-[-1]">
                                <SvgComponent className="w-12 h-12" />
                              </div>
                              <div
                                className="relative w-full h-full bg-black overflow-hidden"
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
                                  className={`w-full h-full transition-all duration-200 ease-[var(--ease-in-out-quad)] ${isSelected ? "scale-105" : "group-hover:scale-105"}`}
                                >
                                  <Image
                                    src={character.thumbnail || "/placeholder.svg"}
                                    alt={character.name}
                                    fill
                                    className="object-cover w-full h-full select-none scale-[1.75]"
                                    draggable={false}
                                    sizes="112px"
                                    style={{ userSelect: 'none' }}
                                  />
                                  <div
                                    className={`absolute inset-0 transition-colors duration-200 ease-[var(--ease-in-out-quad)] ${isSelected ? "bg-gradient-to-t from-black/30 to-black/0" : "bg-gradient-to-t from-black/70 to-black/10 group-hover:from-black/30 group-hover:to-black/0"}`}
                                  />
                                </div>
                              </div>
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
