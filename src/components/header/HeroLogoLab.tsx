"use client"

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { SafariImage } from '@/components/ui/safari-image'
import { useSafari } from '@/hooks/useSafari'

interface HeroLogoLabProps {
  widthClasses: string
}

export default function HeroLogoLab({ widthClasses }: HeroLogoLabProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isSafari = useSafari()
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleError = () => setVideoFailed(true);
    const handleCanPlay = () => setVideoFailed(false);
    
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);
    
    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Use static logo for Safari, mobile, or when video fails
  if (isSafari || videoFailed) {
    return (
      <div className={`mx-auto md:mb-2 ${widthClasses} select-none relative`}>
        <SafariImage
          avifSrc="/avif/lab.avif"
          webpSrc="/webp/lab.webp"
          alt="Lab Logo"
          width={400}
          height={200}
          className="w-[86%] h-auto mx-auto mt-10"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`mx-auto md:mb-2 ${widthClasses} select-none relative`}>
      {/* Static logo for mobile */}
      <div className="block md:hidden">
        <Image
          src="/webp/lab.webp"
          alt="Lab Logo"
          width={400}
          height={200}
          className="w-full h-auto"
          priority
        />
      </div>
      
      {/* Video logo with hologram effect for desktop */}
      <div className="hidden md:block">
        <video
          ref={videoRef}
          className="w-full h-auto animate-glitch-main brightness-125 contrast-110 saturate-125"
          autoPlay
          muted
          playsInline
          draggable={false}
          preload="metadata"
        >
          <source src="/video/lab.webm" type="video/webm" />
        </video>
        {/* Blue glitch layer */}
        <video
          className="w-full h-auto absolute top-0 left-0 animate-glitch-blue"
          autoPlay
          muted
          playsInline
          draggable={false}
          preload="metadata"
        >
          <source src="/video/lab.webm" type="video/webm" />
        </video>
        {/* Green glitch layer */}
        <video
          className="w-full h-auto absolute top-0 left-0 animate-glitch-green"
          autoPlay
          muted
          playsInline
          draggable={false}
          preload="metadata"
        >
          <source src="/video/lab.webm" type="video/webm" />
        </video>
      </div>
    </div>
  )
} 