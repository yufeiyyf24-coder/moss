import Link from "next/link";
import { LakeLayer } from "@/components/lake-layer";
import { WindLayer } from "@/components/wind-layer";
import { RippleSurface } from "@/components/ripple-surface";
import { WaterTrail } from "@/components/water-trail";
import { IntroField } from "@/components/intro-field";
import { DomainField } from "@/components/domain-field";
import { MobileScrollFade } from "@/components/mobile-scroll-fade";

export default function Home() {
  return (
    <>
      <LakeLayer />
      <WindLayer />
      <WaterTrail />
      <RippleSurface />

      {/* Top-left logo */}
      <MobileScrollFade>
        <header className="fixed inset-x-0 top-0 z-50 px-6 py-4 sm:px-8 lg:left-10 lg:right-auto lg:top-8 lg:bg-transparent lg:p-0">
          <Link
            href="/"
            className="relative text-lg font-light tracking-tight text-moss-ink/70 transition-[color,opacity] duration-500 hover:text-moss-ink max-lg:duration-300 max-lg:opacity-[var(--header-fade)] sm:text-xl"
          >
            Project Moss
          </Link>
        </header>
      </MobileScrollFade>

      <main className="relative z-0 flex min-h-screen flex-col sm:flex-row">
        {/* Left half — about / intro */}
        <section className="flex min-h-[42vh] flex-col justify-center px-6 pb-4 pt-28 sm:w-[45%] sm:min-h-screen sm:px-8 sm:pb-0 sm:pt-0 lg:px-16">
          <IntroField />
        </section>

        {/* Right half — floating domains */}
        <section className="relative min-h-[58vh] flex-1 px-5 pb-16 pt-2 sm:w-[55%] sm:min-h-screen sm:px-6 sm:py-20">
          <DomainField />
        </section>
      </main>
    </>
  );
}
