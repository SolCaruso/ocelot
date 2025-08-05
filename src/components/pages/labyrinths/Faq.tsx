"use client"

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Corner from "@/components/ui/corner";
import Frame from "@/components/ui/frame";
import Image from "next/image";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: "platforms",
    question: "WHAT PLATFORMS IS BALDUR'S GATE 3 AVAILABLE ON?",
    answer: "Baldur's Gate 3 is available on PC (Windows, Mac, Linux), PlayStation 5, and Xbox Series X/S. The game supports cross-platform save progression across supported platforms."
  },
  {
    id: "offline",
    question: "CAN I PLAY THE GAME OFFLINE?",
    answer: "Yes, you can play Baldur's Gate 3 completely offline. The game features a comprehensive single-player campaign that doesn't require an internet connection to play."
  },
  {
    id: "multiplayer",
    question: "IS THERE A MULTIPLAYER MODE?",
    answer: "Yes, Baldur's Gate 3 supports cooperative multiplayer for up to 4 players. You can play the entire campaign together with friends in online or local split-screen co-op."
  },
  {
    id: "single-player",
    question: "CAN I PLAY A SINGLE-PLAYER CAMPAIGN?",
    answer: "Absolutely! Baldur's Gate 3 features a rich single-player experience with over 100 hours of content, multiple storylines, and countless character interactions."
  },
  {
    id: "deluxe-edition",
    question: "WHAT DOES THE DIGITAL DELUXE EDITION INCLUDE?",
    answer: "The Digital Deluxe Edition includes the base game, digital soundtrack, art book, character sheets, and exclusive in-game content including cosmetic items and additional character customization options."
  },
  {
    id: "purchases",
    question: "ARE THERE ANY IN-GAME PURCHASES?",
    answer: "No, Baldur's Gate 3 does not feature any microtransactions or in-game purchases. Everything in the game is unlocked through gameplay progression and exploration."
  },
  {
    id: "multiplayer",
    question: "IS THERE A MULTIPLAYER MODE?",
    answer: "Yes, Baldur's Gate 3 supports cooperative multiplayer for up to 4 players. You can play the entire campaign together with friends in online or local split-screen co-op."
  },
  {
    id: "single-player",
    question: "CAN I PLAY A SINGLE-PLAYER CAMPAIGN?",
    answer: "Absolutely! Baldur's Gate 3 features a rich single-player experience with over 100 hours of content, multiple storylines, and countless character interactions."
  }
];

