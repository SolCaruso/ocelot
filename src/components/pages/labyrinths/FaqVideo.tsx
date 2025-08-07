"use client"

import React, { useState } from 'react'
import Image from "next/image"
import labFaqThumbAvif from '@/assets/avif/lab-faq-thumb.avif'
import labFaqThumbWebp from '@/assets/webp/lab-faq-thumb.webp'
import { useSafari } from '@/hooks/useSafari'

interface FaqVideoProps {
  className?: string
}

export default function FaqVideo({ className = "" }: FaqVideoProps) {
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
          src={labFaqThumbWebp}
          alt="FAQ video thumbnail"
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
          <source srcSet={labFaqThumbAvif.src} type="image/avif" />
          <Image
            src={labFaqThumbWebp}
            alt="FAQ video thumbnail"
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
          objectPosition: "right center",
          visibility: videoPlaying ? 'visible' : 'hidden'
        }}
        onPlay={handleVideoPlay}
      >
        <source src="/video/devil.webm" type="video/webm" />
        <source src="/video/devil.mp4" type="video/mp4" />
      </video>
    </div>
  )
} 