import Hero from "@/components/header/Hero";
import { SmokeContainer } from "@/components/sections/SmokeContainer";
import { Container } from "@/components/ui/container";
import Screenshots from "@/components/sections/Screenshots";
import Swap from "@/components/pages/labyrinths/Swap";

const heroConfig = {
  videoSrc: "/video/lab-hero.webm",
  logo: {
    src: "/video/lab.webm",
    alt: "Lab Logo",
    widthClasses: "w-[20rem] md:w-[30rem] lg:w-[36rem]"
  },
  title: "",
  subtitle: "COMING SOON",
  characterIllustration: {
    src: "/webp/thal.webp",
    alt: "Thal Character Illustration"
  },
  partners: {
    showSolana: true,
    showSteam: false,
  },
  layout: {
    logoPadding: "lg:pt-16 pb-20 md:pt-20", 
    partnerMargin: "md:mb-8",
    buttonPosition: "mt-4 sm:mt-8",
    buttonSize: "text-sm md:text-base 3xl:text-xl",
    buttonTop: "68%",
    showButton: false,
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

export default function Home() {
  return (
    <SmokeContainer>
      <Hero className='h-[600px] md:h-[800px] lg:h-[900px]' config={heroConfig}/>
      <Container>
        <Swap/>
        <Screenshots images={labScreenshots} />
      </Container>
    </SmokeContainer>
  );
} 