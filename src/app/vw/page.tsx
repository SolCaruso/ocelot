import Hero from "@/components/pages/vw/header/Hero";
import Trailer from "@/components/sections/Trailer";
import { Reviews } from "@/components/sections/Reviews";

const TrailerSrc = '/webp/persephone.webp';

export default function Home() {
  return (
    <main>
        <Hero className= 'h-[600px] md:h-[800px] lg:h-[900px]' />
        <Trailer src={TrailerSrc}/>
        <Reviews />
    </main>
  );
}