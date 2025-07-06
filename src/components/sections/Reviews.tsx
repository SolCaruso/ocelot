'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'
import React from 'react';

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
    body: "An RPG that shows immense promise, even in its Early Access stage. I've been thoroughly enjoying my time with it so far and it deserves a solid 5 stars.",
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
        'animate-fade-in relative p-6 opacity-0 transition-all duration-200 ease-[var(--ease-in-out-quad)]',
        'bg-black/20 border border-[#534C3F]/40 text-stone-400',
        'hover:bg-black/50 hover:border-[#B4906C] hover:text-stone-50 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]',
        className,
      )}
      style={{
        animationDelay,
        borderStyle: 'solid',
        borderWidth: '0 1px 1px 1px',
        borderImage: 'linear-gradient(to top, #534C3F, #B4906C) 1',
      }}
      {...props}
    >
      <span className="absolute top-0 left-0 h-[1.2px] w-full z-10" style={{background: 'linear-gradient(to right, #AC8B6A 0%, #ac8b6a68 20%, rgba(172,139,106,0.1) 50%, #ac8b6a52 65%, #AC8B6A 100%)'}} />
      <blockquote>
        <p className="mt-px text-lg/6 font-semibold before:content-['\201C'] after:content-['\201D']">
          {title}
        </p>
        <p className="mt-3 text-base/7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm before:content-['–_']">
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
    <div className='relative overflow-x-clip px-8'>
      {/* <DividerTop /> */}
      <div
        ref={containerRef}
        className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
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
      </div>
      {/* <DividerBottom /> */}
    </div>
  )
}

export default function ReviewSection() {
  return (
    <>
      <h2
        id="reviews-title"
        className="text-3xl font-medium tracking-tight text-center font-oldFenris uppercase text-pretty text-transparent bg-clip-text px-8"
        style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}
      >
        What Guildies are saying
      </h2>
      <p className="mt-6 sm:mt-3 md:text-xl text-stone-50 text-center font-quattrocento text-pretty max-w-xl mx-auto px-8">
        Real reviews from adventurers playing Guild Saga: Vanished Worlds Early Access on Steam.
      </p>
      <ReviewGrid />
    </>
  );
}
