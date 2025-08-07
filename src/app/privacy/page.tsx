import type { Metadata } from "next"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Guild Saga games, websites and related services.",
  keywords: ["privacy policy", "data protection", "Guild Saga", "Ocelot Technologies"],
  openGraph: {
    title: "Privacy Policy - Guild Saga",
    description: "Privacy Policy for Guild Saga games, websites and related services.",
    images: [
      {
        url: '/webp/vw.webp',
        width: 1200,
        height: 630,
        alt: 'Guild Saga Privacy Policy',
      },
    ],
  },
  twitter: {
    title: "Privacy Policy - Guild Saga",
    description: "Privacy Policy for Guild Saga games, websites and related services.",
    images: ['/webp/vw.webp'],
  },
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-white">
            <p className="mb-4 leading-relaxed text-white">
              This Privacy Policy describes:
            </p>
            <ul className="mb-4 space-y-2 list-disc list-inside custom-bullet-list">
              <li>The ways we collect personal data about you</li>
              <li>Why we collect personal data about you</li>
              <li>How your personal data is used</li>
              <li>How you can customize where and when your data is collected</li>
            </ul>

            <p className="mb-4 leading-relaxed text-white">
              This Privacy Policy applies to Guild Saga games, websites and related services, which we here collectively call the Service. We may update this Privacy Notice from time to time in response to legislative or business changes. When we update our Privacy Notice, we will take appropriate measures to inform you, consistent with the significance of the changes we make. We will obtain your consent to any material Privacy Notice changes if and where this is required by applicable data protection laws.
            </p>

            <p className="mb-12 leading-relaxed text-white">
              If you have any questions or concerns about our use of your personal information, please contact us at <a href="mailto:info@ocelot.ltd" className="text-[#fbcea0] hover:underline">info@ocelot.ltd</a>.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">WHAT DATA DO WE COLLECT?</h2>
            <ul className="mb-12 space-y-2 list-disc list-inside custom-bullet-list">
              <li>Data about your account and game progress</li>
              <li>IP address (General geographic location)</li>
              <li>System specifications (Including mobile device identifiers)</li>
              <li>Browser information</li>
              <li>Gameplay data and your interactions with other players inside the Service</li>
              <li>Social media analytics data</li>
              <li>Data from game platform services such as Steam profile information, game ownership, item inventory</li>
              <li>Data from platforms that the games run on (such as to verify payment)</li>
            </ul>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">WHY DO WE COLLECT THIS DATA?</h2>
            <ul className="mb-4 space-y-2 list-disc list-inside custom-bullet-list">
              <li>Effectively operate game services</li>
              <li>Deliver a responsive website</li>
              <li>Player behavior and historical data</li>
              <li>Provide ongoing game support for all players</li>
              <li>Manage our relationship with you</li>
              <li>Respond to player feedback and suggestions</li>
              <li>Provide security alerts, product updates and news</li>
              <li>Understand how our players as a whole interact with our services</li>
              <li>Provide tools and methods in which to communicate with our players</li>
            </ul>

            <p className="mb-12 leading-relaxed text-white">
              We collect metrics and telemetry data regarding your use of our Services, including how long and how often you play any game. We use this information to help us troubleshoot problems with the Service, to provide player rewards, and to improve the Service and your gaming experience.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">WHO CAN SEE YOUR DATA?</h2>
            <p className="mb-4 leading-relaxed text-white">
              Ocelot Technologies and platforms that you use to access our Services.
            </p>

            <p className="mb-4 leading-relaxed text-white">
              In order to combat fraud and illegal activity, we may exchange data with other companies and organizations and provide it to public authorities in response to lawful requests.
            </p>

            <p className="mb-8 leading-relaxed text-white">
              We may also disclose your data based on your consent, to comply with the law or to protect the rights, property or safety of us, our players or others.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">Anonymized/Aggregated Data</h3>
            <p className="mb-8 leading-relaxed text-white">
              We may share aggregate or de-identified information with third parties for research, marketing, analytics and other purposes, provided such information does not identify a particular individual.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">International Data Transfers</h3>
            <p className="mb-12 leading-relaxed text-white">
              Our Service is global by nature and your data can therefore be transferred to anywhere in the world. Because different countries may have different data protection laws than your own country, we take steps to ensure adequate safeguards are in place to protect your data as explained in this Policy.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">YOUR RIGHTS AND OPTIONS</h2>
            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">Opt-out of marketing emails and other direct marketing</h3>
            <p className="mb-8 leading-relaxed text-white">
              You may opt-out of receiving promotional communications, such as marketing emails from us by following the instructions in such communications. You can always withdraw your consent, for example by clicking the unsubscribe link on an email.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">Opt-out of in-game data collection</h3>
            <p className="mb-8 leading-relaxed text-white">
              If you do not want to share game data with the developers, you can opt out in the in-game settings menu.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">Access the personal data we hold about you</h3>
            <p className="mb-4 leading-relaxed text-white">
              If you request, we will provide you a copy of your personal data in an electronic format.
            </p>

            <p className="mb-12 leading-relaxed text-white">
              You also have the right to correct your data, have your data deleted, object how we use or share your data, and restrict how we use or share your data.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">COOKIES AND SIMILAR TECHNOLOGY</h2>
            <p className="mb-12 leading-relaxed text-white">
              Like most online services, we and our partners use cookies and similar technologies to provide and personalize the Service, analyse use, target advertisements and prevent fraud. You can disable cookies in your browser settings, but some parts of the Service may then not function properly.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">HOW DO WE PROTECT YOUR DATA?</h2>
            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">Security Safeguards</h3>
            <p className="mb-8 leading-relaxed text-white">
              In order to help ensure a secure and safe player experience, we are continuously developing and implementing administrative, technical and physical security measures to protect your data from unauthorized access or against loss, misuse or alteration.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-5 text-[#fbcea0] font-quattrocento">Data retention</h3>
            <p className="mb-12 leading-relaxed text-white">
              Note that if you ask us to remove your personal data, we will retain your data as necessary for our legitimate business interests, such as to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">AGE LIMITS</h2>
            <p className="mb-12 leading-relaxed text-white">
              We do not knowingly collect or solicit personal data about or direct or target interest based advertising to anyone under the age of 13 or knowingly allow such persons to use our Services. If you are under 13, please do not send any data about yourself to us, including your name, address, telephone number, or email address. No one under the age of 13 may provide any personal data. If we learn that we have collected personal data about a child under age 13, we will delete that data as quickly as possible. If you believe that we might have any data from or about a child under the age of 13, please contact us.
            </p>

            <h2 className="text-2xl font-medium mb-4 mt-6 text-[#fbcea0] font-quattrocento">CONTACT US</h2>
            <p className="mb-4 leading-relaxed text-white">
              If you have any questions or concerns about our use of your personal information, or questions about this Policy, please contact <a href="mailto:info@ocelot.ltd" className="text-[#fbcea0] hover:underline">info@ocelot.ltd</a>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
