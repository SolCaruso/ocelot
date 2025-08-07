import { SafariImage } from '@/components/ui/safari-image'
import vwAvif from '@/assets/avif/vw.avif'
import vwWebp from '@/assets/webp/vw.webp'

interface HeroLogoMainProps {
  widthClasses: string
}

export default function HeroLogoMain({ widthClasses }: HeroLogoMainProps) {
  return (
    <div className={`mx-auto h-auto mb-2 ${widthClasses} select-none animate-slide-up-gentle`}>
      <SafariImage
        avifSrc={vwAvif.src}
        webpSrc={vwWebp.src}
        alt="Vanished Worlds Logo"
        width={1920}
        height={1080}
        draggable={false}
        priority
        quality={90}
      />
    </div>
  )
} 