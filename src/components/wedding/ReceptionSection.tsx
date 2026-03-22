import { ScrollReveal } from "./ScrollReveal";
import { SectionTitle } from "./SectionTitle";
import { MapEmbed } from "./MapEmbed";

type ReceptionSectionProps = {
  venueName: string;
  addressLines: string[];
  dateLabel: string;
  timeLabel: string;
  mapEmbedUrl: string;
  mapsLink: string;
};

export function ReceptionSection({
  venueName,
  addressLines,
  dateLabel,
  timeLabel,
  mapEmbedUrl,
  mapsLink,
}: ReceptionSectionProps) {
  const headingId = "reception-heading";
  return (
    <section
      id="reception"
      className="scroll-mt-24 bg-card/30 px-6 py-20 sm:py-28"
      aria-labelledby={headingId}
    >
      <ScrollReveal>
        <SectionTitle
          id={headingId}
          eyebrow="Reception"
          title="Celebration"
          subtitle="Dinner, dancing, and toasts — we’d love to celebrate with you."
        />
        <div className="mx-auto mt-14 max-w-3xl">
          <div className="flex justify-center">
            <span className="inline-flex rounded-full bg-accent-soft/80 p-4 text-accent">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 10h16v10H4V10z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M8 10V6h8v4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </div>
          <h3 className="mt-3 text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground">
            {venueName}
          </h3>
          <address className="mt-5 text-center not-italic text-muted">
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <div className="mt-10 grid gap-8 border border-border-soft bg-card/60 px-6 py-8 text-center sm:grid-cols-2 sm:px-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted">Date</p>
              <p className="mt-1 text-lg font-medium text-foreground">{dateLabel}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted">Time</p>
              <p className="mt-1 text-lg font-medium text-foreground">{timeLabel}</p>
            </div>
          </div>

          <div className="mt-12">
            <MapEmbed embedUrl={mapEmbedUrl} title={`Map: ${venueName}`} />
            <div className="mt-6 flex justify-center">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-foreground px-8 py-3 text-sm font-medium text-background transition hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
