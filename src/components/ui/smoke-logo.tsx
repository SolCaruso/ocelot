"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface SmokeLogoProps {
  src: string
  alt: string
  widthClasses: string
  className?: string
}

const SmokeLogo: React.FC<SmokeLogoProps> = ({ src, alt, widthClasses, className }) => {
  return (
    <div className={`mx-auto h-auto mb-2 ${widthClasses} select-none ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-auto"
        draggable={false}
        initial={{ 
          opacity: 0,
          y: 20,
          filter: 'blur(8px)'
        }}
        animate={{ 
          opacity: 1,
          y: 0,
          filter: 'blur(0px)'
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.1
        }}
      />
    </div>
  )
}

export default SmokeLogo 