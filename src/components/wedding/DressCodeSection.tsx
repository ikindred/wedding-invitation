import { ScrollReveal } from "./ScrollReveal";
import { SectionTitle } from "./SectionTitle";
import { ColorPalette } from "./ColorPalette";

type DressCodeSectionProps = {
  themeHeadline: string;
  themeDescription: string;
  colors: { name: string; hex: string }[];
  guestAttire: { title: string; lines: string[] };
  sponsorAttire: { title: string; lines: string[] };
};

export function DressCodeSection({
  themeHeadline,
  themeDescription,
  colors,
  guestAttire,
  sponsorAttire,
}: DressCodeSectionProps) {
  const headingId = "dress-heading";
  return (
    <section
      id="dress-code"
      className="scroll-mt-24 px-6 py-20 sm:py-28"
      aria-labelledby={headingId}
    >
      <ScrollReveal>
        <SectionTitle
          id={headingId}
          eyebrow="Attire & palette"
          title={themeHeadline}
          subtitle={themeDescription}
        />
        <div className="mx-auto mt-14 max-w-3xl">
          <ColorPalette colors={colors} />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <article className="rounded-3xl border border-border-soft bg-card p-8 shadow-[var(--shadow-soft)]">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
                {guestAttire.title}
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {guestAttire.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-border-soft bg-accent-soft/40 p-8 shadow-[var(--shadow-soft)]">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
                {sponsorAttire.title}
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {sponsorAttire.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
