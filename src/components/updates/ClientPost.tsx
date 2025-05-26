"use client"

import type React from "react"
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

// Function to detect and convert YouTube URLs to embed URLs
function getYouTubeEmbedUrl(url: string): string | null {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(youtubeRegex)
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`
  }
  return null
}

// Function to check if URL is an image
function isImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url)
}

// Function to clean markdown content - remove frontmatter
function cleanMarkdownContent(content: string): string {
  // Remove YAML frontmatter (everything between --- lines at the start)
  const frontmatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n/
  const cleaned = content.replace(frontmatterRegex, "")

  // Also remove any title/date/summary lines that might be at the top
  const lines = cleaned.split("\n")
  const filteredLines = lines.filter((line) => {
    const trimmed = line.trim()
    return !(
      trimmed.startsWith("title:") ||
      trimmed.startsWith("date:") ||
      trimmed.startsWith("summary:") ||
      trimmed === "---"
    )
  })

  return filteredLines.join("\n").trim()
}

// Type guard to check if children is a React element with href prop
function hasHrefProp(children: ReactNode): children is React.ReactElement<{ href: string }> {
  return (
    typeof children === "object" &&
    children !== null &&
    "props" in children &&
    typeof (children as React.ReactElement).props === "object" &&
    (children as React.ReactElement).props !== null &&
    typeof (children as React.ReactElement<{ href: string }>).props.href === "string"
  )
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
  // Clean the markdown content
  const cleanedCode = cleanMarkdownContent(code)

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

      <div className="prose prose-lg max-w-none text-white">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom heading components with better sizing
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
            // Custom paragraph with better spacing
            p: ({ children }: { children: ReactNode }) => {
              // Check if children contains only a link that should be rendered as media
              if (hasHrefProp(children)) {
                const href = children.props.href
                const youtubeEmbedUrl = getYouTubeEmbedUrl(href)

                if (youtubeEmbedUrl) {
                  return (
                    <div className="my-6">
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <iframe
                          src={youtubeEmbedUrl}
                          title="YouTube video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    </div>
                  )
                }

                if (isImageUrl(href)) {
                  return (
                    <div className="my-6">
                      <img
                        src={href || "/placeholder.svg"}
                        alt="Content image"
                        className="rounded-lg w-full h-auto max-w-full"
                      />
                    </div>
                  )
                }
              }

              return <p className="mb-4 leading-relaxed text-white">{children}</p>
            },
            // Enhanced link component - simplified to avoid nesting issues
            a: ({ href, children }: { href?: string; children: ReactNode }) => {
              if (!href) return <span className="text-white">{children}</span>

              // Regular link - no special handling here to avoid nesting issues
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
            img: ({ src, alt }: { src?: string; alt?: string }) => {
              if (!src) return null
              return (
                <span className="block my-6">
                  <img
                    src={src || "/placeholder.svg"}
                    alt={alt || "Content image"}
                    className="rounded-lg w-full h-auto max-w-full"
                  />
                </span>
              )
            },
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
