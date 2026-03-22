import type { CalendarEvent } from "@/lib/calendar";
import { RSVPForm } from "./RSVPForm";
import { ScrollReveal } from "./ScrollReveal";
import { SectionTitle } from "./SectionTitle";

type RSVPSectionProps = {
  calendarEvent: CalendarEvent;
};

export function RSVPSection({ calendarEvent }: RSVPSectionProps) {
  const headingId = "rsvp-heading";
  return (
    <section
      id="rsvp"
      className="scroll-mt-24 px-6 py-20 sm:py-28"
      aria-labelledby={headingId}
    >
      <ScrollReveal>
        <SectionTitle
          id={headingId}
          eyebrow="Kindly respond"
          title="RSVP"
          subtitle="Please let us know by the date you set — we can’t wait to celebrate with you."
        />
        <RSVPForm calendarEvent={calendarEvent} />
      </ScrollReveal>
    </section>
  );
}
