import type { Metadata } from "next"
import Hero from "@/components/header/Hero";
import { SmokeContainer } from "@/components/sections/SmokeContainer";
import { Container } from "@/components/ui/container";
import Screenshots from "@/components/sections/Screenshots";
import Faq from "@/components/pages/labyrinths/Faq";
import FaqDivider from "@/components/pages/labyrinths/FaqDivider";
import Usor from "@/components/pages/labyrinths/Usior";

const heroConfig = {
  videoSrc: "/video/lab-hero.webm",
  posterSrc: "/assets/webp/lab-hero-thumb.webp",
  logo: {
    widthClasses: "w-[20rem] sm:w-[25rem] md:w-[29rem] lg:w-[34rem] 3xl:w-[36rem]"
  },
  title: "",
  subtitle: "",
  characterIllustration: {
    src: "/webp/thal.webp",
    alt: "Thal Character Illustration"
  },
  partners: {
    showSolana: true,
    showSteam: false,
  },
  layout: {
    logoPadding: "lg:pt-14 3xl:pt-7 pb-28 md:pt-18",
    partnerMargin: "md:mb-8",
    buttonPosition: "mt-4 sm:mt-8",
    buttonSize: "text-sm md:text-base 3xl:text-xl",
    buttonTop: "68%",
    buttonHueClass: " saturate-200 brightness-110",
    showButton: true,
    buttonLabel: "WISHLIST",
    buttonHref: "https://store.epicgames.com/en-US/p/guild-saga-labyrinths-ca0f96",
    showTrailer: false,
    characterSize: "w-[500px] 3xl:w-[550px] 4xl:w-[650px]"
  },
  shadows: {
    topGradient: "bg-gradient-to-b from-black/40 to-black/0",
    bottomGradient: "",
    overlay: "bg-black/0"
  }
};

const labScreenshots = [
  "/webp/lab-screenshot1.webp",
  "/webp/lab-screenshot2.webp",
  "/webp/lab-screenshot3.webp",
  "/webp/lab-screenshot4.webp",
  "/webp/lab-screenshot5.webp",
  "/webp/lab-screenshot6.webp",
  "/webp/lab-screenshot7.webp",
];

export const metadata: Metadata = {
  title: {
    absolute: "Guild Saga: Labyrinths"
  },
  description: "Guild Saga: Labyrinths combines tactical RPG gameplay with Solana blockchain technology. Experience procedurally generated chambers and blockchain asset integration.",
  keywords: ["Labyrinths", "Solana blockchain", "tactical RPG", "blockchain gaming", "procedural generation", "cryptocurrency gaming", "NFT gaming"],
  openGraph: {
    title: "Guild Saga: Labyrinths - Solana Blockchain RPG",
    description: "Guild Saga: Labyrinths combines tactical RPG gameplay with Solana blockchain technology. Experience procedurally generated chambers and blockchain asset integration.",
    images: [
      {
        url: '/webp/lab.webp',
        width: 1200,
        height: 630,
        alt: 'Guild Saga: Labyrinths',
      },
    ],
  },
  twitter: {
    title: "Guild Saga: Labyrinths - Solana Blockchain RPG",
    description: "Guild Saga: Labyrinths combines tactical RPG gameplay with Solana blockchain technology. Experience procedurally generated chambers and blockchain asset integration.",
    images: ['/webp/lab.webp'],
  },
  alternates: {
    canonical: '/lab',
  },
}

export default function Home() {
  return (
    <SmokeContainer>
      <Hero className='h-[600px] md:h-[800px] lg:h-[900px]' config={heroConfig}/>
      <Container>
        <Usor />
        <FaqDivider className="mt-10"/>
        <Faq />
        <FaqDivider className="mt-10 lg:hidden"/>
        <Screenshots images={labScreenshots} />
      </Container>
    </SmokeContainer>
  );
} 