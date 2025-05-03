import Hero from "@/components/header/Hero";
import Trailer from "@/components/sections/Trailer";

export default function Home() {
  return (
    <main>
      <section>
          <Hero className= 'h-[700px] sm:h-[800px] md:h-[900px]' />
      </section>
      <section>
        <Trailer />
      </section>
    </main>
  );
}
