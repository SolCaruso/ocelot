"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import labHeroThumb from '@/assets/webp/lab-hero-thumb.webp'
import { useSafari } from '@/hooks/useSafari'

interface HeroVideoLabProps {
  videoSrc: string
  posterSrc?: string
}

export default function HeroVideoLab({ videoSrc, posterSrc }: HeroVideoLabProps) {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isSafari = useSafari()

  const handleVideoCanPlay = () => {
    // Video is ready to play
  }

  const handleVideoPlay = () => {
    setVideoPlaying(true)
  }

  const handleVideoPause = () => {
    setVideoPlaying(false)
  }

  // For Safari, just show the poster image
  if (isSafari) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={labHeroThumb}
          alt="Video poster"
          fill
          className="object-cover z-0"
          priority
          placeholder="blur"
          quality={90}
          sizes="100vw"
          fetchPriority="high"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {/* Priority-loaded poster image - shows until video starts playing */}
      {posterSrc && !videoPlaying && (
        <Image
          src={labHeroThumb}
          alt="Video poster"
          fill
          className="object-cover z-0"
          priority
          placeholder="blur"
          quality={90}
          sizes="100vw"
          fetchPriority="high"
        />
      )}
      
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0 scale-x-[-1]"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onCanPlay={handleVideoCanPlay}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
      >
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
      </video>
    </div>
  )
} 