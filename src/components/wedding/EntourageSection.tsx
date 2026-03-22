import { ScrollReveal } from "./ScrollReveal";
import { SectionTitle } from "./SectionTitle";

type Group = { category: string; names: string[] };

type EntourageSectionProps = {
  groups: Group[];
};

export function EntourageSection({ groups }: EntourageSectionProps) {
  const headingId = "entourage-heading";
  return (
    <section
      id="entourage"
      className="scroll-mt-24 bg-card/30 px-6 py-20 sm:py-28"
      aria-labelledby={headingId}
    >
      <ScrollReveal>
        <SectionTitle
          id={headingId}
          eyebrow="Wedding party"
          title="Entourage"
          subtitle="Our family and friends standing with us on this day."
        />
        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {groups.map((g) => (
            <details
              key={g.category}
              className="group rounded-2xl border border-border-soft bg-card p-2 shadow-sm open:shadow-[var(--shadow-soft)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 font-[family-name:var(--font-display)] text-lg font-semibold text-foreground marker:content-none">
                <span>{g.category}</span>
                <span
                  className="text-accent transition group-open:rotate-180"
                  aria-hidden
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <ul className="space-y-2 border-t border-border-soft px-5 pb-5 pt-2 text-muted">
                {g.names.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
