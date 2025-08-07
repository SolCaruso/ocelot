"use client"

import React, { useState } from 'react'
import Image from "next/image"
import labUsiorThumbAvif from '@/assets/avif/lab-usior-thumb.avif'
import labUsiorThumbWebp from '@/assets/webp/lab-usior-thumb.webp'
import { useSafari } from '@/hooks/useSafari'

interface UsiorVideoProps {
  className?: string
}

export default function UsiorVideo({ className = "" }: UsiorVideoProps) {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const isSafari = useSafari()

  const handleVideoPlay = () => {
    setVideoPlaying(true)
  }

  // For Safari, just show the thumbnail
  if (isSafari) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={labUsiorThumbWebp}
          alt="Usior video thumbnail"
          fill
          className="object-cover scale-140"
          style={{ 
            width: "100%",
            left: "20%",
            objectPosition: "right center"
          }}
          priority
          placeholder="blur"
          sizes="100vw"
        />
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!videoPlaying ? (
        <picture>
          <source srcSet={labUsiorThumbAvif.src} type="image/avif" />
          <Image
            src={labUsiorThumbWebp}
            alt="Usior video thumbnail"
            fill
            className="object-cover scale-140"
            style={{ 
              width: "100%",
              left: "20%",
              objectPosition: "right center"
            }}
            priority
            placeholder="blur"
            sizes="100vw"
          />
        </picture>
      ) : null}
      
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover scale-140"
        style={{ 
          width: "100%",
          left: "20%",
          objectPosition: "right center"
        }}
        onPlay={handleVideoPlay}
      >
        <source src="/video/usior.webm" type="video/webm" />
        <source src="/video/usior.mp4" type="video/mp4" />
      </video>
    </div>
  )
} 