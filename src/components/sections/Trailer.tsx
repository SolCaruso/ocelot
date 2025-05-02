'use client'; 

import React, { useState } from 'react';
import Image from 'next/image';

const Trailer: React.FC = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative overflow-x-clip">
      {/* Left black fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent z-20" />
      {/* Right black fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent z-20" />
      <div
        className="absolute inset-0"
        style={{
          // leather texture with subtle radial vignette
          backgroundImage: [
            'radial-gradient(farthest-corner at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 80%)',
            'url("/webp/leather-texture.webp")'
          ].join(', '),
          backgroundRepeat: 'repeat',
          boxShadow:
            'inset 0px 1px 0px rgba(0,0,0,0.24), inset 0px 2px 0px rgba(255,255,255,0.06), inset 0px -1px 0px rgba(0,0,0,0.24), inset 0px -2px 0px rgba(255,255,255,0.06)',
        }}
      />
      <div className="relative z-10 max-w-8xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
        {/* Video placeholder */}
        <div className="w-full md:w-[800px] h-[440px] bg-black relative">
          {!playing ? (
            <>
              <img
                src="/webp/temp-screen.png"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <button
                className="absolute inset-0 flex items-center justify-center text-white text-6xl"
                onClick={() => setPlaying(true)}
              >
                ▶︎
              </button>
            </>
          ) : (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </div>

        {/* Text block */}
        <div className="mt-8 md:mt-0 md:ml-8 flex-1 text-center md:text-left">
          <h3 className="text-white text-2xl font-oldFenris">
            FANTASY TACTICS
          </h3>
          <p className="mt-4 text-base font-quattrocento">
            Tactical, isometric turn-based combat draws inspiration from the classic
            RPGs of old, offering both depth and strategy. As you recruit and
            assemble a diverse party, each member’s unique abilities become crucial
            to your success on the battlefield.
          </p>
        </div>
      </div>
      <div className='absolute -right-12 bottom-0 z-20'>
        <Image src='/webp/undinewebp.webp' alt='Undine Illustration' width={500} height={1200}></Image>
      </div>
    
    </section>
  );
};

export default Trailer;
