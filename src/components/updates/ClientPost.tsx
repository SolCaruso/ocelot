"use client"

import React, { useEffect, useRef } from "react"
import type { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import ShareButtons from "./ShareButtons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Function to clean markdown content - remove frontmatter
function cleanMarkdownContent(content: string): string {
  const frontmatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n/
  return content.replace(frontmatterRegex, "").trim()
}

// Helper function to format Discord timestamp
function formatDiscordDate(timestamp: string): string {
  try {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", timestamp)
      return "Invalid Date"
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (error) {
    console.error("Error formatting date:", error, timestamp)
    return "Invalid Date"
  }
}

export function ClientPost({
  code,
  title,
  date,
}: {
  code: string
  title?: string
  date?: string
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Clean the markdown content
  const cleanedCode = cleanMarkdownContent(code)

  // Process YouTube URLs after the component mounts
  useEffect(() => {
    if (!contentRef.current) return

    const container = contentRef.current
    const textNodes: Text[] = []
    
    // Find all text nodes that might contain YouTube URLs
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let node
    while (node = walker.nextNode()) {
      textNodes.push(node as Text)
    }
    
    // Process each text node for YouTube URLs
    textNodes.forEach(textNode => {
      const text = textNode.textContent || ""
      const youtubeRegex = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/g
      
      if (youtubeRegex.test(text)) {

       // Replace the text node with iframe
        const newText = text.replace(youtubeRegex, (match, videoId) => {
         
          // Create iframe element
          const iframe = document.createElement('iframe')
          iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`
          iframe.title = "YouTube video"
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          iframe.allowFullscreen = true
          iframe.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
          iframe.loading = "lazy"
          
          // Create container div
          const container = document.createElement('div')
          container.style.cssText = "margin: 1.5rem 0;"
          
          const aspectContainer = document.createElement('div')
          aspectContainer.style.cssText = "position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 0.5rem; overflow: hidden; background-color: black;"
          
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
  }, [cleanedCode])

  return (
    <article className="relative max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb & Share */}
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/updates">Updates</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{date && formatDiscordDate(date)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ShareButtons title={title || ""} />
      </div>

      <div ref={contentRef} className="prose prose-lg max-w-none text-white">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom heading components
            h1: ({ children }: { children: ReactNode }) => (
              <h1 className="text-3xl font-bold mb-6 mt-8 text-white">{children}</h1>
            ),
            h2: ({ children }: { children: ReactNode }) => (
              <h2 className="text-2xl font-bold mb-4 mt-6 text-white">{children}</h2>
            ),
            h3: ({ children }: { children: ReactNode }) => (
              <h3 className="text-xl font-bold mb-3 mt-5 text-white">{children}</h3>
            ),
            h4: ({ children }: { children: ReactNode }) => (
              <h4 className="text-lg font-bold mb-2 mt-4 text-white">{children}</h4>
            ),
            // Simple paragraph component
            p: ({ children }: { children: ReactNode }) => (
              <p className="mb-4 leading-relaxed text-white">{children}</p>
            ),
            // Enhanced link component
            a: ({ href, children }: { href?: string; children: ReactNode }) => {
              if (!href) return <span className="text-white">{children}</span>

              return (
                <Link
                  href={href}
                  className="text-[#fbcea0] hover:text-white hover:underline transition-colors no-underline"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {children}
                </Link>
              )
            },
            // Enhanced image component
            img: ({ src, alt }: { src?: string; alt?: string }) => (
              <img
                src={src || "/placeholder.svg"}
                alt={alt || ""}
                style={{ maxWidth: "100%", height: "auto", margin: "1.5rem 0" }}
              />
            ),
            // Enhanced list styling
            ul: ({ children }: { children: ReactNode }) => (
              <ul className="mb-4 space-y-2 text-white list-disc list-inside">{children}</ul>
            ),
            ol: ({ children }: { children: ReactNode }) => (
              <ol className="mb-4 space-y-2 text-white list-decimal list-inside">{children}</ol>
            ),
            li: ({ children }: { children: ReactNode }) => <li className="text-white">{children}</li>,
            // Enhanced blockquote
            blockquote: ({ children }: { children: ReactNode }) => (
              <blockquote className="border-l-4 border-[#B4906D] pl-4 my-6 italic text-gray-300 bg-black/20 py-2 rounded-r">
                {children}
              </blockquote>
            ),
            // Enhanced code blocks
            code: ({ children, className }: { children: ReactNode; className?: string }) => {
              const isInline = !className
              if (isInline) {
                return (
                  <code className="bg-black/30 text-[#fbcea0] px-2 py-1 rounded text-sm font-mono">{children}</code>
                )
              }
              return (
                <code className="block bg-black/50 text-[#fbcea0] p-4 rounded border border-[#B4906D] overflow-x-auto font-mono text-sm">
                  {children}
                </code>
              )
            },
            pre: ({ children }: { children: ReactNode }) => (
              <pre className="bg-black/50 border border-[#B4906D] rounded p-4 overflow-x-auto my-4">{children}</pre>
            ),
            // Enhanced table styling
            table: ({ children }: { children: ReactNode }) => (
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse border border-[#B4906C] rounded-lg">{children}</table>
              </div>
            ),
            th: ({ children }: { children: ReactNode }) => (
              <th className="border border-[#B4906D] bg-black/30 px-4 py-2 text-left text-[#fbcea0] font-bold">
                {children}
              </th>
            ),
            td: ({ children }: { children: ReactNode }) => (
              <td className="border border-[#B4906D] px-4 py-2 text-white">{children}</td>
            ),
            // Text elements
            strong: ({ children }: { children: ReactNode }) => (
              <strong className="text-[#fbcea0] font-bold">{children}</strong>
            ),
            em: ({ children }: { children: ReactNode }) => <em className="text-[#fbcea0] italic">{children}</em>,
          }}
        >
          {cleanedCode}
        </ReactMarkdown>
      </div>
    </article>
  )
}