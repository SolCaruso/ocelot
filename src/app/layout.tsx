import type { Metadata } from "next"
import "./globals.css"
import { montserrat, inter } from '@/fonts'
import Nav from "@/components/nav/Nav"  
import Footer from '@/components/footer/Footer';
import { Toaster } from '@/components/ui/sonner'

import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Guild Saga",
  description: "Guild Saga Official Website, Ocelot Technologies .Ltd",
  other: {
    'viewport': 'width=device-width, initial-scale=1',
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