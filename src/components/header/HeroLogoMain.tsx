import Image from 'next/image'
import vwAvif from '@/assets/avif/vw.avif'
import vwWebp from '@/assets/webp/vw.webp'

interface HeroLogoMainProps {
  widthClasses: string
}

export default function HeroLogoMain({ widthClasses }: HeroLogoMainProps) {
  return (
    <div className={`mx-auto h-auto mb-2 ${widthClasses} select-none animate-slide-up-gentle`}>
      <picture>
        <source srcSet={vwAvif.src} type="image/avif" />
        <Image
          src={vwWebp}
          alt="Vanished Worlds Logo"
          width={1920}
          height={1080}
          draggable={false}
          priority
          placeholder="blur"
          quality={90}
        />
      </picture>
    </div>
  )
} 