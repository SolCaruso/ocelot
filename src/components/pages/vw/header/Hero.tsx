import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';

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
      <div className="w-full relative bg-[url('/webp/smoke.webp')] bg-cover bg-center">
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

          <div className="absolute inset-x-0 top-0 bottom-0 transform-gpu z-20 flex flex-col items-center justify-center md:justify-start text-center md:pt-44">

            {/* Logo */}
            <Image
              src="/webp/vw.webp"
              alt="Guild Saga Logo"
              className="mx-auto h-auto mb-4 w-[24rem] lg:w-[35rem] select-none"
              width={1920}
              height={1080}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
