import Hero from "@/components/header/Hero";
import Trailer from "@/components/sections/Trailer";

export default function Home() {
  return (
    <main>
      <section>
          <Hero
            height="900px"
          />
      </section>
      <section>
        <Trailer />
      </section>
    </main>
  );
}
