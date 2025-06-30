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

const screenshots = Array.from({ length: 9 }).map((_, i) => `/webp/Screenshot${i + 1}.webp`)

export default function Screenshots() {
  const [centerIndex, setCenterIndex] = React.useState(Math.floor(screenshots.length / 2))
  const [api, setApi] = React.useState<any>(null)
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

  const dragState = React.useRef<{ startX: number | null, dragging: boolean }>({ startX: null, dragging: false })
  function handleModalMouseDown(e: React.MouseEvent) {
    dragState.current.startX = e.clientX
    dragState.current.dragging = true
  }
  function handleModalMouseUp(e: React.MouseEvent) {
    if (!dragState.current.dragging || dragState.current.startX === null) return
    const dx = e.clientX - dragState.current.startX
    if (dx > 60) {
      setZoomedIndex(idx => idx !== null ? (idx - 1 + screenshots.length) % screenshots.length : null)
    } else if (dx < -60) {
      setZoomedIndex(idx => idx !== null ? (idx + 1) % screenshots.length : null)
    }
    dragState.current.startX = null
    dragState.current.dragging = false
  }
  function handleModalTouchStart(e: React.TouchEvent) {
    dragState.current.startX = e.touches[0].clientX
    dragState.current.dragging = true
  }
  function handleModalTouchEnd(e: React.TouchEvent) {
    if (!dragState.current.dragging || dragState.current.startX === null) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - dragState.current.startX
    if (dx > 60) {
      setZoomedIndex(idx => idx !== null ? (idx - 1 + screenshots.length) % screenshots.length : null)
    } else if (dx < -60) {
      setZoomedIndex(idx => idx !== null ? (idx + 1) % screenshots.length : null)
    }
    dragState.current.startX = null
    dragState.current.dragging = false
  }

  return (
    <div className="my-42 relative">
      <div className="w-[1200px] mx-auto relative">
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
                let cursorClass = "cursor-pointer"
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
      {/* Modal Zoom Overlay */}
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

// ModalCarousel component for zoomed modal with Embla
function ModalCarousel({ screenshots, initialIndex, onClose }: { screenshots: string[]; initialIndex: number; onClose: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
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
        className="overflow-hidden rounded-lg shadow-2xl bg-black/0"
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
              className="min-w-0 shrink-0 grow-0 basis-full flex items-center justify-center"
            >
              <Image
                src={src}
                alt={`Screenshot ${idx + 1}`}
                width={1600}
                height={900}
                className="object-contain w-full h-full rounded-lg"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}