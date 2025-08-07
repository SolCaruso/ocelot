'use client';

import { useEffect, useRef, useState } from 'react';
import OcelotFooter from './OcelotFooter';
import { useSafari } from '@/hooks/useSafari';

export default function Ocelot() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const isSafari = useSafari();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleEnded = () => video.pause();
    const handleError = () => setVideoFailed(true);
    const handleCanPlay = () => setVideoFailed(false);
    
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);
    
    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Use static logo for Safari or when video fails
  if (isSafari || videoFailed) {
    return <OcelotFooter className="w-4/5 h-full mx-auto" />;
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      preload="metadata"
      className="w-full h-full object-contain
          invert brightness-0 sepia
          hue-rotate-[55deg] saturate-[1250%] contrast-[20%]"
    >
      <source src="/video/ocelot.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}