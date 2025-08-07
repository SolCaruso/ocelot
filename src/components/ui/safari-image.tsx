"use client"

import Image from 'next/image';
import { useSafariImage } from '@/hooks/useSafariImage';
import { ComponentProps } from 'react';

interface SafariImageProps extends Omit<ComponentProps<typeof Image>, 'src'> {
  avifSrc: string;
  webpSrc: string;
  alt: string;
}

export function SafariImage({ avifSrc, webpSrc, alt, ...props }: SafariImageProps) {
  const { isSafari, safariSrc, modernSrc, fallbackSrc } = useSafariImage(avifSrc, webpSrc);

  // Remove placeholder="blur" if no blurDataURL is provided
  const { placeholder, blurDataURL, fill, sizes, ...otherProps } = props;
  const imageProps = placeholder === "blur" && !blurDataURL 
    ? { ...otherProps } 
    : { placeholder, blurDataURL, ...otherProps };

  // Ensure sizes prop is provided when using fill
  const finalProps = fill 
    ? { ...imageProps, fill, sizes: sizes || "100vw" }
    : { ...imageProps, fill, sizes };

  // For Safari, use WebP directly
  if (isSafari) {
    return (
      <Image
        src={safariSrc}
        alt={alt}
        quality={60}
        {...finalProps}
      />
    );
  }

  // For other browsers, use AVIF with WebP fallback
  return (
    <picture>
      <source srcSet={modernSrc} type="image/avif" />
      <Image
        src={fallbackSrc}
        alt={alt}
        quality={60}
        {...finalProps}
      />
    </picture>
  );
}
