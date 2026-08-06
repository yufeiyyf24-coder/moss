import { LakeLayer } from "@/components/lake-layer";
import { WindLayer } from "@/components/wind-layer";
import { RippleSurface } from "@/components/ripple-surface";
import { WaterTrail } from "@/components/water-trail";
import { IntroField } from "@/components/intro-field";
import { DomainField } from "@/components/domain-field";

export default function Home() {
  return (
    <>
      <LakeLayer />
      <WindLayer />
      <WaterTrail />
      <RippleSurface />

      {/* Top-left logo */}
      <header className="fixed left-6 top-6 z-50 sm:left-10 sm:top-8">
        <a
          href="/"
          className="text-lg font-light tracking-tight text-moss-ink/70 transition-colors duration-500 hover:text-moss-ink sm:text-xl"
        >
          Project Moss
        </a>
      </header>

      <main className="relative z-0 flex min-h-screen flex-col sm:flex-row">
        {/* Left half — about / intro */}
        <section className="flex min-h-[42vh] flex-col justify-center px-8 pt-24 sm:w-[45%] sm:min-h-screen sm:pt-0 lg:px-16">
          <IntroField />
        </section>

        {/* Right half — floating domains */}
        <section className="relative min-h-[58vh] flex-1 px-6 pb-16 pt-6 sm:w-[55%] sm:min-h-screen sm:py-20">
          <DomainField />
        </section>
      </main>
    </>
  );
}
