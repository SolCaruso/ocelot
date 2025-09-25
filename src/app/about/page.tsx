import type { Metadata } from "next"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Ocelot Technologies, an independent game development studio creating expansive RPG worlds.",
  keywords: ["about", "game development", "RPG", "Ocelot Technologies", "Ontario", "Canada"],
  openGraph: {
    title: "About Us - Ocelot Technologies",
    description: "Learn about Ocelot Technologies, an independent game development studio creating expansive RPG worlds.",
    images: [
      {
        url: '/webp/vw.webp',
        width: 1200,
        height: 630,
        alt: 'Ocelot Technologies About',
      },
    ],
  },
  twitter: {
    title: "About Us - Ocelot Technologies",
    description: "Learn about Ocelot Technologies, an independent game development studio creating expansive RPG worlds.",
    images: ['/webp/vw.webp'],
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <section className="relative mx-auto px-6 pt-22 md:pt-42 md:pb-52 pb-32 bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
      <Container>
        <div className="max-w-4xl mx-auto mt-12 text-white">
          <h1 
            className="bg-clip-text text-transparent text-3xl md:text-4xl font-oldFenris mb-12 text-center uppercase"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)',
            }}
          >
            About Us
          </h1>
          
          <div className="prose prose-lg max-w-none text-white">
            <p className="mb-8 leading-relaxed text-white">
              Ocelot Technologies is an independent game development studio based in Ontario, Canada. We focus on creating expansive role-playing worlds where strategy, storytelling, and exploration come together. Our games are built to immerse players in rich RPG experiences that reward creativity and thoughtful decision-making.
            </p>

            <p className="mb-12 leading-relaxed text-white">
              Our adventures are only just beginning, and we look forward to crossing paths with you along the way.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">CONTACT</h2>
            <div className="mb-8 space-y-3">
              <p className="leading-relaxed text-white">
                <strong className="text-white/90">General Inquiries:</strong><br />
                <a href="mailto:info@ocelot.ltd" className="text-[#fbcea0] hover:underline">info@ocelot.ltd</a>
              </p>
              
              <p className="leading-relaxed text-white">
                <strong className="text-white/90">Press & Influencers:</strong><br />
                <a href="mailto:paula@ocelot.ltd" className="text-[#fbcea0] hover:underline">paula@ocelot.ltd</a>
              </p>
              
              <p className="leading-relaxed text-white">
                <strong className="text-white/90">Media Kit:</strong><br />
                <a href="https://drive.google.com/drive/u/1/folders/1Nwqpl_MNZ7hrJl6c7k0pZ89LoroAwq_P" 
                   className="text-[#fbcea0] hover:underline" 
                   target="_blank" 
                   rel="noopener noreferrer">
                  View Media Kit
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
