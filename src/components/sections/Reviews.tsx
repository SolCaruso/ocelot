'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'
import DividerTop from '@/components/ui/divider-top';
import DividerBottom from '@/components/ui/divider-bottom';
import { Container } from '@/components/ui/container'

interface Review {
  title: string
  body: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
}

const reviews: Array<Review> = [
  {
    title: 'Everything so far is great.',
    body: 'Played everything out in Early Access, everything so far is great. Interesting story, fun quests, challenging but rewarding combat. Excited for more content.',
    author: 'stringy hutch',
    rating: 5,
  },
  {
    title: 'Divinity Original Sin vibes.',
    body: 'Very nice cRPG game, with Divinity Original Sin vibes.',
    author: 'Yuumi',
    rating: 5,
  },
  {
    title: 'The graphics are stunning.',
    body: 'An absolute blast to play. The graphics are stunning, the story is engaging and keeps you hooked from start to finish, with just the right amount of twists.',
    author: 'MikiAiko',
    rating: 5,
  },
  {
    title: "One of the greatest indie RPG's on Steam.",
    body: "Only a few hours in, and I can safely say this is one of the greatest indie RPG's to ever grace the Steam Store Page.",
    author: 'Veepee',
    rating: 5,
  },
  {
    title: 'Incredibly detailed and customizable RPG with beautiful art and music.',
    body: 'An incredibly detailed and customizable RPG with beautiful art and music. The game has tons of potential to become part of a great saga.',
    author: 'Vanhelsing',
    rating: 5,
  },
  {
    title: 'I want more.',
    body: 'It manages to scratch that Baldurs Gate itch as well as that FF Tactics itch at the same time. I want more.',
    author: 'Demonic Enterprise',
    rating: 5,
  },
  {
    title: "Can't wait to play the full game",
    body: "Gameplay is like BG3 but with great old school inspired pixel art. Can't wait to play the full game.",
    author: 'Robbie Dagger',
    rating: 5,
  },
  {
    title: 'I love the art style.',
    body: 'Really cool game and I love the art style. Gives ultima vibes.',
    author: '똑똑한',
    rating: 5,
  },
  {
    title: 'A Promising Early Access RPG.',
    body: "An RPG that shows immense promise, even in its Early Access stage. I’ve been thoroughly enjoying my time with it so far and it deserves a solid 5 stars.",
    author: 'DontThatsMyBum',
    rating: 5,
  },
  {
    title: 'Divinity meets Final Fantasy Tactics.',
    body: "It's basically Divinity: Original Sin 2 meets Final Fantasy Tactics.",
    author: 'Rhuzkii',
    rating: 5,
  },
  {
    title: 'Very few games give me the feel this game does.',
    body: 'Very few games give me the feel this game does, and it has been years since I last encountered it.',
    author: 'Rhuvian',
    rating: 5,
  },
  {
    title: 'Combat is addicting.',
    body: 'This game is pretty awesome. Combat is addicting and quests do a good job of engaging you.',
    author: 'DivineBlood',
    rating: 5,
  },
  {
    title: 'The CRPG legend endorses this game.',
    body: 'Insane potential, deserves support, responsive dev, fun character and class variety, valid to wait for full release. The CRPG legend endorses this game.',
    author: 'KingAthena',
    rating: 5,
  },
  {
    title: 'Definitely recommend.',
    body: 'Definitely recommend, everything works very smoothly , combat is actually fun and can be difficult, not the same SUPER predictable combat bs.',
    author: 'The Ninja',
    rating: 5,
  },
]

function StarIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="starGradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="66%" stopColor="#fbcea0" />
          <stop offset="100%" stopColor="#fbcfa0" />
        </linearGradient>
      </defs>
      <path fill="url(#starGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function StarRating({ rating }: { rating: Review['rating'] }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          className={rating > index ? 'h-5 w-5' : 'h-5 w-5 text-stone-400'}
          fill={rating > index ? 'url(#starGradient)' : undefined}
        />
      ))}
    </div>
  )
}

function Review({
  title,
  body,
  author,
  rating,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'figure'>, keyof Review> & Review) {
  const animationDelay = useMemo(() => {
    const possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-lg bg-[#101010] p-6 opacity-0 border border-[#222222]',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-stone-50">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg/6 font-semibold before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base/7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-stone-400 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  )
}

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = []
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: Array<Review>
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}) {
  const columnRef = useRef<React.ElementRef<'div'>>(null)
  const [columnHeight, setColumnHeight] = useState(0)
  const duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) {
      return
    }

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  )
}

function ReviewGrid() {
  const containerRef = useRef<React.ElementRef<'div'>>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.4 })
  const columns = splitArray(reviews, 3)
  const column1 = columns[0]
  const column2 = columns[1]
  const column3 = splitArray(columns[2], 2)

  return (
    <div className='relative overflow-x-clip'>
      <DividerTop />
      <div
        ref={containerRef}
        className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
      >
        {isInView && (
          <>
            <ReviewColumn
              reviews={[...column1, ...column3.flat(), ...column2]}
              reviewClassName={(reviewIndex) =>
                clsx(
                  reviewIndex >= column1.length + column3[0].length &&
                    'md:hidden',
                  reviewIndex >= column1.length && 'lg:hidden',
                )
              }
              msPerPixel={10}
            />
            <ReviewColumn
              reviews={[...column2, ...column3[1]]}
              className="hidden md:block"
              reviewClassName={(reviewIndex) =>
                reviewIndex >= column2.length ? 'lg:hidden' : ''
              }
              msPerPixel={15}
            />
            <ReviewColumn
              reviews={column3.flat()}
              className="hidden lg:block"
              msPerPixel={10}
            />
          </>
        )}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-22 bg-gradient-to-b from-gs-bg to-transparent mx-4" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gs-bg to-transparent mx-4"/>
      </div>
      <DividerBottom />
    </div>
  )
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pt-24 pb-32 sm:pt-32 sm:pb-50 relative bg-[url('/jpg/smoke.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight  text-center font-oldFenris uppercase text-pretty mt-8 text-transparent bg-clip-text"
          style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}
        >
          What Guildies are saying
        </h2>
        <p className="mt-6 sm:mt-3 text-xl text-stone-50 text-center font-quattrocento text-pretty max-w-xl mx-auto">
          Real reviews from adventurers playing Guild Saga: Vanished Worlds Early Access on Steam.
        </p>
        <ReviewGrid />
      </Container>
    </section>
  )
}
