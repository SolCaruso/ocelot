"use client"
import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import useEmblaCarousel from "embla-carousel-react"
import SvgComponent from "@/components/ui/corner"
import Frame from "@/components/ui/frame"

const defaultScreenshots = Array.from({ length: 9 }).map((_, i) => `/webp/Screenshot${i + 1}.webp`)

// Pre-calculate modal dimensions for better performance
const getModalDimensions = () => {
  if (typeof window === 'undefined') return { width: 800, height: 450 }
  
  const vw = window.innerWidth * 0.8
  const vh = window.innerHeight * 0.8
  const aspectRatio = 16 / 9
  
  let width = vw
  let height = vw / aspectRatio
  
  if (height > vh) {
    height = vh
    width = vh * aspectRatio
  }
  
  return { width: Math.min(width, 2133), height }
}

export default function Screenshots({ images }: { images?: string[] }) {
  const screenshots = images ?? defaultScreenshots;
  const [centerIndex, setCenterIndex] = React.useState(Math.floor(screenshots.length / 2))
  const [api, setApi] = React.useState<ReturnType<typeof useEmblaCarousel>[1] | null>(null)
  const [zoomed, setZoomed] = React.useState(false)
  const [zoomedIndex, setZoomedIndex] = React.useState<number | null>(null)
  const [isAnimating, setIsAnimating] = React.useState(false)

  // Debounce zoom state to prevent rapid toggling
  const debouncedSetZoomed = React.useCallback(
    React.useMemo(() => {
      let timeout: NodeJS.Timeout
      return (value: boolean) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => setZoomed(value), 50)
      }
    }, []),
    []
  )

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => {
      const selected = api.selectedScrollSnap()
      setCenterIndex(selected)
    }
    api.on("select", onSelect)
    onSelect()
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  React.useEffect(() => {
    if (zoomed) {
      setZoomedIndex(centerIndex)
      setIsAnimating(true)
    } else {
      setZoomedIndex(null)
      setIsAnimating(false)
    }
  }, [zoomed, centerIndex])

  const handleZoomClick = React.useCallback(() => {
    if (!isAnimating) {
      debouncedSetZoomed(true)
    }
  }, [isAnimating, debouncedSetZoomed])

  return (
    <div className="lg:mb-42 mb-24 lg:mt-34 sm:mt-24 mt-12 relative">
      <h2
        className="text-xl md:text-2xl font-medium tracking-widest md:mb-6 mb-5 font-oldFenris drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] uppercase text-center text-transparent bg-clip-text"
        style={{ backgroundImage: 'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)' }}
      >
        Screenshots
      </h2>
      <div className="relative w-full flex items-center justify-center mb-8">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px w-full z-0"
          style={{
            background: "linear-gradient(90deg, transparent, #fbcea0 20%, #fbcea0 80%, transparent)",
            maskImage: "radial-gradient(ellipse 336px 12px at center, transparent 0%, transparent 60%, black 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 336px 12px at center, transparent 0%, transparent 60%, black 80%)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-80">
          <Frame className="md:scale-50 scale-40" />
        </div>
      </div>
      
      {/* Desktop version (lg and above) */}
      <div className="hidden lg:block w-[1200px] mx-auto relative">
        <div
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
              containScroll: "trimSnaps",
              dragFree: false,
            }}
            className="w-full screenshots-carousel"
            setApi={setApi}
          >
            <CarouselContent className="-ml-4">
              {screenshots.map((src, index) => {
                const cursorClass = "cursor-pointer"
                let onClick = undefined
                let opacityClass = ""
                let borderClass = ""
                
                if (index === (centerIndex - 1 + screenshots.length) % screenshots.length) {
                  onClick = () => api && api.scrollPrev()
                  opacityClass = "opacity-50 hover:opacity-80 transition-opacity duration-300"
                } else if (index === (centerIndex + 1) % screenshots.length) {
                  onClick = () => api && api.scrollNext()
                  opacityClass = "opacity-50 hover:opacity-80 transition-opacity duration-300"
                } else if (index === centerIndex) {
                  onClick = handleZoomClick
                  opacityClass = "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-shadow duration-300"
                  borderClass = "border border-[#B4906C]/60"
                }
                
                return (
                  <CarouselItem key={index} className="pl-4 basis-[700px]">
                    <div className={`${cursorClass} ${opacityClass} ${borderClass} overflow-hidden relative`} onClick={onClick}>
                      {index === centerIndex && (
                        <>
                          {/* Top Left Corner */}
                          <div className="absolute top-0 left-0 z-10 scale-x-[-1] transition-opacity duration-300">
                            <SvgComponent className="w-24 h-24" />
                          </div>
                          {/* Top Right Corner */}
                          <div className="absolute top-0 right-0 z-10 transition-opacity duration-300">
                            <SvgComponent className="w-24 h-24" />
                          </div>
                        </>
                      )}
                      <Image
                        src={src}
                        alt={`Screenshot ${index + 1}`}
                        width={700}
                        height={394}
                        className="object-cover w-full h-full"
                        draggable={false}
                        priority={Math.abs(index - centerIndex) <= 1} // Priority load for visible images
                      />
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* Mobile version (under lg) */}
      <div className="lg:hidden w-full px-0.5">
        <MobileScreenshots screenshots={screenshots} />
      </div>

      {/* Modal Zoom Overlay - only for desktop */}
      <AnimatePresence mode="wait">
        {zoomed && zoomedIndex !== null && (
          <ModalCarousel
            screenshots={screenshots}
            initialIndex={zoomedIndex}
            onClose={() => {
              setIsAnimating(false)
              setZoomed(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Mobile Screenshots component
function MobileScreenshots({ screenshots }: { screenshots: string[] }) {
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps",
  })

  return (
    <div className="w-full xs:px-6.5">
      <div
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
        }}
      >
        <div
          ref={emblaRef}
          className="overflow-hidden"
        >
        <div className="flex">
          {screenshots.map((src, index) => (
            <div
              key={index}
              className="min-w-0 shrink-0 grow-0 basis-full flex items-center justify-center"
            >
              <div className="w-full px-1">
                <div 
                  className="w-full relative bg-black/20 border-t border-b border-r border-l border-[#B4906C]/40"
                >
                  <span className="absolute top-0 left-0 h-[1.2px] w-full z-10 bg-gradient-to-r from-[#AC8B6A] via-[#AC8B6A]/20 to-[#AC8B6A]" />
                  <Image
                    src={src}
                    alt={`Screenshot ${index + 1}`}
                    width={400}
                    height={225}
                    className="object-cover w-full h-auto"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}

// Optimized ModalCarousel component
function ModalCarousel({ screenshots, initialIndex, onClose }: { 
  screenshots: string[]; 
  initialIndex: number; 
  onClose: () => void 
}) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: initialIndex,
    loop: true,
    dragFree: false,
    containScroll: 'trimSnaps',
  })
  
  const modalDimensions = React.useMemo(() => getModalDimensions(), [])
  
  React.useEffect(() => {
    if (!emblaApi) return undefined
    
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap())
    }
    
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') emblaApi?.scrollPrev()
      if (e.key === 'ArrowRight') emblaApi?.scrollNext()
    }
    
    const handleScroll = () => onClose()
    
    window.addEventListener('keydown', handleKey)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [onClose, emblaApi])

  // Only render visible slides + buffer for performance
  const getVisibleSlides = React.useMemo(() => {
    const buffer = 1
    const visibleSlides = new Set()
    
    for (let i = -buffer; i <= buffer; i++) {
      const index = (currentIndex + i + screenshots.length) % screenshots.length
      visibleSlides.add(index)
    }
    
    return visibleSlides
  }, [currentIndex, screenshots.length])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        className="relative select-none"
        style={{
          width: modalDimensions.width,
          height: modalDimensions.height,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 400,
          damping: 25,
          mass: 0.8
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={emblaRef}
          className="overflow-hidden w-full h-full cursor-zoom-out px-12"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
          onClick={onClose}
        >
          <div className="flex h-full">
            {screenshots.map((src, idx) => (
              <div
                key={idx}
                className="min-w-0 shrink-0 grow-0 basis-full flex items-center justify-center h-full mx-6"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div 
                    className="relative w-full h-full border border-[#B4906C]/60"
                  >
                    <span className="absolute top-0 left-0 h-[2px] w-full z-10 bg-gradient-to-r from-[#AC8B6A] via-[#AC8B6A]/30 to-[#AC8B6A]" />
                    
                    {/* Top Left Corner */}
                    <div className="absolute top-0 left-0 z-10 scale-x-[-1]">
                      <SvgComponent className="w-42 h-42" />
                    </div>
                    {/* Top Right Corner */}
                    <div className="absolute top-0 right-0 z-10">
                      <SvgComponent className="w-42 h-42" />
                    </div>
                    
                    {/* Only render images that are visible or adjacent for performance */}
                    {getVisibleSlides.has(idx) && (
                      <Image
                        src={src}
                        alt={`Screenshot ${idx + 1}`}
                        fill
                        className="object-cover"
                        draggable={false}
                        priority={idx === currentIndex}
                        sizes="80vw"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}