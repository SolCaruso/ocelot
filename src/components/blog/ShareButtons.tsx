'use client'

import React, { useState, useEffect } from 'react'
import { ClipboardCopy, Link, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { toast } from 'sonner'
import X from '@/components/logos/social/X'
import Facebook from '@/components/logos/social/Facebook'

export default function ShareButtons({ title }: { title: string }) {
  const [shareUrl, setShareUrl] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    toast(
      <div className="flex items-center gap-2">
        <ClipboardCopy className="w-4 h-4 text-white/70" />
        <span>Link copied to clipboard</span>
      </div>
    )
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-42">
        <button
          onClick={copyLink}
          className="flex items-center space-x-2.5 w-full text-left p-2 hover:bg-stone-50/5 rounded"
        >
          <Link className="w-4 h-4 text-white/70" />
          <span>Copy link</span>
        </button>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)} // ✅ Close on click
          className="flex items-center space-x-2 p-2 hover:bg-stone-50/5 rounded"
        >
          <X className="w-5 h-5 text-white/70" />
          <span>X</span>
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}&quote=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)} // ✅ Close on click
          className="flex items-center space-x-2 p-2 hover:bg-stone-50/5 rounded"
        >
          <Facebook className="w-5 h-5 text-white/70" />
          <span>Facebook</span>
        </a>
      </PopoverContent>
    </Popover>
  )
}