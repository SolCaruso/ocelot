"use client"

import { useState, useEffect } from "react"
import React from "react"
import Image from "next/image"
import { Container } from "../ui/container"
import SvgComponent from "../ui/corner"
import { Droplet, Anchor, Mountain, Leaf, Shield, Crown, type LucideIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Character } from '@/types/character'

const iconMap: Record<string, LucideIcon> = {
  Droplet,
  Anchor,
  Mountain,
  Leaf,
  Shield,
  Crown,
};

interface CharactersProps {
  characters: Character[]
}

export default function Characters({ characters }: CharactersProps) {
  const [selectedCharacter, setSelectedCharacter] = useState(0)
  const [previousCharacter, setPreviousCharacter] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCharacterChange = (newIndex: number) => {
    if (newIndex === selectedCharacter) return
    setPreviousCharacter(selectedCharacter)
    setSelectedCharacter(newIndex)
  }

  const animationDirection = selectedCharacter > previousCharacter ? 'forward' : 'backward'

  const getAnimationVariants = () => {
    if (!mounted) {
      // SSR fallback: no animation
      return {
        initial: { opacity: 1, x: 0, y: 0 },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 1, x: 0, y: 0 }
      }
    }
    const isLargeScreen = window.innerWidth >= 1024
    if (isLargeScreen) {
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
        exit
      }
    } else {
      return {
        initial: animationDirection === 'forward'
          ? { opacity: 0, x: 30 }
          : { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        exit: animationDirection === 'forward'
          ? { opacity: 0, x: 30 }
          : { opacity: 0, x: -30 }
      }
    }
  }

  const variants = getAnimationVariants()

  return (
    <div className="relative w-full overflow-hidden lg:pt-14 pb-40 px-8">
      {/* Background Accent Image (behind character) */}
      <Container className="relative flex flex-col items-center justify-center min-h-[700px]">
        <div className="relative w-full flex flex-col lg:flex-row items-start justify-between gap-0">
          {/* Left: Character Info */}
          <div className="flex-1 max-w-md pt-8 lg:pt-24 flex flex-col justify-between h-auto lg:h-auto relative z-20 w-full">
            <div>
              <p className="text-[#fbcea0] text-xs md:text-sm font-medium tracking-widest mb-4 font-oldFenris drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] uppercase">
                {characters[selectedCharacter].title}
              </p>
              <h1 className="text-4xl md:text-6xl font-medium mb-4 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-oldFenris text-transparent bg-clip-text text-pretty" style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}>
                {characters[selectedCharacter].name}
              </h1>
              <div className="w-32 md:w-56 h-px bg-gradient-to-r from-[#fbcea0] to-transparent mb-6" />
              <div className="mt-4 overflow-hidden">
                <p className="text-stone-50 md:text-xl font-quattrocento filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
                  {characters[selectedCharacter].backstory}
                </p>
              </div>
            </div>
            {/* Character Stats */}
            <div className="backdrop-blur-sm border border-[#fbcea0]/30 rounded-lg p-4 md:p-6 mt-8 relative hidden xl:block">
              {/* Top Left Corner */}
              <div className="absolute top-0 left-0 z-10 scale-x-[-1]">
                <SvgComponent className="w-16 h-16" />
              </div>
              {/* Top Right Corner */}
              <div className="absolute top-0 right-0 z-10">
                <SvgComponent className="w-16 h-16" />
              </div>
              {/* Bottom Left Corner */}
              <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1]">
                <SvgComponent className="w-16 h-16" />
              </div>
              {/* Bottom Right Corner */}
              <div className="absolute bottom-0 right-0 z-10 scale-y-[-1]">
                <SvgComponent className="w-16 h-16" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {iconMap[characters[selectedCharacter].classIcon as string] && (
                        React.createElement(iconMap[characters[selectedCharacter].classIcon as string], { size: 32, color: "#fbcea0", strokeWidth: 1 })
                      )}
                    </div>
                    <div>
                      <p className="text-[#fbcea0] text-xs uppercase tracking-wider font-oldFenris">Class:</p>
                      <p className="text-stone-50 text-lg font-quattrocento text-pretty">{characters[selectedCharacter].class}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#fbcea0] text-xs uppercase tracking-wider mb-1 font-oldFenris">Skill Proficiencies:</p>
                    <p className="text-stone-50 text-sm font-quattrocento text-pretty">{characters[selectedCharacter].skills.join(", ")}</p>
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {iconMap[characters[selectedCharacter].raceIcon as string] && (
                        React.createElement(iconMap[characters[selectedCharacter].raceIcon as string], { size: 32, color: "#fbcea0", strokeWidth: 1 })
                      )}
                    </div>
                    <div>
                      <p className="text-[#fbcea0] text-xs uppercase tracking-wider font-oldFenris">Race:</p>
                      <p className="text-stone-50 text-lg font-quattrocento text-pretty">{characters[selectedCharacter].race}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#fbcea0] text-xs uppercase tracking-wider mb-1 font-oldFenris">Languages:</p>
                    <p className="text-stone-50 text-sm font-quattrocento text-pretty">{characters[selectedCharacter].languages.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-[#fbcea0] text-xs uppercase tracking-wider mb-1 font-oldFenris">Background:</p>
                    <p className="text-stone-50 text-sm font-quattrocento text-pretty">{characters[selectedCharacter].background}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Center: Main Character Image with Background Accent */}
          <div className="flex-1 flex justify-center items-start relative w-full mb-8 lg:mb-0">
            {/* Background Accent Image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] z-0 pointer-events-none select-none">
              <Image
                src={characters[selectedCharacter].backgroundImage || "/placeholder.svg"}
                alt="Background Accent"
                fill
                className="object-contain opacity-80"
                priority
                draggable={false}
              />
            </div>
            {/* Main Character Image (larger, focal) with AnimatePresence */}
            <div className="relative w-[350px] h-[450px] md:w-[520px] md:h-[650px] z-10 drop-shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${characters[selectedCharacter].id}-${previousCharacter}-${selectedCharacter}`}
                  initial={variants.initial}
                  animate={variants.animate}
                  exit={variants.exit}
                  transition={{ 
                    duration: 0.2, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={characters[selectedCharacter].image || "/placeholder.svg"}
                    alt={characters[selectedCharacter].name}
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {/* Right: Thumbnails */}
          <div className="w-full lg:w-32 flex flex-row lg:flex-col items-center gap-4 lg:pt-12 overflow-x-auto lg:overflow-x-visible">
            {characters.map((character, index) => (
              <button
                key={character.id}
                onClick={() => handleCharacterChange(index)}
                className={`
                  group cursor-pointer relative overflow-hidden w-24 h-32 md:w-28 md:h-36 lg:w-32 lg:h-40 transition-all duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                  ${selectedCharacter === index ? "shadow-none" : "gradient-border-top"}
                `}
                style={{
                  borderStyle: "solid",
                  borderWidth: selectedCharacter === index ? "1px" : "0 1px 1px 1px",
                  borderImage: selectedCharacter === index 
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
                  <div className={`w-full h-full transition-all duration-200 ease-[var(--ease-in-out-quad)] ${
                    selectedCharacter === index ? "scale-105" : "group-hover:scale-105"
                  }`}>
                    <Image 
                      src={character.thumbnail || "/placeholder.svg"} 
                      alt={character.name} 
                      fill 
                      className="object-cover w-full h-full select-none scale-[1.75]" 
                    />
                    <div className={`absolute inset-0 transition-colors duration-200 ease-[var(--ease-in-out-quad)] ${
                      selectedCharacter === index 
                        ? "bg-gradient-to-t from-black/30 to-black/0" 
                        : "bg-gradient-to-t from-black/70 to-black/10 group-hover:from-black/30 group-hover:to-black/0"
                    }`} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}