const Faq: React.FC = () => {
  const [openItemLeft, setOpenItemLeft] = React.useState<string>('');
  const [openItemRight, setOpenItemRight] = React.useState<string>('');

  const handleToggle = (itemId: string, side: 'left' | 'right') => {
    if (side === 'left') {
      setOpenItemLeft(prev => prev === itemId ? '' : itemId);
    } else {
      setOpenItemRight(prev => prev === itemId ? '' : itemId);
    }
  };

  return (
    <section className="relative mt-40">
      {/* Main FAQ Banner */}
      <div className="relative h-[400px] overflow-hidden">
        {/* Background Video with Smoke Mask */}
        <div
          className="absolute inset-0 w-full h-full"
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
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-140"
            style={{ 
              width: "100%",
              left: "20%",
              objectPosition: "right center"
            }}
          >
            <source src="/video/devil.webm" type="video/webm" />
          </video>
        </div>
        
        {/* Masked overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-black/30"
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
        />
        
        {/* FAQ Title */}
        <div className="absolute inset-0 flex items-center pl-4">
          <div className="space-y-2">
            <p className="text-[#fbcea0] text-xs md:text-sm font-medium tracking-widest mb-4 font-oldFenris drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] uppercase">
              Labyrinths
            </p>
            <h1 className="text-6xl font-oldFenris text-white tracking-wider mb-6">
              FAQ
            </h1>
            <div className="w-46 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, #8c6c52, transparent)" }}></div>
          </div>
        </div>
      </div>

              {/* FAQ Content */}
        <div className="max-w-7xl mx-auto px-4 -mt-20 pb-16">
          {/* FAQ Items in 2x4 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <Accordion type="single" collapsible value={openItemLeft} onValueChange={(value) => setOpenItemLeft(value || '')}>
            {faqData.slice(0, 4).map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className={`relative border-t border-b border-l border-r border-[#8c6c52] bg-black/40 backdrop-blur-sm hover:bg-white/5 transition-colors cursor-pointer group ${index < 3 ? 'mb-6' : ''} !border-b`}
                onClick={() => handleToggle(item.id, 'left')}
              >
                {/* Top Left Corner */}
                <div className="absolute top-0 left-0 z-10 scale-x-[-1]">
                  <Corner className="w-6 h-6 text-[#8c6c52]" />
                </div>
                {/* Top Right Corner */}
                <div className="absolute top-0 right-0 z-10">
                  <Corner className="w-6 h-6 text-[#8c6c52]" />
                </div>
                {/* Bottom Left Corner */}
                <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1]">
                  <Corner className="w-6 h-6 text-[#8c6c52]" />
                </div>
                {/* Bottom Right Corner */}
                <div className="absolute bottom-0 right-0 z-10 scale-y-[-1]">
                  <Corner className="w-6 h-6 text-[#8c6c52]" />
                </div>
                
                <AccordionTrigger className="px-6 py-5 flex items-center h-[100px] hover:no-underline [&>svg]:ml-auto [&>svg]:w-8 [&>svg]:h-8 [&>svg]:drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [&>svg]:text-[#D8BB9D] pointer-events-none">
                  <span className="font-semibold font-oldFenris text-lg uppercase tracking-wide pr-4 text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-sm"
                    style={{ backgroundImage: "linear-gradient(to right, #FFF4EA, #D8BB9D 50%, #FBCEA0 100%)" }}>
                    {item.question}
                  </span>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-5">
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion type="single" collapsible value={openItemRight} onValueChange={(value) => setOpenItemRight(value || '')}>
            {faqData.slice(4, 8).map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className={`relative border-t border-b border-l border-r border-[#8c6c52] bg-black/40 backdrop-blur-sm hover:bg-white/5 transition-colors cursor-pointer group ${index < 3 ? 'mb-6' : ''} !border-b`}
                onClick={() => handleToggle(item.id, 'right')}
              >
                {/* Top Left Corner */}
                <div className="absolute top-0 left-0 z-10 scale-x-[-1]">
                  <Corner className="w-6 h-6 text-[#8c6c52]" />
                </div>
                {/* Top Right Corner */}
                <div className="absolute top-0 right-0 z-10">
                  <Corner className="w-6 h-6 text-[#8c6c52]" />
                </div>
                {/* Bottom Left Corner */}
                <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1]">
                  <Corner className="w-6 h-6 text-[#8c6c52]" />
                </div>
                {/* Bottom Right Corner */}
                <div className="absolute bottom-0 right-0 z-10 scale-y-[-1]">
                  <Corner className="w-6 h-6 text-[#8c6c52]" />
                </div>
                
                <AccordionTrigger className="px-6 py-5 flex items-center h-[100px] hover:no-underline [&>svg]:ml-auto [&>svg]:w-8 [&>svg]:h-8 [&>svg]:drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [&>svg]:text-[#D8BB9D] pointer-events-none">
                  <span className="font-semibold font-oldFenris text-lg uppercase tracking-wide pr-4 text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-sm"
                    style={{ backgroundImage: "linear-gradient(to right, #FFF4EA, #D8BB9D 50%, #FBCEA0 100%)" }}>
                    {item.question}
                  </span>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-5">
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Support Section - Full Width */}
        <div className="relative">
          {/* Frame borders - positioned on top of borders */}
          <div className="absolute left-1/2 top-0 z-10 pointer-events-none opacity-80" style={{ transform: 'translateX(-50%) translateY(-50%)' }}>
            <Frame className="md:scale-50 scale-40" />
          </div>
          <div className="absolute left-1/2 bottom-0 z-10 pointer-events-none opacity-80" style={{ transform: 'translateX(-50%) translateY(50%)' }}>
            <Frame className="md:scale-50 scale-40 rotate-180" />
          </div>
          
          <div className="relative backdrop-blur-xl border-t border-b border-l border-r border-[#B4906C]/40 flex items-center min-h-[300px]">
            <div className="flex-1 p-8 relative z-10">
              <div className="space-y-4">
                <div>
                  <p className="text-[#fbcea0] text-xs md:text-sm font-medium tracking-widest mb-4 font-oldFenris drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] uppercase">
                    Labyrinths
                  </p>
                  <p className="text-4xl md:text-5xl font-medium mb-4 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-oldFenris text-transparent bg-clip-text text-pretty"
                style={{ backgroundImage: "linear-gradient(to right, #fff, #fbcea0 20%, #fbcfa0)" }}>
                    SUPPORT
                  </p>
                </div>

                {/* Read More Button */}
                <div className="flex justify-start pt-4">
                  <button className="group relative px-6 py-3 border border-[#8c6c52] bg-black/40 hover:bg-white/10 transition-colors">
                    {/* Top Left Corner */}
                    <div className="absolute top-0 left-0 z-10 scale-x-[-1]">
                      <Corner className="w-4 h-4 text-[#8c6c52]" />
                    </div>
                    {/* Top Right Corner */}
                    <div className="absolute top-0 right-0 z-10">
                      <Corner className="w-4 h-4 text-[#8c6c52]" />
                    </div>
                    {/* Bottom Left Corner */}
                    <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1]">
                      <Corner className="w-4 h-4 text-[#8c6c52]" />
                    </div>
                    {/* Bottom Right Corner */}
                    <div className="absolute bottom-0 right-0 z-10 scale-y-[-1]">
                      <Corner className="w-4 h-4 text-[#8c6c52]" />
                    </div>
                    
                    <span className="relative text-[#fbcea0] font-semibold uppercase tracking-wide text-sm">
                      READ MORE
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Support Image with Smoke Mask */}
            <div 
              className="absolute inset-0 z-0"
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
              <Image
                src="/webp/lab-screenshot7.webp"
                alt="Support"
                fill
                className="object-cover scale-140"
                style={{ 
                  width: "100%",
                  left: "20%",
                  objectPosition: "center center" 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;