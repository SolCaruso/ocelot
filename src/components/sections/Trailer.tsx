/// <reference types="youtube" />
'use client';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Divider from '@/components/ui/divider';
import Play from '@/components/ui/icons/Play';

const Trailer: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    // Load the IFrame Player API code asynchronously
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // Function called by the API when it's loaded.
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new YT.Player('yt-player', {
        videoId: 'feH6zZBT1g8',
        playerVars: {
          rel: 0,
          modestbranding: 1,
          controls: 0,
          disablekb: 1,
        },
        events: {
          onReady: (e: YT.PlayerEvent) => {
            if (playing) {
              e.target.playVideo();
            }
          },
        },
      });
    };
  }, []);

  useEffect(() => {
    if (playing && playerRef.current?.playVideo) {
      playerRef.current.playVideo();
    }
  }, [playing]);

  const handlePlay = () => {
    setPlaying(true);
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
    }
  };

  return (
    <section className="relative overflow-x-clip">

      {/* Left fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gs-bg to-transparent z-20" />

      {/* Right fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gs-bg to-transparent z-20" />

      <div className="absolute inset-0 opacity-70"

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

        {/* Video and text block */}
        <div className="relative sm:max-w-7xl mx-auto px-6 py-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-16 z-40">

            {/* Video placeholder */}
            <div className="aspect-[16/9] w-full max-w-[440px] sm:max-w-[540px] md:max-w-[640px] h-auto bg-gs-bg relative filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] border-[1.5px] border-[#282828] opacity-80 hover:opacity-100 transition-opacity duration-200 ease-[var(--ease-in-out-quad)] cursor-pointer"
            onClick={handlePlay}>
                {!playing ? (
                    <>
                    <Image
                        src="/webp/thumb.webp"
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                        width={640}
                        height={360}
                        draggable={false}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28"
                    >
                        <Play className="w-full h-full" />
                    </div>
                    </>
                ) : (
                    <iframe
                      id="yt-player"
                      className="w-full h-full"
                      src="https://www.youtube-nocookie.com/embed/feH6zZBT1g8?enablejsapi=1&autoplay=1"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                )}
            </div>

            {/* Text block */}
            <div className=" md:ml-8 flex-1 text-center lg:text-left max-w-xl min-w-[20rem]">
                <h3
                  className="bg-clip-text text-transparent text-4xl md:text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-4"
                  style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}
                >
                  FANTASY TACTICS
                </h3>
                <p className="mt-4 text-stone-50 md:text-xl font-quattrocento filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] ">
                    Tactical, isometric turn-based combat draws inspiration from the classic
                    RPGs of old, offering both depth and strategy.
                </p>
                <p className="mt-4 md:text-xl text-stone-50 font-quattrocento filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
                    As you recruit and assemble a diverse party, each member’s unique abilities become crucial
                    to your success on the battlefield.
                </p>
            </div>

        </div>

      {/* Undine illustration */}
      <Image
        src="/webp/undine.webp"
        alt="Undine Illustration"
        width={1506}
        height={2000}
        className="object-contain w-[500px] 4xl:w-[700px] absolute -right-12 bottom-0 z-20 xl:block hidden opacity-30 3xl:opacity-100 select-none"  
        draggable={false}
      />

      <Divider />
    
    </section>
  );
};

export default Trailer;
