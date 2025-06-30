"use client"
import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import useEmblaCarousel from "embla-carousel-react"
import SvgComponent from "@/components/ui/corner"
import Frame from "@/components/ui/frame"

const screenshots = Array.from({ length: 9 }).map((_, i) => `/webp/Screenshot${i + 1}.webp`)

export default function Screenshots() {
  const [centerIndex, setCenterIndex] = React.useState(Math.floor(screenshots.length / 2))
  const [api, setApi] = React.useState<ReturnType<typeof useEmblaCarousel>[1] | null>(null)
  const [zoomed, setZoomed] = React.useState(false)
  const [zoomedIndex, setZoomedIndex] = React.useState<number | null>(null)

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
    if (zoomed) setZoomedIndex(centerIndex)
    else setZoomedIndex(null)
  }, [zoomed, centerIndex])

  return (
    <div className="my-42 relative">
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
                let borderStyle = {}
                
                if (index === (centerIndex - 1 + screenshots.length) % screenshots.length) {
                  onClick = () => api && api.scrollPrev()
                  opacityClass = "opacity-50 hover:opacity-80 transition-opacity duration-300 border-2 border-transparent"
                } else if (index === (centerIndex + 1) % screenshots.length) {
                  onClick = () => api && api.scrollNext()
                  opacityClass = "opacity-50 hover:opacity-80 transition-opacity duration-300 border-2 border-transparent"
                } else if (index === centerIndex) {
                  onClick = () => setZoomed(true)
                  opacityClass = "border-2 border-transparent hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
                  borderStyle = {
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderImage: 'linear-gradient(to top, #534C3F, #B4906C) 1',
                    borderColor: 'transparent',
                  }
                }
                return (
                  <CarouselItem key={index} className="pl-4 basis-[700px]">
                    <div className={`${cursorClass} ${opacityClass} overflow-hidden relative`} onClick={onClick} style={borderStyle}>
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
                        className={`object-cover w-full h-full transition-transform duration-300 ${index === centerIndex ? '' : ''}`}
                        draggable={false}
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
      {zoomed && zoomedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-colors duration-300"
          onClick={() => setZoomed(false)}
        >
          {/* Modal Embla Carousel */}
          <ModalCarousel
            screenshots={screenshots}
            initialIndex={zoomedIndex}
            onClose={() => setZoomed(false)}
          />
        </div>
      )}
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
                  className="w-full relative bg-black/20 border border-[#534C3F]/40"
                  style={{
                    borderStyle: 'solid',
                    borderWidth: '0 1px 1px 1px',
                    borderImage: 'linear-gradient(to top, #534C3F, #B4906C) 1',
                  }}
                >
                  <span className="absolute top-0 left-0 h-[1.2px] w-full z-10" style={{background: 'linear-gradient(to right, #AC8B6A 0%, #ac8b6a68 20%, rgba(172,139,106,0.1) 50%, #ac8b6a52 65%, #AC8B6A 100%)'}} />
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
  )
}

// ModalCarousel component for zoomed modal with Embla
function ModalCarousel({ screenshots, initialIndex, onClose }: { screenshots: string[]; initialIndex: number; onClose: () => void }) {
  const [emblaRef] = useEmblaCarousel({
    startIndex: initialIndex,
    loop: true,
    dragFree: false,
    containScroll: 'trimSnaps',
  })
  React.useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    function handleScroll() {
      onClose()
    }
    window.addEventListener('keydown', handleKey)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [onClose])
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div
        ref={emblaRef}
        className="overflow-hidden shadow-2xl bg-black/0"
        style={{ 
          cursor: 'zoom-out',
          width: '80vw',
          height: 'calc(80vw * 9 / 16)',
          maxHeight: '80vh'
        }}
        onClick={e => { e.stopPropagation(); onClose(); }}
      >
        <div className="flex h-full">
          {screenshots.map((src, idx) => (
            <div
              key={idx}
              className="min-w-0 shrink-0 grow-0 basis-full flex items-center justify-center h-full"
            >
              <div 
                className="w-full h-full flex items-center justify-center"
              >
                <div 
                  className="relative w-full max-w-[2133px] aspect-[16/9] bg-black/20 border border-[#534C3F]/40 flex items-center justify-center"
                  style={{
                    borderStyle: 'solid',
                    borderWidth: '0 1px 1px 1px',
                    borderImage: 'linear-gradient(to top, #534C3F, #B4906C) 1',
                  }}
                >
                  <span className="absolute top-0 left-0 h-[1.2px] w-full z-10" style={{background: 'linear-gradient(to right, #AC8B6A 0%, #ac8b6a68 20%, rgba(172,139,106,0.1) 50%, #ac8b6a52 65%, #AC8B6A 100%)'}} />
                  {/* Top Left Corner */}
                  <div className="absolute top-0 left-0 z-10 scale-x-[-1]">
                    <SvgComponent className="w-24 h-24" />
                  </div>
                  {/* Top Right Corner */}
                  <div className="absolute top-0 right-0 z-10">
                    <SvgComponent className="w-24 h-24" />
                  </div>
                  {/* Bottom Left Corner */}
                  <div className="absolute bottom-0 left-0 z-10 scale-x-[-1] scale-y-[-1]">
                    <SvgComponent className="w-24 h-24" />
                  </div>
                  {/* Bottom Right Corner */}
                  <div className="absolute bottom-0 right-0 z-10 scale-y-[-1]">
                    <SvgComponent className="w-24 h-24" />
                  </div>
                  <Image
                    src={src}
                    alt={`Screenshot ${idx + 1}`}
                    fill
                    className="object-contain w-full h-full"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}