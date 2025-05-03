import React from 'react';

import Steam from '@/components/logos/Steam';
import Unity from '@/components/logos/Unity';
import Solana from '@/components/logos/Solana';
import Ocelot from '@/components/logos/Ocelot';

interface HeroProps {
  height: string;
}

const Hero: React.FC<HeroProps> = ({ height}) => {
  return (
    <div
      className="w-full relative overflow-hidden max-w-9xl mx-auto"
      style={{
        height,
        WebkitMaskImage: 'radial-gradient(circle at center, white 40%, transparent 100%)',
        maskImage: 'radial-gradient(circle at center, white 40%, transparent 100%)',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    >
      <img
        src="/webp/temp-screen.png"
        alt="Temporary screen"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/[46%] via-black/0 to-black/[46%] pointer-events-none" />
      <div className="absolute inset-0 bg-black/[50%] pointer-events-none" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8">
        <img
          src="/webp/guildsaga.webp"
          alt="Guild Saga Logo"
          className="mx-auto h-54 mb-8"
        />
        <div className="space-y-6 mb-12 text-center">
          <div className="relative inline-block">
            {/* Beneath, stationary text */}
            <h2 className="text-[#E0A970] text-45xl font-oldFenris layer-blur">
              EARLY ACCESS <br/> AVAILABLE NOW
            </h2>
            {/* Overlaying text */}
            <h2 className="absolute inset-0 text-[#E7E7E7] text-45xl font-oldFenris text-shadow-xs">
              EARLY ACCESS <br/> AVAILABLE NOW
            </h2>
          </div>
          <h3 className="font-semibold text-[#B9B9B9] text-center filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            FANTASY RPG
          </h3>
        </div>
        <a
          href="https://store.steampowered.com/app/2184350/Guild_Saga_Vanished_Worlds/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-2 font-oldFenris text-xl bg-black opacity-80 hover:opacity-100 cursor-pointer transition-opacity duration-200 ease-[var(--ease-in-out-quad)]"
          style={{
            border: '10px solid transparent',
            borderImage: 'url("/webp/temp-btn.webp") 20 round',
          }}
        >
          BUY NOW
        </a>
        <div className="mt-8 flex items-center justify-center absolute bottom-0">
          {/* Partner logos */}
          <a href="https://store.steampowered.com/" target="_blank" rel="noopener noreferrer">
            <Steam className="h-18 w-auto opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)]" />
          </a>
          <a href="https://unity.com/" target="_blank" rel="noopener noreferrer">
            <Unity className="h-20 ml-6 w-auto opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)]"/>
          </a>
          <a href="https://ocelot.ltd/" target="_blank" rel="noopener noreferrer">
            <Ocelot className="h-20 w-auto mb-4 opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)]"/>
          </a>
          <a href="https://solana.com/" target="_blank" rel="noopener noreferrer">
            <Solana className="h-20 w-auto opacity-60 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)]"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
