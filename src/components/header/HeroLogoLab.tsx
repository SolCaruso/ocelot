"use client"

import { useRef } from 'react'

interface HeroLogoLabProps {
  widthClasses: string
}

export default function HeroLogoLab({ widthClasses }: HeroLogoLabProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className={`mx-auto md:mb-2 ${widthClasses} select-none relative`}>
      {/* Video logo with hologram effect */}
      <video
        ref={videoRef}
        className="w-full h-auto animate-glitch-main"
        autoPlay
        muted
        playsInline
        draggable={false}
        loop
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
        loop
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
        loop
      >
        <source src="/video/lab.webm" type="video/webm" />
        <source src="/video/lab.mp4" type="video/mp4" />
      </video>
    </div>
  )
} 