import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Steam from '@/components/logos/partners/Steam';
import Unity from '@/components/logos/partners/Unity';
import Ocelot from '@/components/logos/partners/Ocelot';
import SteamMobile from '@/components/logos/partners-mobile/Steam';
import UnityMobile from '@/components/logos/partners-mobile/Unity';
import OcelotMobile from '@/components/logos/partners-mobile/Ocelot';

interface HeroProps {
  /** Tailwind classes for responsive sizing, e.g. "h-40 md:h-56 lg:h-72" */
  className?: string;
  /** Optional inline height fallback, e.g. "900px" */
  height?: string;
}

const Hero: React.FC<HeroProps> = ({ className, height }) => {
  return (
    <>
      {/* Full‑width smoke background */}
      <div className="w-full relative bg-[url('/webp/smoke.webp')] bg-cover bg-center bg-fixed">
        {/* Smoke gradient overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-black/30 to-black/0 pointer-events-none" />
        <div
          className={clsx(
            "w-full relative z-10 overflow-hidden max-w-8xl mx-auto",
            className
          )}
          style={height ? { height } : undefined}
        >
          {/* Masked video + shader */}
          <div
            className="relative w-full h-full [mask-image:radial-gradient(circle_at_center,_white_40%,_transparent_85%)] [mask-repeat:no-repeat] [mask-position:center]"
          >
            <video
              src="/video/vw-hero.mp4"
              className="w-full h-full object-cover z-0 scale-x-[-1] object-bottom"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Shader */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 to-black/0 pointer-events-none hidden md:block"/>
          </div>

          <div className="absolute inset-x-0 top-0 bottom-0 transform-gpu z-20 flex flex-col items-center justify-center md:justify-start text-center md:pt-32 ">

            {/* Logo */}
            <Image
              src="/webp/vw.webp"
              alt="Guild Saga Logo"
              className="mx-auto h-auto mb-4 w-[24rem] lg:w-[32rem] select-none animate-slide-up-gentle opacity-0 pb-4"
              width={1920}
              height={1080}
              draggable={false}
            />

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
          </div>

          <div className="absolute inset-x-0 bottom-0 mb-8 items-center justify-center opacity-50 hidden md:flex">

              {/* Partner logos */}
              <div>
                <Steam className="h-18 w-auto hidden lg:block" />
                <SteamMobile className="h-14 w-auto lg:hidden" />
              </div>
              <div>
                <Unity className="h-20 ml-6 w-auto hidden lg:block"/>
                <UnityMobile className="h-14 w-auto lg:hidden"/>
              </div>
              <div>
                <Ocelot className="h-20 w-auto mb-4 hidden lg:block"/>
                <OcelotMobile className="h-14 w-auto mb-4 lg:hidden"/>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
