import type { Metadata } from "next"
import "./globals.css"
import { montserrat } from '@/fonts'
import Nav from "@/components/nav/Nav"  
import Footer from '@/components/footer/Footer';
import { Toaster } from '@/components/ui/sonner'
import SolanaWalletProvider from '@/components/pages/labyrinths/SolanaWalletProvider';

export const metadata: Metadata = {
  title: "Guild Saga",
  description: "Guild Saga Official Website, Ocelot Technologies .Ltd",
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
      ${montserrat.className} ${montserrat.variable}
      `}
    >
      <body className="antialiased bg-gs-bg h-screen font-sans">
        <SolanaWalletProvider>
          <header>
            <Nav />
          </header>
          <main>
            {children}
          </main>  
          <Toaster position="bottom-right" />
          <Footer/>
        </SolanaWalletProvider>
      </body>
    </html>
  )
}