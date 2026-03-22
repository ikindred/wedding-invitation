import Image from "next/image";
import { CountdownTimer } from "./CountdownTimer";

type HeroSectionProps = {
  coupleNames: string;
  weddingDateLabel: string;
  countdownTargetIso: string;
  heroImage: { src: string; alt: string };
};

function ScrollDownHint() {
  return (
    <a
      href="#ceremony"
      className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/80 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <span className="text-xs font-medium uppercase tracking-[0.3em]">Scroll</span>
      <span
        className="inline-block h-10 w-6 rounded-full border border-white/40 p-1"
        aria-hidden
      >
        <span className="mx-auto block h-2 w-0.5 animate-bounce rounded-full bg-white/90" />
      </span>
    </a>
  );
}

export function HeroSection({
  coupleNames,
  weddingDateLabel,
  countdownTargetIso,
  heroImage,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-28"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0">
        <div className="hero-image-motion absolute inset-0 scale-105">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <p className="animate-hero-in animate-delay-1 font-[family-name:var(--font-display)] text-sm font-medium uppercase tracking-[0.45em] text-white/90">
          Together with their families
        </p>
        <h1
          id="hero-title"
          className="animate-hero-in animate-delay-2 mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          {coupleNames}
        </h1>
        <p className="animate-hero-in animate-delay-3 mt-6 text-lg text-white/90 sm:text-xl">
          {weddingDateLabel}
        </p>
        <div className="animate-hero-in animate-delay-4 mt-12">
          <CountdownTimer targetIso={countdownTargetIso} />
        </div>
      </div>

      <ScrollDownHint />
    </section>
  );
}
