"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import vwHeroThumb from '@/assets/webp/hero-thumb.webp'
import { useSafari } from '@/hooks/useSafari'

interface HeroVideoProps {
  videoSrc: string
  posterSrc?: string
}

export default function HeroVideo({ videoSrc, posterSrc }: HeroVideoProps) {
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
          src={vwHeroThumb}
          alt="Video poster"
          fill
          className="object-cover z-0"
          priority
          placeholder="blur"
          quality={90}
          sizes="100vw"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {/* Priority-loaded poster image - shows until video starts playing */}
      {posterSrc && !videoPlaying && (
        <Image
          src={vwHeroThumb}
          alt="Video poster"
          fill
          className="object-cover z-0 "
          priority
          placeholder="blur"
          quality={90}
          sizes="100vw"
        />
      )}
      
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0 scale-x-[-1]"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
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