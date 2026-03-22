"use client";

import { useState } from "react";
import { rsvpSchema } from "@/lib/validation";
import { SuccessModal } from "./SuccessModal";
import type { CalendarEvent } from "@/lib/calendar";

type RSVPFormProps = {
  calendarEvent: CalendarEvent;
};

export function RSVPForm({ calendarEvent }: RSVPFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<"ACCEPTED" | "DECLINED">("ACCEPTED");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successOpen, setSuccessOpen] = useState(false);
  const [showCalendarInSuccess, setShowCalendarInSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const payload = {
      fullName: fullName.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      attendanceStatus: attendance,
      guestCount: attendance === "ACCEPTED" ? guestCount : undefined,
      message: message.trim() || undefined,
    };

    const parsed = rsvpSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !next[key]) {
          next[key] = issue.message;
        }
      }
      setFieldErrors(next);
      return;
    }

    setLoading(true);
    try {
      const submittedEmail = parsed.data.email?.trim();
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setFormError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setShowCalendarInSuccess(!!submittedEmail);
      setSuccessOpen(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setAttendance("ACCEPTED");
      setGuestCount(1);
      setMessage("");
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-12 max-w-xl space-y-6 rounded-3xl border border-border-soft bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10"
        noValidate
      >
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
            Full name <span className="text-red-600">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border-soft bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            aria-required
            aria-invalid={!!fieldErrors.fullName}
            aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
          />
          {fieldErrors.fullName ? (
            <p id="fullName-error" className="mt-1 text-sm text-red-600" role="alert">
              {fieldErrors.fullName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email <span className="text-muted">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border-soft bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email ? (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground">
            Phone <span className="text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border-soft bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-foreground">
            Will you attend? <span className="text-red-600">*</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="attendance"
                checked={attendance === "ACCEPTED"}
                onChange={() => setAttendance("ACCEPTED")}
                className="h-4 w-4 border-border-soft text-accent focus:ring-accent"
              />
              <span>Joyfully accept</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="attendance"
                checked={attendance === "DECLINED"}
                onChange={() => setAttendance("DECLINED")}
                className="h-4 w-4 border-border-soft text-accent focus:ring-accent"
              />
              <span>Regretfully decline</span>
            </label>
          </div>
        </fieldset>

        {attendance === "ACCEPTED" ? (
          <div>
            <label htmlFor="guestCount" className="block text-sm font-medium text-foreground">
              Number of guests <span className="text-muted">(including you)</span>
            </label>
            <input
              id="guestCount"
              name="guestCount"
              type="number"
              min={1}
              max={20}
              value={guestCount}
              onChange={(e) => setGuestCount(Number.parseInt(e.target.value, 10) || 1)}
              className="mt-2 w-full max-w-[12rem] rounded-xl border border-border-soft bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              aria-invalid={!!fieldErrors.guestCount}
              aria-describedby={fieldErrors.guestCount ? "guestCount-error" : undefined}
            />
            {fieldErrors.guestCount ? (
              <p id="guestCount-error" className="mt-1 text-sm text-red-600" role="alert">
                {fieldErrors.guestCount}
              </p>
            ) : null}
          </div>
        ) : null}

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground">
            Message for the couple <span className="text-muted">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 w-full resize-y rounded-xl border border-border-soft bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {formError ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {formError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          {loading ? "Sending…" : "Send RSVP"}
        </button>
      </form>

      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        calendarEvent={calendarEvent}
        showCalendarActions={showCalendarInSuccess}
      />
    </>
  );
}
