// src/components/updates/BlogImage.tsx
import Image, { ImageProps } from 'next/image'

type BlogImageProps = {
  src: string | null
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
} & Omit<
  ImageProps,
  'src' | 'alt' | 'width' | 'height' | 'fill' | 'className'
>

export default function BlogImage({
  src,
  alt,
  className,
  width = 800,
  height = 600,
  fill = false,
  sizes = "(max-width: 1024px) 100vw, 33vw",
  ...rest
}: BlogImageProps & { sizes?: string }) {
  // If there's no src, render nothing
  if (!src) {
    return null
  }

  // Normalize src: if it's not a full URL or a leading slash, prefix with /jpg/
  let _src = src
  if (!/^https?:\/\//.test(_src) && !_src.startsWith('/')) {
    _src = `/jpg/${_src}`
  }

  return fill ? (
    <Image
      src={_src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      {...rest}
    />
  ) : (
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