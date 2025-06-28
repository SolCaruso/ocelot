import Hero from "@/components/pages/vw/Hero";
import Trailer from "@/components/sections/Trailer";
import { SmokeContainer } from "@/components/sections/SmokeContainer";
import type { Character } from "@/types/character";

const TrailerSrc = '/webp/persephone.webp';
const characters: Character[] = [
  {
    id: 1,
    name: "PERSEPHONE",
    title: "Shadow Dancer",
    backstory:
      "A mysterious figure who moves through shadows like a whisper, Persephone's mastery of stealth and deception makes her an unpredictable force on the battlefield.",
    class: "Rogue",
    race: "Half-Elf",
    skills: ["Shadow Step", "Poison Strike"],
    languages: ["Common", "Elvish", "Thieves' Cant"],
    background: "Assassin",
    image: "/webp/persephone.webp",
    backgroundImage: "/webp/bg-vanished.webp",
    thumbnail: "/webp/persephone.webp",
    classIcon: "Shield",
    raceIcon: "Leaf",
  },
  {
    id: 2,
    name: "THORIN",
    title: "Iron Guardian",
    backstory:
      "A stalwart defender with unbreakable resolve, Thorin's mastery of heavy armor and defensive tactics makes him an immovable wall against any threat.",
    class: "Paladin",
    race: "Dwarf",
    skills: ["Divine Shield", "Lay on Hands"],
    languages: ["Common", "Dwarvish"],
    background: "Soldier",
    image: "/webp/aska.webp", 
    backgroundImage: "/webp/bg-guild.webp",
    thumbnail: "/webp/aska-thumb.webp",
    classIcon: "Shield",
    raceIcon: "Mountain",
  },
  {
    id: 3,
    name: "SERAPHINA",
    title: "Celestial Healer",
    backstory:
      "Blessed with divine magic, Seraphina channels the power of the heavens to heal allies and smite enemies with radiant energy.",
    class: "Cleric",
    race: "Aasimar",
    skills: ["Healing Word", "Sacred Flame"],
    languages: ["Common", "Celestial"],
    background: "Acolyte",
    image: "/webp/luceit.webp",
    backgroundImage: "/webp/bg-golem.webp",
    thumbnail: "/webp/luceit-thumb.webp", 
    classIcon: "Crown",
    raceIcon: "Droplet",
  },
]

export default function Home() {
  return (
    <main>
        <Hero className= 'h-[600px] md:h-[800px] lg:h-[900px]' />
        <Trailer src={TrailerSrc}/>
        <SmokeContainer characters={characters} />
    </main>
  );
}