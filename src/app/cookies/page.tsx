import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import CookiePolicyClient from "./CookiePolicyClient"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Guild Saga games, websites and related services.",
  keywords: ["cookie policy", "cookies", "Guild Saga", "Ocelot Technologies"],
  openGraph: {
    title: "Cookie Policy - Guild Saga",
    description: "Cookie Policy for Guild Saga games, websites and related services.",
    images: [
      {
        url: '/webp/vw.webp',
        width: 1200,
        height: 630,
        alt: 'Guild Saga Cookie Policy',
      },
    ],
  },
  twitter: {
    title: "Cookie Policy - Guild Saga",
    description: "Cookie Policy for Guild Saga games, websites and related services.",
    images: ['/webp/vw.webp'],
  },
  alternates: {
    canonical: '/cookies',
  },
}

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          
          <Suspense fallback={null}>
            <CookiePolicyClient />
          </Suspense>
          <div className="prose prose-lg max-w-none text-white">
            <p className="mb-4 leading-relaxed text-white">
              This Cookie Policy explains how cookies and similar technologies are used in Guild Saga games, websites and related services.
            </p>

            <p className="mb-12 leading-relaxed text-white">
              This policy should be read alongside our Privacy Policy, which explains how we collect, use and protect your personal data.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">WHAT ARE COOKIES?</h2>
            <p className="mb-12 leading-relaxed text-white">
              Cookies are small text files that are stored on your device (computer, tablet or mobile) when you visit a website. They help the website remember information about your visit, which can make it easier to visit the website again and make the site more useful to you.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">TYPES OF COOKIES WE USE</h2>
            
            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">Essential Cookies</h3>
            <p className="mb-8 leading-relaxed text-white">
              These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. Without these cookies, our services cannot be provided.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">Functional Cookies</h3>
            <p className="mb-8 leading-relaxed text-white">
              These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. They may be set by us or by third-party providers whose services we use.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">Performance and Analytics Cookies</h3>
            <p className="mb-8 leading-relaxed text-white">
              These cookies collect information about how you use our website and games, such as which pages you visit and how long you spend on them. This helps us improve our services and understand player behavior patterns.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">Marketing and Advertising Cookies</h3>
            <p className="mb-12 leading-relaxed text-white">
              These cookies are used to deliver advertisements that are more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
            </p>

            <h2 id="manage-cookies" className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">HOW TO MANAGE COOKIES</h2>
            <p className="mb-4 leading-relaxed text-white">
              You can control and manage cookies in various ways:
            </p>
            
            <ul className="mb-8 space-y-2 list-disc list-inside custom-bullet-list">
              <li>Browser settings: Most browsers allow you to view, manage and delete cookies</li>
              <li>Browser plugins: You can install privacy-focused browser extensions</li>
              <li>Opt-out tools: You can use industry opt-out tools for advertising cookies</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">Browser Settings</h3>
            <p className="mb-4 leading-relaxed text-white">
              Here&apos;s how to manage cookies in popular browsers:
            </p>
            
            <ul className="mb-12 space-y-2 list-disc list-inside custom-bullet-list">
              <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
              <li>Firefox: Settings → Privacy & Security → Cookies and Site Data</li>
              <li>Safari: Preferences → Privacy → Manage Website Data</li>
              <li>Edge: Settings → Cookies and site permissions</li>
            </ul>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">IMPACT OF DISABLING COOKIES</h2>
            <p className="mb-12 leading-relaxed text-white">
              Please note that disabling certain cookies may affect the functionality of our website and games. Essential cookies cannot be disabled without impacting core functionality, while disabling other types may limit personalization and analytics capabilities.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">UPDATES TO THIS POLICY</h2>
            <p className="mb-12 leading-relaxed text-white">
              We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make significant changes, we will notify you through appropriate means.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">CONTACT US</h2>
            <p className="mb-4 leading-relaxed text-white">
              If you have any questions about this Cookie Policy, please contact <a href="mailto:info@ocelot.ltd" className="text-[#fbcea0] hover:underline">info@ocelot.ltd</a>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
