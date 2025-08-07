import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Third Party Legal Notices",
  description: "Third party legal notices and trademark acknowledgments for Guild Saga.",
  keywords: ["trademarks", "legal notices", "third party", "Guild Saga", "acknowledgments"],
  openGraph: {
    title: "Third Party Legal Notices - Guild Saga",
    description: "Third party legal notices and trademark acknowledgments for Guild Saga.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Third Party Legal Notices - Guild Saga",
    description: "Third party legal notices and trademark acknowledgments for Guild Saga.",
  },
  alternates: {
    canonical: "/trademarks",
  },
};

export default function TrademarksPage() {
  return (
    <main>
      <section className="relative mx-auto px-6 pt-22 md:pt-42 md:pb-52 pb-32 bg-[url('/jpg/smoke.jpg')] bg-fixed bg-center bg-cover overflow-x-hidden">
        <Container>
          <div className="max-w-4xl mx-auto mt-12 text-white">
            <h1 
              className="bg-clip-text text-transparent text-3xl md:text-4xl font-oldFenris mb-12 text-center uppercase"
              style={{
                backgroundImage: "linear-gradient(135deg, #fff, #fbcea0 66%, #fbcfa0)"
              }}
            >
              Third Party Legal Notices
            </h1>
            
            <div className="prose prose-lg max-w-none text-white">
              <p className="mb-12 leading-relaxed text-white">
                Guild Saga incorporates or references various third-party technologies, platforms, and services. The following are trademark acknowledgments and legal notices for these third parties.
              </p>

              <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">PLATFORM TRADEMARKS</h2>
              
              <p className="mb-8 leading-relaxed text-white">
                Steam and the Steam logo are trademarks and/or registered trademarks of Valve Corporation in the United States and/or other countries.
              </p>

              <p className="mb-8 leading-relaxed text-white">
                Epic Games and the Epic Games logo are trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere.
              </p>

              <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">BLOCKCHAIN TECHNOLOGY</h2>
              
              <p className="mb-12 leading-relaxed text-white">
                Solana and the Solana logo are trademarks or registered trademarks of Solana Labs, Inc.
              </p>

              <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">FONT ATTRIBUTION</h2>
              
              <p className="mb-4 leading-relaxed text-white">
                Guild Saga uses custom fonts that require proper attribution:
              </p>

              <p className="mb-8 leading-relaxed text-white">
                Fonts made from <a href="http://www.onlinewebfonts.com" className="text-[#fbcea0] hover:underline" target="_blank" rel="noopener noreferrer">Web Fonts</a> are licensed by CC BY 4.0.
              </p>

              <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">GENERAL DISCLAIMER</h2>
              
              <p className="mb-8 leading-relaxed text-white">
                All trademarks referenced herein are the properties of their respective owners. Guild Saga is not affiliated with, endorsed by, or sponsored by any of the trademark owners mentioned above.
              </p>

              <p className="mb-8 leading-relaxed text-white">
                The use of these trademarks does not imply any affiliation with or endorsement by the trademark owners. These acknowledgments are provided to ensure proper attribution and compliance with applicable trademark laws.
              </p>

              <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">CONTACT US</h2>
              
              <p className="mb-4 leading-relaxed text-white">
                If you have any questions about these third party legal notices or trademark acknowledgments, please contact <a href="mailto:info@ocelot.ltd" className="text-[#fbcea0] hover:underline">info@ocelot.ltd</a>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
