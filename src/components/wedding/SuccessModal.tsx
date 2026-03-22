"use client";

import { useEffect, useRef } from "react";
import type { CalendarEvent } from "@/lib/calendar";
import { buildGoogleCalendarUrl, buildIcsContent, downloadIcsFile } from "@/lib/calendar";

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
  calendarEvent: CalendarEvent;
  showCalendarActions: boolean;
};

export function SuccessModal({
  open,
  onClose,
  calendarEvent,
  showCalendarActions,
}: SuccessModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const googleUrl = buildGoogleCalendarUrl(calendarEvent);
  const ics = buildIcsContent(calendarEvent);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-success-title"
    >
      <div className="relative max-w-md rounded-3xl border border-border-soft bg-card p-8 shadow-[var(--shadow-soft)]">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted transition hover:bg-accent-soft/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Close"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <h2
          id="rsvp-success-title"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground"
        >
          Thank you
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your response has been saved. We’re so grateful you took the time to reply.
        </p>

        {showCalendarActions ? (
          <div className="mt-8 space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Add to your calendar
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-foreground/15 bg-foreground px-4 py-2.5 text-center text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                Google Calendar
              </a>
              <button
                type="button"
                onClick={() => downloadIcsFile("wedding-event.ics", ics)}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-border-soft bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent"
              >
                Download .ics
              </button>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full rounded-full border border-border-soft py-2.5 text-sm font-medium text-foreground transition hover:bg-accent-soft/50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
