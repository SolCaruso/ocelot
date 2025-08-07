// src/components/updates/BlogImage.tsx
import { SafariImage } from '@/components/ui/safari-image'
import postAvif from '@/assets/avif/post.avif'
import postWebp from '@/assets/webp/post.webp'
import post1Avif from '@/assets/avif/post1.avif'
import post1Webp from '@/assets/webp/post1.webp'
import post2Avif from '@/assets/avif/post2.avif'
import post2Webp from '@/assets/webp/post2.webp'
import post3Avif from '@/assets/avif/post3.avif'
import post3Webp from '@/assets/webp/post3.webp'
import { ImageProps } from 'next/image'

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

  // Determine which fallback image to use based on the src
  let avifSrc = postAvif.src
  let webpSrc = postWebp.src

  if (_src.includes('post1')) {
    avifSrc = post1Avif.src
    webpSrc = post1Webp.src
  } else if (_src.includes('post2')) {
    avifSrc = post2Avif.src
    webpSrc = post2Webp.src
  } else if (_src.includes('post3')) {
    avifSrc = post3Avif.src
    webpSrc = post3Webp.src
  }

  // For external URLs, use the original src
  if (/^https?:\/\//.test(_src)) {
    return fill ? (
      <SafariImage
        avifSrc={_src}
        webpSrc={_src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority
        placeholder="blur"
        quality={60}
        {...rest}
      />
    ) : (
      <SafariImage
        avifSrc={_src}
        webpSrc={_src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority
        placeholder="blur"
        quality={60}
        {...rest}
      />
    )
  }

  return fill ? (
    <SafariImage
      avifSrc={avifSrc}
      webpSrc={webpSrc}
      alt={alt}
      fill
      sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      className={className}
      priority
      placeholder="blur"
      quality={60}
      {...rest}
    />
  ) : (
    <SafariImage
      avifSrc={avifSrc}
      webpSrc={webpSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
      placeholder="blur"
      quality={60}
      {...rest}
    />
  )
}