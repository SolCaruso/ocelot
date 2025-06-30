import Hero from "@/components/header/Hero";
import { SmokeContainer } from "@/components/sections/SmokeContainer";
import { Container } from "@/components/ui/container";
import Characters from "@/components/sections/Characters";
import ReviewSection from "@/components/sections/Reviews";
import type { Character } from "@/types/character";

const backgroundClasses = "min-h-[230px] sm:min-h-[300px] flex flex-col";

const heroConfig = {
  videoSrc: "/video/hero.webm",
  logo: {
    src: "/webp/guildsaga.webp",
    alt: "Guild Saga Logo",
    widthClasses: "w-[20rem] sm:w-[24rem] lg:w-[35rem]"
  },
  title: "EARLY ACCESS \n AVAILABLE NOW",
  subtitle: "FANTASY RPG",
  characterIllustration: {
    src: "/webp/undine.webp",
    alt: "Character Illustration"
  },
  partners: {
    showSolana: true
  },
  layout: {
    logoPadding: "md:pt-44 pb-26 md:pb-0",
    partnerMargin: "md:mb-8",
    buttonPosition: "",
    buttonSize: "text-sm md:text-base 3xl:text-xl",
    buttonTop: "68%"
  },
  shadows: {
    topGradient: "bg-gradient-to-b from-black/[36%] via-black/0 to-black/[36%]",
    bottomGradient: "",
    overlay: "bg-black/[30%]"
  }
};

const characters: Character[] = [
  {
    id: 1,
    name: "LEORA",
    title: "Mystic Wanderer",
    backstory:
      "Once a feared pirate sailing treacherous seas, Leora mastered hydromancy to control tides and storms alike. Her prowess in battle and sea magic made her infamous and formidable.",
    class: "Hydromancer",
    race: "Unknown",
    skills: ["Meteor Strike", "Summon Gem Golem"],
    languages: ["Common", "Aquan"],
    background: "Pirate Captain",
    image: "/webp/leora.webp",
    backgroundImage: "/webp/bg-vanished.webp",
    thumbnail: "/webp/leora-thumb.webp",
    classIcon: "Droplet",
    raceIcon: "Anchor",
  },
  {
    id: 2,
    name: "ASKA",
    title: "Stone Sage",
    backstory:
      "A devoted geomancer, Aska commands the earth itself, shaping terrain and summoning protective stone golems to guard allies and crush foes.",
    class: "Geomancer",
    race: "Elf",
    skills: ["Duel", "Forceful Shot"],
    languages: ["Common", "Elvish"],
    background: "Hermit",
    image: "/webp/aska.webp",
    backgroundImage: "/webp/bg-guild.webp",
    thumbnail: "/webp/aska-thumb.webp",
    classIcon: "Mountain",
    raceIcon: "Leaf",
  },
  {
    id: 3,
    name: "LUCEIT",
    title: "Radiant Champion",
    backstory:
      "Clad in radiant armor, Luceit is the epitome of chivalry and valor, leading the charge on the battlefield and inspiring allies with unmatched bravery and resilience.",
    class: "Knight",
    race: "Human",
    skills: ["Vampirism", "Consistent", "Scavenger"],
    languages: ["Common"],
    background: "Noble",
    image: "/webp/luceit.webp",
    backgroundImage: "/webp/bg-golem.webp",
    thumbnail: "/webp/luceit-thumb.webp",
    classIcon: "Shield",
    raceIcon: "Crown",
  },
]

export default function Home() {
  return (
    <SmokeContainer>
      <Hero className='h-[600px] md:h-[800px] lg:h-[900px]' config={heroConfig}>
      </Hero>
      <Container>
        <Characters 
          characters={characters}
          backgroundClasses={backgroundClasses}
        />
        <ReviewSection/>
      </Container>
    </SmokeContainer>
  );
}
