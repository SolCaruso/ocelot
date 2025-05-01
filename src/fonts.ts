// src/fonts.ts
import localFont from 'next/font/local'
import { Quattrocento, Montserrat } from 'next/font/google'

// 1) Old Fenris (self-hosted)
export const oldFenris = localFont({
  src: [
    {
      path: '../public/fonts/OldFenris-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    // fallback
    {
      path: '../public/fonts/OldFenris-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-old-fenris',
  display: 'swap',
})

// 2) Google fonts
export const quattrocento = Quattrocento({
  subsets: ['latin'],
  weight: ['400','700'],
  variable: '--font-quattrocento',
  display: 'swap',
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400','700'],
  variable: '--font-montserrat',
  display: 'swap',
})