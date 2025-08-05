"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import labHeroThumb from '@/assets/webp/lab-hero-thumb.webp'

interface HeroVideoLabProps {
  videoSrc: string
  posterSrc?: string
}

export default function HeroVideoLab({ videoSrc, posterSrc }: HeroVideoLabProps) {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoCanPlay = () => {
    // Video is ready to play
  }

  const handleVideoPlay = () => {
    setVideoPlaying(true)
  }

  const handleVideoPause = () => {
    setVideoPlaying(false)
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
        preload="auto"
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