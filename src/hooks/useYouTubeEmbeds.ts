"use client"

import { useEffect } from "react"
import type { RefObject } from "react"

export function useYouTubeEmbeds(contentRef: RefObject<HTMLDivElement | null>, content: string) {
  useEffect(() => {
    if (!contentRef.current) return

    const container = contentRef.current
    const textNodes: Text[] = []

    // Find all text nodes that might contain YouTube URLs
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null)

    let node
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text)
    }

    // Process each text node for YouTube URLs
    textNodes.forEach((textNode) => {
      const text = textNode.textContent || ""
      const youtubeRegex = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/g

      if (youtubeRegex.test(text)) {
        // Replace the text node with iframe
        const newText = text.replace(youtubeRegex, (match, videoId) => {
          // Create iframe element
          const iframe = document.createElement("iframe")
          iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`
          iframe.title = "YouTube video"
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          iframe.allowFullscreen = true
          iframe.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
          iframe.loading = "lazy"

          // Create container div
          const container = document.createElement("div")
          container.style.cssText = "margin: 1.5rem 0;"

          const aspectContainer = document.createElement("div")
          aspectContainer.style.cssText =
            "position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 0.5rem; overflow: hidden; background-color: black;"

          aspectContainer.appendChild(iframe)
          container.appendChild(aspectContainer)

          // Insert the container before the text node
          textNode.parentNode?.insertBefore(container, textNode)

          return "" // Remove the URL from the text
        })

        // Update the text node content (removing the URL)
        if (newText !== text) {
          textNode.textContent = newText
        }
      }
    })
  }, [content, contentRef])
}
