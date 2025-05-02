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
    <div className="w-full relative overflow-hidden" style={{ height }}>
      <img
        src="/webp/temp-screen.png"
        alt="Temporary screen"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/[46%] to-black/0 pointer-events-none" />
      <div className="absolute inset-0 bg-black/[46%] pointer-events-none" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
        <img
          src="/webp/guildsaga.webp"
          alt="Guild Saga Logo"
          className="mx-auto h-52"
        />
        <div>
            <h2 className=" text-white text-3xl font-['oldFenris'] font-bold">
            EARLY ACCESS AVAILABLE NOW
            </h2>
            <h3 className=" font-semibold text-[#B9B9B9] text-xl">
            FANTASY RPG
            </h3>
        </div>
        <button
        className="px-10 py-2.5 font-['quattrocento'] font-bold text-xl bg-black opacity-80 hover:opacity-100 cursor-pointer transition-colors duration-200 ease-[var(--ease-in-out-quad)]"
        style={{
          border: '10px solid transparent',
          borderImage: 'url("/webp/temp-btn.webp") 20 round',
        }}
      >
        BUY NOW
      </button>
        <div className="mt-8 flex items-center justify-center absolute bottom-0">
          {/* Partner logos */}
          <a href="https://store.steampowered.com/" target="_blank" rel="noopener noreferrer">
            <Steam className="h-18 w-auto opacity-80 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)]" />
          </a>
          <a href="https://unity.com/" target="_blank" rel="noopener noreferrer">
            <Unity className="h-20 ml-6 w-auto opacity-80 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)]"/>
          </a>
          <a href="https://ocelot.ltd/" target="_blank" rel="noopener noreferrer">
            <Ocelot className="h-20 w-auto mb-4 opacity-80 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)]"/>
          </a>
          <a href="https://solana.com/" target="_blank" rel="noopener noreferrer">
            <Solana className="h-20 w-auto opacity-80 transition-opacity hover:opacity-100 cursor-pointer duration-200 ease-[var(--ease-in-out-quad)]"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
