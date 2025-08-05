'use client';

import { useEffect, useRef, useState } from 'react';
import OcelotFooter from './OcelotFooter';

export default function Ocelot() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

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

  if (videoFailed) {
    return <OcelotFooter className="w-full h-full" />;
  }

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