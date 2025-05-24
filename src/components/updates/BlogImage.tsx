// src/components/blog/BlogImage.tsx
import Image, { ImageProps } from 'next/image'

type BlogImageProps = {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
} & Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'fill' | 'className'>

export default function BlogImage({
  src,
  alt,
  className,
  width = 800,
  height = 600,
  fill = false,
  ...rest
}: BlogImageProps) {
  // normalize relative paths (e.g. “foo.jpg” ⇒ “/jpg/foo.jpg”)
  const _src = src.startsWith('/') ? src : `/jpg/${src}`

  if (fill) {
    return (
      <Image
        src={_src}
        alt={alt}
        fill
        className={className}
        {...rest}
      />
    )
  }

  return (
    <Image
      src={_src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  )
}