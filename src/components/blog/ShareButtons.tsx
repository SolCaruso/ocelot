'use client'

import React, { useState, useEffect } from 'react'
import { Clipboard, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import X from '@/components/logos/social/X';

export default function ShareButtons({ title }: { title: string }) {
  const [shareUrl, setShareUrl] = useState<string>('')

  // only grab URL on the client
  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  if (!shareUrl) return null

  const copyLink = () => navigator.clipboard.writeText(shareUrl)

  return (
    <Popover>
      {/* The “Share” trigger */}
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Share2 className="w-5 h-5 " />
          <span>Share</span>
        </Button>
      </PopoverTrigger>

      {/* The pop-over content */}
      <PopoverContent className="w-42">
        {/* Copy link */}
        <button
          onClick={copyLink}
          className="flex items-center space-x-2.5 w-full text-left p-2 hover:bg-stone-50/5 rounded"
        >
          <Clipboard className="w-4 h-4 text-white/70" />
          <span>Copy link</span>
        </button>

        {/* Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 p-2 hover:bg-stone-50/5 rounded"
        >
            <X className="w-5 h-5 text-white/70" />
            <span>X</span>
        </a>

        {/* Facebook */}
        <a
          href={
            `https://www.facebook.com/sharer/sharer.php?` +
            `u=${encodeURIComponent(shareUrl)}` +
            `&quote=${encodeURIComponent(title)}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 p-2 hover:bg-stone-50/5 rounded"
        >
          {/* <FaFacebook className="w-5 h-5 " /> */}
          <span>Facebook</span>
        </a>
      </PopoverContent>
    </Popover>
  )
}