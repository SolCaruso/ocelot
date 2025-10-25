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
import FaqVideo from "./FaqVideo";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: "strategic-combat",
    question: "STRATEGIC TURN-BASED COMBAT",
    answer: "Experience tactical thinking and careful positioning in strategic turn-based combat that rewards thoughtful decision-making. Navigate through procedurally-generated chambers where each room presents new tactical challenges and opportunities for discovery."
  },
  {
    id: "flexible-heroes",
    question: "FLEXIBLE HERO SYSTEM",
    answer: "Play with standard adventurers or bring in up to four heroes from your Guild Saga collection. Whether you lead a company of bronze-ranked adventurers or your own collected heroes, every battle tests your strategic acumen in this unforgiving realm."
  },
  {
    id: "risk-reward",
    question: "RISK-REWARD DECISIONS",
    answer: "Convert your findings into blockchain assets or brave the deeper levels. Seamlessly integrating Solana blockchain technology into a compelling tactical RPG experience, where each decision carries weight and consequences."
  },
  {
    id: "solana-integration",
    question: "SOLANA INTEGRATION",
    answer: "Lightning-fast transactions and seamless asset imports powered by Solana. The game is built on Solana, known for low fees and fast transactions, providing a smooth blockchain gaming experience."
  },
  {
    id: "classic-mechanics",
    question: "CLASSIC TACTICAL RPG MECHANICS",
    answer: "Classic tactical RPG mechanics reimagined with modern design sensibilities. The game reimagines classic tactical RPG mechanics with a modern design, featuring strategic battles, risk-reward mechanics, and precious loot in ever-changing dungeon archives."
  },
  {
    id: "procedural-chambers",
    question: "PROCEDURALLY-GENERATED CHAMBERS",
    answer: "Navigate through procedurally-generated chambers in Usior's vast underground archive, where each room presents new tactical challenges and opportunities for discovery. Every expedition offers a unique experience."
  },
  {
    id: "blockchain-assets",
    question: "BLOCKCHAIN ASSET INTEGRATION",
    answer: "Certain in-game items can be converted into blockchain assets and traded on the Solana network. Experience seamless integration with the Solana blockchain for secure and efficient asset management."
  },
  {
    id: "modern-design",
    question: "MODERN DESIGN SENSIBILITIES",
    answer: "Experience a compelling tactical RPG experience with modern design sensibilities that enhance the classic genre. The game combines traditional tactical gameplay with contemporary visual and mechanical innovations."
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
    <section className="relative text-white">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        {/* Background Video with Smoke Mask */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: "url('/avif/smoke-mask-2.avif'), url('/webp/smoke-mask-2.webp')",
            maskSize: "cover",
            maskPosition: "bottom center",
            maskRepeat: "no-repeat",
            WebkitMaskImage: "url('/avif/smoke-mask-2.avif'), url('/webp/smoke-mask-2.webp')",
            WebkitMaskSize: "cover",
            WebkitMaskPosition: "bottom center",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <FaqVideo />
        </div>
        
        {/* Masked overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-black/65 sm:bg-black/30"
          style={{
            maskImage: "url('/avif/smoke-mask-2.avif'), url('/webp/smoke-mask-2.webp')",
            maskSize: "cover",
            maskPosition: "bottom center",
            maskRepeat: "no-repeat",
            WebkitMaskImage: "url('/avif/smoke-mask-2.avif'), url('/webp/smoke-mask-2.webp')",
            WebkitMaskSize: "cover",
            WebkitMaskPosition: "bottom center",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
        
        {/* FAQ Title */}
        <div className="absolute inset-0 flex items-center px-8 lg:px-4">
          <div className="space-y-2">
            <p className="text-[#fbcea0] text-xs md:text-sm font-medium tracking-widest mb-4 font-oldFenris drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] uppercase">
              Labyrinths
            </p>
            <h1 className="text-5xl md:text-6xl font-oldFenris tracking-wider mb-6 text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
              style={{ backgroundImage: "linear-gradient(to right, #fff, #fbcea0 80%, #fbcfa0)" }}>
              KEY FEATURES
            </h1>
            <div className="w-46 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, #8c6c52, transparent)" }}></div>
          </div>
                </div>
      </div>



      {/* FAQ Content */}
      <div className="max-w-7xl mx-auto -mt-20 pb-6 px-8 lg:px-4">
          {/* FAQ Items in 2x4 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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
                  <Corner className="w-18 h-18 text-[#8c6c52]" />
                </div>
                {/* Top Right Corner */}
                <div className="absolute top-0 right-0 z-10">
                  <Corner className="w-18 h-18 text-[#8c6c52]" />
                </div>
                {/* Bottom Left Corner */}
                <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1]">
                  <Corner className="w-18 h-18 text-[#8c6c52]" />
                </div>
                {/* Bottom Right Corner */}
                <div className="absolute bottom-0 right-0 z-10 scale-y-[-1]">
                  <Corner className="w-18 h-18 text-[#8c6c52]" />
                </div>
                
                <AccordionTrigger className="px-6 py-5 flex items-center h-[100px] hover:no-underline [&>svg]:ml-auto [&>svg]:w-8 [&>svg]:h-8 [&>svg]:drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [&>svg]:text-[#D8BB9D] pointer-events-none">
                  <span className="font-semibold font-oldFenris text-lg uppercase tracking-wide pr-4 text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-sm"
                    style={{ backgroundImage: "linear-gradient(to right, #FFF4EA, #D8BB9D 50%, #FBCEA0 100%)" }}>
                    {item.question}
                  </span>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-5">
                  <p className="text-[#d4d4d4] text-sm leading-relaxed font-quattrocento">
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
                  <Corner className="w-18 h-18 text-[#8c6c52]" />
                </div>
                {/* Top Right Corner */}
                <div className="absolute top-0 right-0 z-10">
                  <Corner className="w-18 h-18 text-[#8c6c52]" />
                </div>
                {/* Bottom Left Corner */}
                <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1]">
                  <Corner className="w-18 h-18 text-[#8c6c52]" />
                </div>
                {/* Bottom Right Corner */}
                <div className="absolute bottom-0 right-0 z-10 scale-y-[-1]">
                  <Corner className="w-18 h-18 text-[#8c6c52]" />
                </div>
                
                <AccordionTrigger className="px-6 py-5 flex items-center h-[100px] hover:no-underline [&>svg]:ml-auto [&>svg]:w-8 [&>svg]:h-8 [&>svg]:drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [&>svg]:text-[#D8BB9D] pointer-events-none">
                  <span className="font-semibold font-oldFenris text-lg uppercase tracking-wide pr-4 text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-sm"
                    style={{ backgroundImage: "linear-gradient(to right, #FFF4EA, #D8BB9D 50%, #FBCEA0 100%)" }}>
                    {item.question}
                  </span>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-5">
                  <p className="text-[#d4d4d4] text-sm leading-relaxed font-quattrocento">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Support Section */}
        <div className="relative">
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
                  <p className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-oldFenris text-transparent bg-clip-text text-pretty"
                style={{ backgroundImage: "linear-gradient(to right, #fff, #fbcea0 20%, #fbcfa0)" }}>
                    EPIC GAMES STORE
                  </p>
                </div>

                {/* Read More Button */}
                <div className="flex justify-start pt-4">
                  <a 
                    href="https://store.epicgames.com/en-US/p/guild-saga-labyrinths-ca0f96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group cursor-pointer relative overflow-hidden px-8 py-3.5 gradient-border-top transition-all duration-200 ease-[var(--ease-in-out-quad)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] opacity-100 translate-y-0 backdrop-blur-sm bg-black/20"
                    style={{
                      borderStyle: "solid",
                      borderWidth: "0 1px 1px 1px",
                      borderImage: "linear-gradient(to top, #534C3F, #B4906C) 1",
                    }}>
                    {/* Top Left Corner */}
                    <div className="absolute top-0 left-0 z-10 scale-x-[-1] opacity-50">
                      <Corner className="w-12 h-12 text-[#8c6c52]" />
                    </div>
                    {/* Top Right Corner */}
                    <div className="absolute top-0 right-0 z-10 opacity-50">
                      <Corner className="w-12 h-12 text-[#8c6c52]" />
                    </div>
                    {/* Bottom Left Corner */}
                    <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1] opacity-50">
                      <Corner className="w-12 h-12 text-[#8c6c52]" />
                    </div>
                    {/* Bottom Right Corner */}
                    <div className="absolute bottom-0 right-0 z-10 scale-y-[-1] opacity-50">
                      <Corner className="w-12 h-12 text-[#8c6c52]" />
                    </div>
                    
                    <div className="relative">
                      <p className="uppercase font-quattrocento text-sm tracking-wide font-semibold text-[#fbcea0] group-hover:text-white text-center">
                        LEARN MORE
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Support Image with Smoke Mask */}
            <div 
              className="absolute inset-0 z-0"
              style={{
                maskImage: "url('/avif/smoke-mask-2.avif'), url('/webp/smoke-mask-2.webp')",
                maskSize: "cover",
                maskPosition: "bottom center",
                maskRepeat: "no-repeat",
                WebkitMaskImage: "url('/avif/smoke-mask-2.avif'), url('/webp/smoke-mask-2.webp')",
                WebkitMaskSize: "cover",
                WebkitMaskPosition: "bottom center",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              <picture>
                <source srcSet="/avif/lab-screenshot7.avif" type="image/avif" />
                <Image
                  src="/webp/lab-screenshot7.webp"
                  alt="Support"
                  fill
                  sizes="100vw"
                  className="object-cover scale-140"
                  style={{ 
                    width: "100%",
                    left: "20%",
                    objectPosition: "center center" 
                  }}
                />
              </picture>
              
              {/* Overlay with same mask */}
              <div 
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.1))",
                  maskImage: "url('/avif/smoke-mask-2.avif'), url('/webp/smoke-mask-2.webp')",
                  maskSize: "cover",
                  maskPosition: "bottom center",
                  maskRepeat: "no-repeat",
                  WebkitMaskImage: "url('/avif/smoke-mask-2.avif'), url('/webp/smoke-mask-2.webp')",
                  WebkitMaskSize: "cover",
                  WebkitMaskPosition: "bottom center",
                  WebkitMaskRepeat: "no-repeat",
                }}
              />
              {/* Darker overlay for screens under sm */}
              <div 
                className="absolute inset-0 sm:hidden"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.10))",
                  maskImage: "url('/avif/smoke-mask-2.avif'), url('/webp/smoke-mask-2.webp')",
                  maskSize: "cover",
                  maskPosition: "bottom center",
                  maskRepeat: "no-repeat",
                  WebkitMaskImage: "url('/avif/smoke-mask-2.avif'), url('/webp/smoke-mask-2.webp')",
                  WebkitMaskSize: "cover",
                  WebkitMaskPosition: "bottom center",
                  WebkitMaskRepeat: "no-repeat",
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