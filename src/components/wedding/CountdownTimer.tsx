"use client";

import { useEffect, useMemo, useState } from "react";

type UnitProps = { label: string; value: string };

function Unit({ label, value }: UnitProps) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center rounded-2xl border border-white/15 bg-white/5 px-3 py-4 backdrop-blur-sm sm:min-w-[5.5rem] sm:px-5">
      <span
        className="font-[family-name:var(--font-display)] text-3xl font-semibold tabular-nums text-white sm:text-4xl"
        aria-hidden
      >
        {value}
      </span>
      <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/70">
        {label}
      </span>
    </div>
  );
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

type CountdownTimerProps = {
  /** ISO 8601 target datetime */
  targetIso: string;
};

export function CountdownTimer({ targetIso }: CountdownTimerProps) {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const sec = Math.floor(diff / 1000) % 60;
  const min = Math.floor(diff / (1000 * 60)) % 60;
  const hour = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));

  const live = `Day ${day}, ${pad(hour)} hours, ${pad(min)} minutes, ${pad(sec)} seconds remaining`;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="sr-only" aria-live="polite">
        {live}
      </p>
      <div
        className="flex flex-wrap justify-center gap-3 sm:gap-4"
        role="timer"
        aria-label="Countdown to the wedding"
      >
        <Unit label="Day" value={day > 99 ? String(day) : pad(day)} />
        <Unit label="Hour" value={pad(hour)} />
        <Unit label="Min" value={pad(min)} />
        <Unit label="Sec" value={pad(sec)} />
      </div>
    </div>
  );
}
