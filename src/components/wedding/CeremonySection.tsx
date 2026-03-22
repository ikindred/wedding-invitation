import { ScrollReveal } from "./ScrollReveal";
import { SectionTitle } from "./SectionTitle";

type CeremonySectionProps = {
  title: string;
  churchName: string;
  addressLines: string[];
  dateLabel: string;
  timeLabel: string;
};

function IconChurch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L4 9v11h16V9l-8-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}

export function CeremonySection({
  title,
  churchName,
  addressLines,
  dateLabel,
  timeLabel,
}: CeremonySectionProps) {
  const headingId = "ceremony-heading";
  return (
    <section
      id="ceremony"
      className="scroll-mt-24 px-6 py-20 sm:py-28"
      aria-labelledby={headingId}
    >
      <ScrollReveal>
        <SectionTitle
          id={headingId}
          eyebrow="Ceremony"
          title={title}
          subtitle="We would be honored to have you witness our vows."
        />
        <div className="mx-auto mt-14 max-w-2xl text-center">
          <div className="flex justify-center">
            <span className="inline-flex rounded-full bg-accent-soft/80 p-4 text-accent">
              <IconChurch className="h-8 w-8" />
            </span>
          </div>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground">
            {churchName}
          </h3>
          <address className="mt-5 not-italic text-muted">
            <IconPin className="mx-auto mb-2 h-5 w-5 text-accent" />
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <div className="mt-12 grid gap-8 border-t border-border-soft pt-10 sm:grid-cols-2">
            <div>
              <IconClock className="mx-auto mb-2 h-6 w-6 text-accent" />
              <p className="text-xs font-medium uppercase tracking-widest text-muted">Date</p>
              <p className="mt-1 text-lg font-medium text-foreground">{dateLabel}</p>
            </div>
            <div>
              <IconClock className="mx-auto mb-2 h-6 w-6 text-accent" />
              <p className="text-xs font-medium uppercase tracking-widest text-muted">Time</p>
              <p className="mt-1 text-lg font-medium text-foreground">{timeLabel}</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
