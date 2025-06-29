import Hero from "@/components/header/Hero";
import { SmokeContainer } from "@/components/sections/SmokeContainer";
import { Container } from "@/components/ui/container";
import Characters from "@/components/sections/Characters";
import BlogPreview from "@/components/sections/BlogPreview";
import ReviewSection from "@/components/sections/Reviews";
import Screenshots from "@/components/sections/Screenshots";
import type { Character } from "@/types/character";

const backgroundClasses = "min-h-[280px] sm:min-h-[350px] flex flex-col";

const heroConfig = {
  videoSrc: "/video/vw-hero.mp4",
  logo: {
    src: "/webp/vw.webp",
    alt: "Vanished Worlds Logo",
    widthClasses: "w-[20rem] sm:w-[24rem] lg:w-[30rem]"
  },
  title: "",
  subtitle: "",
  characterIllustration: {
    src: "/webp/persephone.webp",
    alt: "Persephone Character Illustration"
  },
  partners: {
    showSolana: false
  },
  layout: {
    logoPadding: "md:pt-32 pb-32 md:pb-0",
    partnerMargin: "md:mb-8",
    buttonPosition: "mt-4 sm:mt-8",
    buttonSize: "text-sm md:text-xl",
    buttonTop: "68%"
  },
  shadows: {
    topGradient: "bg-gradient-to-b from-black/40 to-black/0",
    bottomGradient: "",
    overlay: "bg-black/0"
  }
};

const characters: Character[] = [
  {
    id: 1,
    name: "ZILLFRED",
    title: "General",
    backstory:
      "House Mazan general and Commander of the respite island Mazan detachment. Father of Persephone, this seasoned military leader commands with unyielding resolve and deep ties to the noble House Mazan. A master tactician who leads with honor.",
    class: "Fighter",
    race: "Human",
    skills: ["Tactical Command", "Defensive Stance"],
    languages: ["Common", "Military Code"],
    background: "Soldier",
    image: "/webp/general.webp",
    backgroundImage: "/webp/bg-general.webp",
    thumbnail: "/webp/general-thumb.webp",
    classIcon: "Sword",
    raceIcon: "Crown",
  },
  {
    id: 2,
    name: "THEVYRE, M.T.",
    title: "Weaver of Time",
    backstory:
      "The enigmatic master of temporal arts who bends the very fabric of time to his will. As the game's primary antagonist, Thevyre's mastery of chronomancy makes him a foe unlike any other. M.T., standing for Magus Temporalis, is a title earned through centuries of manipulating time itself.",
    class: "Wizard",
    race: "Human",
    skills: ["Time Manipulation", "Chronomancy"],
    languages: ["Common", "Ancient Tongues"],
    background: "Sage",
    image: "/webp/thevyre.webp",
    backgroundImage: "/webp/bg-thevyre.webp",
    thumbnail: "/webp/thevyre-thumb.webp",
    classIcon: "Zap",
    raceIcon: "Clock",
  },
  {
    id: 3,
    name: "MOREY",
    title: "Headstrong Pirate",
    backstory:
      "A former pirate with a sharp tongue and sharper wit, Morey now exists as a disembodied head buried beneath the earth. Despite his grim circumstances, his spirit remains unbroken—literally. This undead companion brings comic relief to your journey, though his constant jabs at Luceit might test your patience.",
    class: "Rogue",
    race: "Undead",
    skills: ["Pirate Tactics", "Skeleton Resilience"],
    languages: ["Common", "Pirate Slang"],
    background: "Criminal",
    image: "/webp/morey.webp",
    backgroundImage: "/webp/bg-morey.webp",
    thumbnail: "/webp/morey-thumb.webp",
    classIcon: "Anchor",
    raceIcon: "Skull",
  },
]

export default function Home() {
  return (
    <SmokeContainer>
      <Hero className='h-[600px] md:h-[800px] lg:h-[900px]' config={heroConfig}/>
      <Container>
        <Characters 
          characters={characters}
          backgroundClasses={backgroundClasses}
        />
        <BlogPreview/>
        <ReviewSection/>
        <Screenshots/>
      </Container>
    </SmokeContainer>
  );
}