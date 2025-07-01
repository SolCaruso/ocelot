import Hero from "@/components/header/Hero";
import { SmokeContainer } from "@/components/sections/SmokeContainer";
import { Container } from "@/components/ui/container";
import Screenshots from "@/components/sections/Screenshots";

const heroConfig = {
  videoSrc: "/video/lab-hero.webm",
  logo: {
    src: "/webp/lab.webp",
    alt: "Vanished Worlds Logo",
    widthClasses: "w-[20rem] sm:w-[24rem] lg:w-[30rem]"
  },
  title: "",
  subtitle: "COMING SOON",
  characterIllustration: {
    src: "/webp/thal.webp",
    alt: "Persephone Character Illustration"
  },
  partners: {
    showSolana: true,
    showSteam: false,
  },
  layout: {
    logoPadding: "md:pt-32 md:pb-0",
    partnerMargin: "md:mb-8",
    buttonPosition: "mt-4 sm:mt-8",
    buttonSize: "text-sm md:text-base 3xl:text-xl",
    buttonTop: "68%",
    showButton: false,
    showTrailer: false
  },
  shadows: {
    topGradient: "bg-gradient-to-b from-black/40 to-black/0",
    bottomGradient: "",
    overlay: "bg-black/0"
  }
};

export default function Home() {
  return (
    <SmokeContainer>
      <Hero className='h-[600px] md:h-[800px] lg:h-[900px]' config={heroConfig}/>
      <Container>
        
        <Screenshots/>
      </Container>
    </SmokeContainer>
  );
}