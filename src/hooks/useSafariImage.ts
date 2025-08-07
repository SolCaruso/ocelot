
import { useSafari } from './useSafari';

export function useSafariImage(avifSrc: string, webpSrc: string) {
  const isSafari = useSafari();
  
  // For Safari, use WebP directly. For other browsers, use AVIF with WebP fallback
  return {
    isSafari,
    safariSrc: webpSrc,
    modernSrc: avifSrc,
    fallbackSrc: webpSrc
  };
}
