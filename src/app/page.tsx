import Hero from "@/components/header/Hero";
import Trailer from "@/components/sections/Trailer";
import { Reviews } from "@/components/sections/Reviews";

export default function Home() {
  return (
    <main>
        <Hero className= 'h-[700px] md:h-[800px] lg:h-[900px]' />
        <Trailer />
        <Reviews />
    </main>
  );
}
