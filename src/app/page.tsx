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
  videoSrc: "/video/vw-hero.webm",
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
    buttonSize: "text-sm md:text-base 3xl:text-xl",
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
        "House Mazan general and Commander of the Respite Island Mazan detachment. Father of Persephone, this seasoned military leader commands with unyielding resolve and deep ties to the noble House Mazan. A master tactician who leads with honor.",
      class: "Warrior",
      race: "Human",
      skills: ["Divide and Conquer", "Defensive Stance"],
      languages: ["Common", "Military Code"],
      background: "Soldier",
      image: "/webp/general.webp",
      backgroundImage: "/webp/bg-general.webp",
      thumbnail: "/webp/general-thumb.webp",
      classIcon: "Sword",
      raceIcon: "Crown"
    },
    {
      id: 2,
      name: "PERSEPHONE",
      title: "Shadowblade Heiress",
      backstory:
        "The daring daughter of General Zillfred, Persephone carries her father's strength alongside a rebellious spirit. With a shadowy past and mysterious skills in poison and dark magic, her eyepatch is a reminder of battles survived—and secrets kept. Her allegiance is unquestioned, but her methods remain her own.",
      class: "Rogue",
      race: "Human",
      skills: ["Shadowstep", "Venomous Blade", "Hex"],
      languages: ["Common", "Thieves' Cant"],
      background: "Spy",
      image: "/webp/persephone.webp",
      backgroundImage: "/webp/bg-persephone.webp",
      thumbnail: "/webp/persephone-thumb.webp",
      classIcon: "Sword",
      raceIcon: "Crown"
    },
    {
      id: 3,
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
      raceIcon: "Anchor"
    },
    {
      id: 4,
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
      raceIcon: "Leaf"
    },
    {
      id: 5,
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
      raceIcon: "Crown"
    },
    {
      id: 6,
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
    {
      id: 7,
      name: "THAL",
      title: "Blade of Twilight",
      backstory:
        "Born between light and darkness, Thal walks the twilight path. With mastery over shadow and steel, Thal’s dual nature lends unparalleled flexibility in combat and espionage. Allies trust Thal’s blade, though few fully understand their intentions or loyalties.",
      class: "Shadowblade",
      race: "Half-Elf",
      skills: ["Twilight Strike", "Cloak of Shadows"],
      languages: ["Common", "Elvish"],
      background: "Outlander",
      image: "/webp/thal.webp",
      backgroundImage: "/webp/bg-thal.webp",
      thumbnail: "/webp/thal-thumb.webp",
      classIcon: "Moon",
      raceIcon: "Leaf"
    },
    {
      id: 8,
      name: "THEVYRE, M.T.",
      title: "Weaver of Time",
      backstory:
        "The enigmatic master of temporal arts who bends the very fabric of time to his will. Thevyre’s mastery of chronomancy makes him a force unlike any other. Bearing the ancient title of M.T., or Magus Temporalis, he has earned his place through centuries of manipulating time itself. Now, he steps forward to guide the party of heroes into the coming battle with the shadows, offering wisdom, power, and a path only he can foresee.",
      class: "Chronomancer",
      race: "Human",
      skills: ["Time Manipulation", "Chronomancy"],
      languages: ["Common", "Ancient Tongues"],
      background: "Sage",
      image: "/webp/thevyre.webp",
      backgroundImage: "/webp/bg-thevyre.webp",
      thumbnail: "/webp/thevyre-thumb.webp",
      classIcon: "Zap",
      raceIcon: "Clock"
    },
    // {
    //   id: 9,
    //   name: "USOR",
    //   title: "Whimsical Auctioneer",
    //   backstory:
    //     "Eccentric and charismatic, Usor commands attention wherever he goes, hosting legendary auctions of rare artifacts and mystical curiosities. His silver tongue can charm the toughest crowd, but behind the whimsy lies a sharp mind, always bartering for secrets as valuable as his merchandise.",
    //   class: "Bard",
    //   race: "Halfling",
    //   skills: ["Charm", "Bargain", "Appraisal"],
    //   languages: ["Common", "Halfling", "Dwarvish"],
    //   background: "Merchant",
    //   image: "/webp/usor.webp",
    //   backgroundImage: "/webp/bg-usor.webp",
    //   thumbnail: "/webp/usor-thumb.webp",
    //   classIcon: "Coins", 
    //   raceIcon: "Flower2"
    // },
    {
      id: 9,
      name: "UNDINE",
      title: "Celestial Envoy",
      backstory:
        "A mysterious figure whose origins are said to be divine, this celestial envoy descends from the heavens at times of great need. Bearing wisdom of the stars and power granted by divine realms, Divine aids heroes with prophecy and celestial magic, guiding them along the paths ordained by fate.",
      class: "Cleric",
      race: "Celestial",
      skills: ["Heavenly Blessing", "Divine Intervention"],
      languages: ["Common", "Celestial"],
      background: "Prophet",
      image: "/webp/undine.webp",
      backgroundImage: "/webp/bg-undine.webp",
      thumbnail: "/webp/undine-thumb.webp",
      classIcon: "Sparkles", 
      raceIcon: "Circle" 
    },
  ]

const vwScreenshots = [
  "/webp/Screenshot1.webp",
  "/webp/Screenshot2.webp",
  "/webp/Screenshot3.webp",
  "/webp/Screenshot4.webp",
  "/webp/Screenshot5.webp",
  "/webp/Screenshot6.webp",
  "/webp/Screenshot7.webp",
  "/webp/Screenshot8.webp",
  "/webp/Screenshot9.webp",
];

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
        <Screenshots images={vwScreenshots} />
      </Container>
    </SmokeContainer>
  );
}