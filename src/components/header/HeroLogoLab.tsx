"use client"

import { useRef } from 'react'
import Image from 'next/image'

interface HeroLogoLabProps {
  widthClasses: string
}

export default function HeroLogoLab({ widthClasses }: HeroLogoLabProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

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
          className="w-full h-auto animate-glitch-main"
          autoPlay
          muted
          playsInline
          draggable={false}
        >
          <source src="/video/lab.webm" type="video/webm" />
          <source src="/video/lab.mp4" type="video/mp4" />
        </video>
        {/* Blue glitch layer */}
        <video
          className="w-full h-auto absolute top-0 left-0 animate-glitch-blue"
          autoPlay
          muted
          playsInline
          draggable={false}
        >
          <source src="/video/lab.webm" type="video/webm" />
          <source src="/video/lab.mp4" type="video/mp4" />
        </video>
        {/* Green glitch layer */}
        <video
          className="w-full h-auto absolute top-0 left-0 animate-glitch-green"
          autoPlay
          muted
          playsInline
          draggable={false}
        >
          <source src="/video/lab.webm" type="video/webm" />
          <source src="/video/lab.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
} 