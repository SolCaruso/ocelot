import Hero from "@/components/header/Hero";
import Trailer from "@/components/sections/Trailer";
import { SmokeContainer } from "@/components/sections/SmokeContainer";
import type { Character } from "@/types/character";

const TrailerSrc = '/webp/undine.webp'
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
    <main>
        <Hero className= 'h-[600px] md:h-[800px] lg:h-[900px]' />
        <Trailer src={TrailerSrc} />
        <SmokeContainer characters={characters} />
    </main>
  );
}
