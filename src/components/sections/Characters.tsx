"use client"

import { useState } from "react"
import React from "react"
import Image from "next/image"
import { Container } from "../ui/container"
import SvgComponent from "../ui/corner"
import { Droplet, Anchor, Mountain, Leaf, Shield, Crown, LucideIcon } from "lucide-react"

interface Character {
  id: number
  name: string
  title: string
  backstory: string
  class: string
  race: string
  skills: string[]
  languages: string[]
  background: string
  image: string
  backgroundImage: string
  thumbnail: string
  classIcon: LucideIcon
  raceIcon: LucideIcon
}

const characters: Character[] = [
  {
    id: 1,
    name: "LEORA",
    title: "Mystic Wanderer",
    backstory:
      "Once a feared pirate sailing treacherous seas, Leora mastered hydromancy to control tides and storms alike. Her prowess in battle and sea magic made her infamous and formidable.",
    class: "Hydromancer",
    race: "Unknown",
    skills: ["Meteor Strike", "Summon Gem Golem"],
    languages: ["Common", "Aquan"],
    background: "Pirate Captain",
    image: "/webp/leora.webp",
    backgroundImage: "/webp/bg-vanished.webp",
    thumbnail: "/webp/leora-thumb.webp",
    classIcon: Droplet,
    raceIcon: Anchor,
  },
  {
    id: 2,
    name: "ASKA",
    title: "Stone Sage",
    backstory:
      "A devoted geomancer, Aska commands the earth itself, shaping terrain and summoning protective stone golems to guard allies and crush foes.",
    class: "Geomancer",
    race: "Elf",
    skills: ["Duel", "Forceful Shot"],
    languages: ["Common", "Elvish"],
    background: "Hermit",
    image: "/webp/aska.webp",
    backgroundImage: "/webp/bg-guild.webp",
    thumbnail: "/webp/aska-thumb.webp",
    classIcon: Mountain,
    raceIcon: Leaf,
  },
  {
    id: 3,
    name: "LUCEIT",
    title: "Radiant Champion",
    backstory:
      "Clad in radiant armor, Luceit is the epitome of chivalry and valor, leading the charge on the battlefield and inspiring allies with unmatched bravery and resilience.",
    class: "Knight",
    race: "Human",
    skills: ["Vampirism", "Consistent", "Scavenger"],
    languages: ["Common"],
    background: "Noble",
    image: "/webp/luceit.webp",
    backgroundImage: "/webp/bg-golem.webp",
    thumbnail: "/webp/luceit-thumb.webp",
    classIcon: Shield,
    raceIcon: Crown,
  },
]

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState(0)

  return (
    <div className="relative w-full overflow-hidden pt-14 pb-40">
      {/* Background Accent Image (behind character) */}
      <Container className="relative flex flex-col items-center justify-center min-h-[700px]">
        <div className="relative w-full flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0">
          {/* Left: Character Info */}
          <div className="flex-1 max-w-lg pt-8 lg:pt-24 flex flex-col justify-between h-auto lg:h-[650px] relative z-20 w-full">
            <div>
              <p className="text-[#fbcea0] text-xs md:text-sm font-medium tracking-widest mb-4 font-oldFenris drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] uppercase">
                {characters[selectedCharacter].title}
              </p>
              <h1 className="text-4xl md:text-6xl font-medium mb-4 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-oldFenris text-transparent bg-clip-text text-pretty" style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}>
                {characters[selectedCharacter].name}
              </h1>
              <div className="w-32 md:w-56 h-px bg-gradient-to-r from-[#fbcea0] to-transparent mb-6" />
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                {characters[selectedCharacter].backstory}
              </p>
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
                      {characters[selectedCharacter].classIcon && (
                        React.createElement(characters[selectedCharacter].classIcon, { size: 32, color: "#fbcea0", strokeWidth: 1 })
                      )}
                    </div>
                    <div>
                      <p className="text-[#fbcea0] text-xs uppercase tracking-wider font-oldFenris">Class:</p>
                      <p className="text-white font-medium">{characters[selectedCharacter].class}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#fbcea0] text-xs uppercase tracking-wider mb-1 font-oldFenris">Skill Proficiencies:</p>
                    <p className="text-gray-300 text-sm">{characters[selectedCharacter].skills.join(", ")}</p>
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {characters[selectedCharacter].raceIcon && (
                        React.createElement(characters[selectedCharacter].raceIcon, { size: 32, color: "#fbcea0", strokeWidth: 1 })
                      )}
                    </div>
                    <div>
                      <p className="text-[#fbcea0] text-xs uppercase tracking-wider font-oldFenris">Race:</p>
                      <p className="text-white font-medium">{characters[selectedCharacter].race}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#fbcea0] text-xs uppercase tracking-wider mb-1 font-oldFenris">Languages:</p>
                    <p className="text-gray-300 text-sm">{characters[selectedCharacter].languages.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-[#fbcea0] text-xs uppercase tracking-wider mb-1 font-oldFenris">Background:</p>
                    <p className="text-gray-300 text-sm">{characters[selectedCharacter].background}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Center: Main Character Image with Background Accent */}
          <div className="flex-1 flex justify-center items-start relative w-full mb-8 lg:mb-0">
            {/* Background Accent Image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[900px] lg:h-[900px] z-0 pointer-events-none select-none">
              <Image
                src={characters[selectedCharacter].backgroundImage}
                alt="Background Accent"
                fill
                className="object-contain opacity-80"
                priority
                draggable={false}
              />
            </div>
            {/* Main Character Image (larger, focal) */}
            <div className="relative w-[220px] h-[300px] md:w-[350px] md:h-[450px] lg:w-[520px] lg:h-[650px] z-10 drop-shadow-2xl">
              <Image
                src={characters[selectedCharacter].image}
                alt={characters[selectedCharacter].name}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </div>
          {/* Right: Thumbnails */}
          <div className="w-full lg:w-32 flex flex-row lg:flex-col items-center gap-4 pt-8 lg:pt-12 overflow-x-auto lg:overflow-x-visible">
            {characters.map((character, index) => (
              <button
                key={character.id}
                onClick={() => setSelectedCharacter(index)}
                className={`
                  group cursor-pointer relative overflow-hidden w-24 h-32 md:w-28 md:h-36 lg:w-32 lg:h-40 gradient-border-top transition-all duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                  ${selectedCharacter === index ? "shadow-none" : ""}
                `}
                style={{
                  borderStyle: "solid",
                  borderWidth: "0 1px 1px 1px",
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
                      src={character.thumbnail} 
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
