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
    id: "what-is",
    question: "WHAT IS GUILD SAGA: LABYRINTHS?",
    answer: "Guild Saga: Labyrinths is a 2D tactical RPG where you command adventurers through ever-changing dungeon archives filled with strategic battles, risk-reward mechanics, and precious loot. You can play with standard heroes or use your NFT heroes for deeper progression."
  },
  {
    id: "nft-required",
    question: "DO I NEED AN NFT TO PLAY?",
    answer: "No! You can play for free with a base roster of heroes. Owning a Guild Saga Heroes NFT or importing Solana SFT items enhances your experience, but they're not required."
  },
  {
    id: "different",
    question: "WHAT MAKES THIS GAME DIFFERENT FROM OTHER TACTICAL RPGS?",
    answer: "The game reimagines classic tactical RPG mechanics with a modern design, featuring strategic battles, risk-reward mechanics, and precious loot in ever-changing dungeon archives."
  },
  {
    id: "multiplayer",
    question: "IS THE GAME MULTIPLAYER?",
    answer: "Right now, Guild Saga: Labyrinths is a single-player experience, but future updates may introduce multiplayer or co-op elements."
  },
  {
    id: "platforms",
    question: "WHAT PLATFORMS IS THIS AVAILABLE ON?",
    answer: "The game is launching on PC via the Epic Games Store. Future platform support depends on player interest."
  },
  {
    id: "blockchain",
    question: "WHAT BLOCKCHAIN DOES THE GAME USE?",
    answer: "The game is built on Solana, known for low fees and fast transactions."
  },
  {
    id: "sft",
    question: "WHAT IS AN SFT?",
    answer: "SFT stands for Semi-Fungible Token, a blockchain asset that allows flexible item trading. In Guild Saga: Labyrinths, certain in-game items can be converted into SFTs and traded."
  },
  {
    id: "wallet",
    question: "HOW DO I CONNECT MY WALLET?",
    answer: "Players can connect a Solana-compatible wallet (like Phantom or Solflare) through the in-game interface."
  },
  {
    id: "trade",
    question: "CAN I TRADE OR SELL MY ITEMS AND HEROES?",
    answer: "Yes, heroes and certain in-game items can be bought, sold, or traded on third-party Solana marketplaces. However, always be cautious and research platforms before making transactions."
  },
  {
    id: "cryptocurrency",
    question: "DO I NEED TO BUY CRYPTOCURRENCY TO PLAY?",
    answer: "No! You can play 100% free without using cryptocurrency or NFTs. Blockchain features are optional."
  },
  {
    id: "epic-games",
    question: "IS EPIC GAMES RESPONSIBLE FOR BLOCKCHAIN TRANSACTIONS?",
    answer: "No. All transactions, payments, and refunds are handled by the game publisher. Epic Games does not endorse or regulate cryptocurrency purchases."
  },
  {
    id: "early-access",
    question: "WHAT DOES EARLY ACCESS MEAN?",
    answer: "The game is still in development, meaning content and mechanics may change over time. Players can join now to experience the game as it evolves."
  },
  {
    id: "progress",
    question: "WILL MY PROGRESS CARRY OVER AFTER EARLY ACCESS?",
    answer: "We plan to maintain player progress as much as possible, but some resets may happen if needed for balance or new features."
  },
  {
    id: "feedback",
    question: "HOW CAN I REPORT BUGS OR GIVE FEEDBACK?",
    answer: "Join our official Discord server to share feedback, report bugs, and stay up to date with development updates."
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
    <section className="relative ">

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
          className="absolute inset-0 w-full h-full bg-black/65 sm:bg-black/30"
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
        <div className="absolute inset-0 flex items-center px-8 lg:px-4">
          <div className="space-y-2">
            <p className="text-[#fbcea0] text-xs md:text-sm font-medium tracking-widest mb-4 font-oldFenris drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] uppercase">
              Labyrinths
            </p>
            <h1 className="text-5xl md:text-6xl font-oldFenris text-white tracking-wider mb-6">
              FAQ
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
                className={`relative border-t border-b border-l border-r border-[#8c6c52] bg-black/10 backdrop-blur-md hover:bg-white/5 transition-colors cursor-pointer group ${index < 3 ? 'mb-6' : ''} !border-b`}
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
                  <p className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-oldFenris text-transparent bg-clip-text text-pretty"
                style={{ backgroundImage: "linear-gradient(to right, #fff, #fbcea0 20%, #fbcfa0)" }}>
                    EPIC GAMES STORE
                  </p>
                </div>

                {/* Read More Button */}
                <div className="flex justify-start pt-4">
                  <a 
                    href="https://store.epicgames.com/en-US/p/guild-saga-tales-of-respite-ca0f96"
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
                        READ MORE
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
              
              {/* Overlay with same mask */}
              <div 
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.1))",
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
              {/* Darker overlay for screens under sm */}
              <div 
                className="absolute inset-0 sm:hidden"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.10))",
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;