'use client';

import { useEffect, useRef } from 'react';

export default function Ocelot({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => video.pause();
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, []);

  return (
    <video
    ref={videoRef}
    autoPlay
    muted
    playsInline
    preload="auto"
    className="w-full h-full object-contain
        invert brightness-0 sepia
        hue-rotate-[55deg] saturate-[1250%] contrast-[20%]"
    >
    <source src="/video/ocelot.webm" type="video/webm" />
    Your browser does not support the video tag.
    </video>
  );
}