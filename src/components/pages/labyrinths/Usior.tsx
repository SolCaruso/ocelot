"use client";

import Image from "next/image";
import Frame from "@/components/ui/frame";
import { useState } from "react";

export default function Usor() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative w-full mt-30">
      {/* Background Video with Mask - Centered */}
      <div
        className="absolute inset-0 w-full h-[800px] z-0"
        style={{
          maskImage: "url('/webp/bg-golem.webp')",
          maskSize: "cover",
          maskPosition: "center",
          maskRepeat: "no-repeat",
          WebkitMaskImage: "url('/webp/bg-golem.webp')",
          WebkitMaskSize: "cover",
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/video/usior.webm" type="video/webm" />
          <source src="/video/usior.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mb-20 lg:mb-0 lg:h-[800px] w-full">
        {/* Full width container with max-w constraint */}
        <div className="max-w-7xl mx-auto h-full relative">
          
          {/* Usior Image - Absolute positioned on left (hidden on mobile) */}
          <div className="absolute left-0 -bottom-50 w-[900px] h-[1100px] -translate-x-48 translate-y-8 hidden lg:block">
            <Image 
              src="/webp/usior-char3.webp" 
              alt="Usor" 
              height={1000} 
              width={1415} 
              className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] transform -scale-x-100" 
            />
          </div>
          
          {/* Text Content - Responsive positioning */}
          <div className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-3/5 lg:pr-8 w-full px-8 lg:px-0">
            <div className="relative backdrop-blur-xl border-t border-b border-l border-r border-[#B4906C]/40 p-8 bg-black/20">
              {/* Frame borders - positioned on top of borders */}
              <div className="absolute left-1/2 top-0 z-10 pointer-events-none opacity-80" style={{ transform: 'translateX(-50%) translateY(-50%)' }}>
                <Frame className="md:scale-50 scale-40" />
              </div>
              <div className="absolute left-1/2 bottom-0 z-10 pointer-events-none opacity-80" style={{ transform: 'translateX(-50%) translateY(50%)' }}>
                <Frame className="md:scale-50 scale-40 rotate-180" />
              </div>
              <p className="text-[#fbcea0] text-xs md:text-sm font-medium tracking-widest mb-4 font-oldFenris drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] uppercase">
                Labyrinths
              </p>
              <h1
                className="text-4xl md:text-5xl font-medium mb-4 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-oldFenris text-transparent bg-clip-text text-pretty uppercase"
                style={{ backgroundImage: "linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)" }}
              >
               Uncover ancient treasures                   
              </h1>
              <div className="w-32 md:w-[200px] h-px bg-gradient-to-r from-[#fbcea0] to-transparent mb-6 mt-6" />
              
              {/* Description text with expand/collapse for mobile */}
              <div className="space-y-4">
                <p className="text-white text-shadow-sm font-medium text-lg md:text-xl font-quattrocento leading-relaxed filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                  Descend into the shadowed depths of Usior&apos;s forgotten archives in this reimagined tactical RPG. Each procedurally-generated chamber tests your strategic wit: vanquish foes, gather relics and decide—bank your loot as Solana SFTs or press onward into ever-greater peril.
                </p>
                
                {/* Expanded content - hidden on md+ screens, collapsible on smaller screens */}
                <div className={`md:block ${isExpanded ? 'block' : 'hidden'}`}>
                  <p className="text-white text-shadow-sm font-medium text-lg md:text-xl font-quattrocento leading-relaxed filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                    Recruit bronze-ranked adventurers or unleash your collected heroes, master turn-based combat and experience lightning-fast blockchain integration—where every risk carries the promise of reward.
                  </p>
                </div>
                
                {/* More/Less button - only show on screens under md */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#fbcea0] hover:text-white font-medium text-sm transition-colors duration-200 underline underline-offset-4"
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}