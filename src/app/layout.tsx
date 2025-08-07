import type { Metadata } from "next"
import "./globals.css"
import { montserrat, inter } from '@/fonts'
import Nav from "@/components/nav/Nav"  
import Footer from '@/components/footer/Footer';
import { Toaster } from '@/components/ui/sonner'

import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: {
    default: "Guild Saga - Fantasy Tactics RPG",
    template: "%s | Guild Saga"
  },
  description: "Experience tactical turn-based combat in Guild Saga's fantasy RPG games. Vanished Worlds and Labyrinths offer strategic gameplay with Solana blockchain integration.",
  keywords: ["tactical RPG", "turn-based combat", "fantasy game", "strategy game", "Solana blockchain", "gaming", "RPG"],
  authors: [{ name: "Ocelot Technologies Ltd" }],
  creator: "Ocelot Technologies Ltd",
  publisher: "Ocelot Technologies Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://guildsaga.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://guildsaga.com',
    title: 'Guild Saga - Tactical RPG Games',
    description: 'Experience tactical turn-based combat in Guild Saga\'s fantasy RPG games.',
    siteName: 'Guild Saga',
    images: [
      {
        url: '/webp/vw.webp',
        width: 1200,
        height: 630,
        alt: 'Guild Saga - Vanished Worlds',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guild Saga - Tactical RPG Games',
    description: 'Experience tactical turn-based combat in Guild Saga\'s fantasy RPG games.',
    images: ['/webp/vw.webp'],
    creator: '@GuildSaga',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth
      ${montserrat.className} ${montserrat.variable} ${inter.variable}
      `}
    >
      <head>
        <link rel="preload" href="/video/vw-hero.webm" as="video" type="video/webm" />
        <link rel="preload" href="/video/lab-hero.webm" as="video" type="video/webm" />
        <link rel="dns-prefetch" href="//ejktdpjnbhbgmavwltvb.supabase.co" />
      </head>
      <body className="antialiased bg-gs-bg h-screen font-sans">
        <header>
          <Nav />
        </header>
        <main>
          {children}
        </main>  
        <Toaster position="bottom-right" />
        <Footer/>
      </body>
      <SpeedInsights />
    </html>
  )
}