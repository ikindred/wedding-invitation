/**
 * Google Calendar URL + ICS helpers for “Add to calendar” after RSVP.
 * UPDATE: `eventTitle`, times, and location should match your ceremony/reception in content/wedding.ts.
 */

export type CalendarEvent = {
  title: string;
  description?: string;
  location: string;
  /** ISO 8601 start in UTC or with offset */
  startIso: string;
  endIso: string;
};

function formatGoogleDate(iso: string): string {
  const d = new Date(iso);
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildGoogleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description ?? "",
    location: event.location,
    dates: `${formatGoogleDate(event.startIso)}/${formatGoogleDate(event.endIso)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Minimal RFC 5545-compliant ICS (single event). */
export function buildIcsContent(event: CalendarEvent): string {
  const uid = `${Date.now()}-wedding@invitation.local`;
  const dtStamp = formatGoogleDate(new Date().toISOString());
  const dtStart = formatGoogleDate(event.startIso);
  const dtEnd = formatGoogleDate(event.endIso);
  const escape = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escape(event.title)}`,
    `DESCRIPTION:${escape(event.description ?? "")}`,
    `LOCATION:${escape(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcsFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
