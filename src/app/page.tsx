import Hero from "@/components/header/Hero";
import Trailer from "@/components/sections/Trailer";
import { Reviews } from "@/components/sections/Reviews";

export default function Home() {
  return (
    <main>
        <Hero className= 'h-[700px] sm:h-[800px] md:h-[900px]' />
        <Trailer />
        <Reviews />
    </main>
  );
}
