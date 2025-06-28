"use client"

import { useRef } from "react"
import type { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import ShareButtons from "./ShareButtons"
import { useYouTubeEmbeds } from "@/hooks/useYouTubeEmbeds"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Image from "next/image"

// Function to clean markdown content - remove frontmatter
function cleanMarkdownContent(content: string): string {
  // Remove YAML frontmatter (everything between --- lines at the start)
  const frontmatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n/;
  let cleaned = content.replace(frontmatterRegex, "").trim();

  // Remove the first # Heading (h1) if present
  cleaned = cleaned.replace(/^# .*(\n|$)/, "");

  return cleaned.trim();
}

// Helper function to format date as UTC
function formatDateUTC(dateString: string): string {
  try {
    const date = new Date(dateString + 'T00:00:00Z');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  } catch {
    return dateString;
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

  // Use the custom hook for YouTube embeds
  useYouTubeEmbeds(contentRef, cleanedCode)

  return (
    <article className="relative max-w-4xl mx-auto py-8">
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
              <BreadcrumbPage>{date && formatDateUTC(date)}</BreadcrumbPage>
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
              <h1 className="text-3xl font-medium mb-6 mt-8 text-[#fbcea0] font-quattrocento">{children}</h1>
            ),
            h2: ({ children }: { children: ReactNode }) => (
              <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">{children}</h2>
            ),
            h3: ({ children }: { children: ReactNode }) => (
              <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">{children}</h3>
            ),
            h4: ({ children }: { children: ReactNode }) => (
              <h4 className="text-lg font-medium mb-2 mt-4 text-[#fbcea0] font-quattrocento">{children}</h4>
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
                  className="text-[#fbcea0] hover:text-white underline transition-colors"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {children}
                </Link>
              )
            },
            // Enhanced image component
            img: ({ src, alt }: { src?: string; alt?: string }) => (
              <Image
                src={src || "/placeholder.svg"}
                alt={alt || ""}
                width={800}
                height={600}
                style={{ maxWidth: "100%", height: "auto", margin: "1.5rem 0" }}
              />
            ),
            // Enhanced list styling
            ul: ({ children }: { children: ReactNode }) => (
              <ul className="mb-4 space-y-2 list-disc list-inside custom-bullet-list">{children}</ul>
            ),
            ol: ({ children }: { children: ReactNode }) => (
              <ol className="mb-4 space-y-2 list-decimal list-inside pl-4 custom-bullet-list">{children}</ol>
            ),
            li: ({ children }: { children: ReactNode }) => <li>{children}</li>,
            // Enhanced blockquote
            blockquote: ({ children }: { children: ReactNode }) => (
              <blockquote className="border-l-4 border-[#B4906D] pl-4 my-6 italic text-gray-300 bg-black/20 py-2 rounded-r font-quattrocento">
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
              <strong className="text-[#fbcea0] font-semibold">{children}</strong>
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