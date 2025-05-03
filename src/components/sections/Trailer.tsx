'use client'; 

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Play from '@/components/ui/icons/Play';

const Trailer: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Load the IFrame Player API code asynchronously
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // Function called by the API when it's loaded.
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('yt-player', {
        videoId: 'feH6zZBT1g8',
        playerVars: {
          rel: 0,
          modestbranding: 1,
          controls: 0,
          disablekb: 1,
        },
        events: {
          onReady: (e: any) => {
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

      {/* Left black fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent z-20" />

      {/* Right black fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent z-20" />

      <div className="absolute inset-0"

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
        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-16 z-30">

            {/* Video placeholder */}
            <div className="aspect-[16/9] w-[640px] bg-black relative filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] border-[1.5px] border-[#282828] opacity-80 hover:opacity-100 transition-opacity duration-200 ease-[var(--ease-in-out-quad)] cursor-pointer"
            onClick={handlePlay}>
                {!playing ? (
                    <>
                    <img
                        src="/webp/thumb.webp"
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
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
            <div className=" md:ml-8 flex-1 text-center lg:text-left max-w-xl">
                <h3 className="text-[#D2C8AE] text-5xl font-oldFenris filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] pb-4">
                    FANTASY TACTICS
                </h3>
                <p className="mt-4 text-gray-200 text-xl font-quattrocento filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] ">
                    Tactical, isometric turn-based combat draws inspiration from the classic
                    RPGs of old, offering both depth and strategy.
                </p>
                <p className="mt-4 text-xl text-gray-200 font-quattrocento filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
                    As you recruit and assemble a diverse party, each member’s unique abilities become crucial
                    to your success on the battlefield.
                </p>
            </div>

        </div>

        {/* Undine illustration */}
        <div className="absolute -right-12 -bottom-66 4xl:-bottom-[8.3rem] z-20 xl:block hidden opacity-30 3xl:opacity-100">
          <div className="relative w-[500px] h-[1200px] 4xl:w-[700px] ">
            <Image
              src="/webp/undinewebp.webp"
              alt="Undine Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
    
    </section>
  );
};

export default Trailer;
