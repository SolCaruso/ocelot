import Image from 'next/image'
import persephoneAvif from '@/assets/avif/persephone.avif'
import persephoneWebp from '@/assets/webp/persephone.webp'

interface HeroCharacterProps {
  characterSize?: string
  showTrailer?: boolean
}

export default function HeroCharacter({ characterSize, showTrailer }: HeroCharacterProps) {
  return (
    <div className={`absolute bottom-0 z-50 2xl:block hidden select-none animate-slide-in-transform pointer-events-none ${showTrailer === false ? '-right-6 3xl:-right-2' : '-right-12'} ${showTrailer === false ? '' : 'opacity-30 3xl:opacity-100'}`}>
      <picture>
        <source srcSet={persephoneAvif.src} type="image/avif" />
        <Image
          src={persephoneWebp}
          alt="Persephone Character Illustration"
          width={1506}
          height={2000}
          className={`object-contain ${characterSize || `w-[500px] ${showTrailer === false ? '4xl:w-[600px]' : '4xl:w-[700px]'}`}`}
          draggable={false}
          priority
          placeholder="blur"
          quality={90}
        />
      </picture>
    </div>
  )
} 