'use client'

import { Container } from '@/components/ui/container'
import Characters from '@/components/sections/Characters'
import BlogPreview from './BlogPreview'
import Screenshots from './Screenshots'
import { ReviewGrid } from './Reviews'
import type { Character } from '@/types/character'

interface SmokeContainerProps {
  characters: Character[]
}

export function SmokeContainer({ characters }: SmokeContainerProps) {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pt-24 pb-32 sm:pt-32 sm:pb-50 relative bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden"
    >
      <Container>
        <Characters characters={characters} />
        <BlogPreview />
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-center font-oldFenris uppercase text-pretty mt-8 text-transparent bg-clip-text px-8"
          style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}
        >
          What Guildies are saying
        </h2>
        <p className="mt-6 sm:mt-3 md:text-xl text-stone-50 text-center font-quattrocento text-pretty max-w-xl mx-auto px-8">
          Real reviews from adventurers playing Guild Saga: Vanished Worlds Early Access on Steam.
        </p>
        
        <ReviewGrid />
        <Screenshots />
      </Container>
    </section>
  )
}
