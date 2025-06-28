import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const screenshots = Array.from({ length: 9 }).map((_, i) => `/webp/Screenshot${i + 1}.webp`)

export default function Screenshots() {
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
          >
            <CarouselContent className="-ml-4">
              {screenshots.map((src, index) => (
                <CarouselItem key={index} className="pl-4 basis-[700px]">
                  <div className="relative">
                    <Image
                      src={src}
                      alt={`Screenshot ${index + 1}`}
                      width={700}
                      height={394}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}