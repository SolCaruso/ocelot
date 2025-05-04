import React from 'react';
import Steam from '@/components/logos/Steam';
import Unity from '@/components/logos/Unity';
import Solana from '@/components/logos/Solana';
import Ocelot from '@/components/logos/Ocelot';
import SteamMobile from '@/components/logos/mobile/Steam';
import UnityMobile from '@/components/logos/mobile/Unity';
import SolanaMobile from '@/components/logos/mobile/Solana';
import OcelotMobile from '@/components/logos/mobile/Ocelot';
import Image from 'next/image';

interface HeroProps {
  /** Tailwind classes for responsive sizing, e.g. "h-40 md:h-56 lg:h-72" */
  className?: string;
  /** Optional inline height fallback, e.g. "900px" */
  height?: string;
}

const Hero: React.FC<HeroProps> = ({ className, height }) => {
  const maskStyles = {
    WebkitMaskImage: 'radial-gradient(circle at center, white 20%, transparent 85%)',
    maskImage: 'radial-gradient(circle at center, white 20%, transparent 85%)',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  };
  return (
    <div
      className={`w-full relative overflow-hidden max-w-9xl mx-auto ${className ?? ''}`}
      style={className ? maskStyles : { ...maskStyles, height }}
    >
      <video
        src="/videos/hero.mp4"
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/[46%] via-black/0 to-black/[46%] pointer-events-none" />
      <div className="absolute inset-0 bg-black/[40%] pointer-events-none" />
      <div className="absolute inset-0 flex flex-col items-center md:justify-center text-center md:space-y-8 mt-32 md:mt-0">

        {/* Logo */}
        <Image
          src="/webp/guildsaga.webp"
          alt="Guild Saga Logo"
          className="mx-auto h-auto mb-8 sm:w-[35rem] w-[24rem] select-none"
          width={1920}
          height={1080}
          draggable={false}
        />

        {/* Text */}
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 text-center">
          <div className="relative inline-block">
            {/* Beneath, stationary text */}
            <h2 className="text-[#E0A970] text-4xl md:text-5xl font-oldFenris layer-blur">
              EARLY ACCESS <br/> AVAILABLE NOW
            </h2>
            {/* Overlaying text */}
            <h2 className="absolute inset-0 text-[#E7E7E7] text-4xl md:text-5xl font-oldFenris text-shadow-xs">
              EARLY ACCESS <br/> AVAILABLE NOW
            </h2>
          </div>
          <h3 className="font-semibold text-[#B9B9B9] md:text-lg text-center filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            FANTASY RPG
          </h3>
        </div>

        {/* Button */}
        <a
          href="https://store.steampowered.com/app/2184350/Guild_Saga_Vanished_Worlds/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-2 font-oldFenris text-xl bg-black hover:bg-[#18160d] opacity-80 hover:opacity-100 cursor-pointer transition-all duration-200 ease-[var(--ease-in-out-quad)]"
          style={{
            border: '10px solid transparent',
            borderImage: 'url("/webp/temp-btn.webp") 20 round',
          }}
        >
          BUY NOW
        </a>

        <div className="mt-8 flex items-center justify-center absolute bottom-0 mb-8 lg:mb-0">
          {/* Partner logos */}
          <a href="https://store.steampowered.com/" target="_blank" rel="noopener noreferrer">
            <Steam className="h-18 w-auto opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)] hidden lg:block" />
            <SteamMobile className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)] lg:hidden" />
          </a>
          <a href="https://unity.com/" target="_blank" rel="noopener noreferrer">
            <Unity className="h-20 ml-6 w-auto opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)] hidden lg:block"/>
            <UnityMobile className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)] lg:hidden"/>
          </a>
          <a href="https://ocelot.ltd/" target="_blank" rel="noopener noreferrer">
            <Ocelot className="h-20 w-auto mb-4 opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)] hidden lg:block"/>
            <OcelotMobile className="h-14 w-auto mb-4 opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)] lg:hidden"/>
          </a>
          <a href="https://solana.com/" target="_blank" rel="noopener noreferrer">
            <Solana className="h-20 w-auto opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)] hidden lg:block"/>
            <SolanaMobile className="h-14 w-auto opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)] lg:hidden"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
